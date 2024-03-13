import { Panel } from '../Common/Panel.tsx'
import { ExportRoute } from './Buttons/ExportRoute.tsx'
import { ShareRoute } from './Buttons/ShareRoute.tsx'

export function SharePanel() {
  return (
    <Panel noRightBorder>
      <ExportRoute />
      <ShareRoute />
    </Panel>
  )
}
