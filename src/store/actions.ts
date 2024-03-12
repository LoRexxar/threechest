import { Pull, Route } from '../util/types.ts'
import { SpawnId } from '../data/types.ts'
import { dungeonsByKey } from '../data/dungeons.ts'
import { RouteState } from './routesReducer.ts'
import { findMobSpawn } from '../util/mobSpawns.ts'

const findSelectedPull = (route: Route, spawn: SpawnId) =>
  route.pulls.findIndex((pull) => pull.spawns.some((spawn2) => spawn === spawn2))

export function toggleSpawnAction(
  route: Route,
  payload: { spawn: SpawnId; individual: boolean },
): Pull[] {
  const dungeon = dungeonsByKey[route.dungeonKey]
  const mobSpawn = findMobSpawn(payload.spawn, dungeon)

  const origSelectedPull = findSelectedPull(route, payload.spawn)

  const groupSpawns = payload.individual
    ? [{ mobSpawn, selectedPull: origSelectedPull }]
    : Object.values(dungeon.mobSpawns)
        .filter(
          (mobSpawn2) =>
            mobSpawn2.spawn.id === payload.spawn ||
            (mobSpawn.spawn.group !== null && mobSpawn2.spawn.group === mobSpawn.spawn.group),
        )
        .map((mobSpawn) => {
          const selectedPull = findSelectedPull(route, mobSpawn.spawn.id)
          return { mobSpawn, selectedPull }
        })

  if (origSelectedPull !== -1) {
    // if already selected, deselect
    return route.pulls.map((pull, pullIdx) =>
      pullIdx !== origSelectedPull
        ? pull
        : {
            ...pull,
            spawns: pull.spawns.filter(
              (spawnId) => !groupSpawns.some(({ mobSpawn }) => mobSpawn.spawn.id === spawnId),
            ),
          },
    )
  } else {
    // otherwise, select
    return route.pulls.map((pull, pullIdx) =>
      pullIdx !== route.selectedPull
        ? pull
        : {
            ...pull,
            spawns: [
              ...pull.spawns,
              ...groupSpawns
                .filter(({ selectedPull }) => selectedPull === -1)
                .map(({ mobSpawn }) => mobSpawn.spawn.id),
            ],
          },
    )
  }
}

export function boxSelectSpawnsAction(route: Route, hoveredSpawns: SpawnId[]) {
  const pull = route.pulls[route.selectedPull]
  if (!pull) return

  const missingSpawns = hoveredSpawns.filter(
    (hoveredSpawn) =>
      !route.pulls.some((pull) => pull.spawns.some((spawnId) => spawnId === hoveredSpawn)),
  )

  if (
    pull.tempSpawns !== undefined &&
    missingSpawns.length === pull.tempSpawns.length &&
    missingSpawns.every((missingSpawn, idx) => pull.tempSpawns[idx]! === missingSpawn)
  ) {
    return
  }

  pull.tempSpawns = missingSpawns
}

export function addPullFunc(state: RouteState, newPullIndex: number = state.route.pulls.length) {
  const maxId = state.route.pulls.reduce<number>((acc, pull) => (pull.id > acc ? pull.id : acc), 0)
  const newPull: Pull = { id: maxId + 1, spawns: [], tempSpawns: [] }
  state.route.pulls.splice(newPullIndex, 0, newPull)
  state.route.selectedPull = Math.max(0, Math.min(newPullIndex, state.route.pulls.length - 1))
}
