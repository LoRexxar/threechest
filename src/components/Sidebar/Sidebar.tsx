import { RouteDetails } from './RouteDetails.tsx'
import { SharePanel } from './SharePanel.tsx'
import { SidebarCollapser } from './SidebarCollapser.tsx'
import { Pulls } from './Pulls/Pulls.tsx'
import { CollabPanel } from '../Collab/CollabPanel.tsx'
import { useState } from 'react'
import { Footer } from '../Header/Footer.tsx'

const marginTop = 8
const marginBottom = 60
const width = 285

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [topCollapsed, setTopCollapsed] = useState(false)

  return (
    <div
      className="fixed right-0 z-20 flex flex-col gap-1.5 transition-all"
      style={{
        width,
        marginTop,
        marginBottom,
        maxHeight: `calc(100% - ${marginTop}px - ${marginBottom}px)`,
        right: collapsed ? -width : 0,
      }}
    >
      <SidebarCollapser collapsed={collapsed} setCollapsed={setCollapsed} index={0} />
      <SidebarCollapser
        vertical
        collapsed={topCollapsed}
        setCollapsed={setTopCollapsed}
        index={1}
      />
      <RouteDetails collapsed={topCollapsed} />
      <SharePanel hidden={topCollapsed} />
      <CollabPanel collapsed={topCollapsed} />
      <Pulls />
      <Footer />
    </div>
  )
}
