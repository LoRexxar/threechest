import { Rectangle, Tooltip } from 'react-leaflet'
import { type WclPoint, wclPointToLeafletPoint, type WclResult } from '../../util/wclCalc.ts'
import wclTestData from '../../util/wclTestData.json'

const wclData = wclTestData as WclResult

const rectSize = 2

export function WclCoordinateTest() {
  return wclData.events
    .filter((point) => point.x && point.y && point.mapID)
    .map((event, idx) => {
      const point = wclPointToLeafletPoint(event as WclPoint)
      return (
        <Rectangle
          key={Math.random()}
          bounds={[
            [point[0] - rectSize, point[1] - rectSize],
            [point[0] + rectSize, point[1] + rectSize],
          ]}
          color="red"
          fillOpacity={1}
          fillColor="blue"
        >
          <Tooltip className={`pull-number-tooltip [&]:text-lg`} direction="center" permanent>
            {idx + 1} <span className="-mr-9 text-xs">{event.timestamp}</span>
          </Tooltip>
        </Rectangle>
      )
    })
}
