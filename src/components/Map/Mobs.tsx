import { useMap, useMapEvents } from 'react-leaflet'
import { useMemo, useState } from 'react'
import { mapIconScaling } from '../../util/map.ts'
import { useAppDispatch, useDungeon } from '../../store/hooks.ts'
import { MobSpawn } from './MobSpawn.tsx'
import { boxSelectSpawns, commitBoxSelect } from '../../store/routesReducer.ts'
import type { LeafletEventHandlerFnMap } from 'leaflet'
import { setBoxHovering } from '../../store/hoverReducer.ts'

export function Mobs() {
  const dungeon = useDungeon()
  const map = useMap()
  const dispatch = useAppDispatch()

  const [iconScaling, setIconScaling] = useState(mapIconScaling(map))

  const mapEvents: LeafletEventHandlerFnMap = useMemo(() => {
    return {
      zoomend: () => setIconScaling(mapIconScaling(map)),
      boxselectstart: () => dispatch(setBoxHovering(true)),
      boxselectmove({ bounds }) {
        const spawns = Object.values(dungeon.mobSpawns)
          .filter(({ spawn }) => bounds.contains(spawn.pos))
          .map(({ spawn }) => spawn.id)

        dispatch(boxSelectSpawns(spawns))
      },
      boxselectend() {
        dispatch(setBoxHovering(false))
        dispatch(commitBoxSelect())
      },
    }
  }, [dispatch, dungeon, map])

  useMapEvents(mapEvents)

  return (
    <>
      {Object.values(dungeon.mobSpawns).map(({ mob, spawn }) => (
        <MobSpawn
          key={`${mob.enemyIndex}-${spawn.spawnIndex}`}
          iconScaling={iconScaling}
          mob={mob}
          spawn={spawn}
        />
      ))}
    </>
  )
}
