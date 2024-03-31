import { mobCountPercentStr } from '../../../util/numbers.ts'
import type { PullDetailed } from '../../../util/types.ts'
import { useDungeon } from '../../../store/routes/routeHooks.ts'
import { useMemo } from 'react'
import { countMobs } from '../../../util/mobSpawns.ts'

interface Props {
  pull: PullDetailed
}

export function PullTooltip({ pull }: Props) {
  const dungeon = useDungeon()

  const sortedCounts = useMemo(() => countMobs(pull, dungeon), [pull, dungeon])

  return (
    <>
      <div>
        Forces: {pull.count} ({mobCountPercentStr(pull.count, dungeon.mdt.totalCount)})
      </div>
      <div>
        Total: {pull.countCumulative} (
        {mobCountPercentStr(pull.countCumulative, dungeon.mdt.totalCount)})
      </div>
      <div>
        {sortedCounts.map(({ mob, count }) => (
          <div key={mob.id}>
            {count}x {mob.name}
          </div>
        ))}
      </div>
    </>
  )
}
