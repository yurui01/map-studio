import { Box, Container } from '@mantine/core'
import { useDisclosure, useToggle } from '@mantine/hooks'
import { Allotment } from 'allotment'
import fs from 'fs'

// components
import { Menubar, Statusbar } from './components'
import {
  PanelDataTree,
  PanelLoopClose,
  PanelProperties,
  PanelView
} from './components/panels'

// styles
import 'allotment/dist/style.css'
import {
  PopoverAbout,
  PopoverSetting,
  PopoverWelcome,
  PopoverLoading
} from './components/popovers'
import { useProject } from './zustand/useProject'
import { useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { apsFullMsg } from 'proto/aps_msgs'
import { openProject } from './samples/node-api'
import { useHistory } from './zustand/useHistory'

// types
import { IHistory } from './types/history'

function App() {
  const [openedWelcome, welcomeHandler] = useDisclosure(true)
  const [openedSetting, settingHandler] = useDisclosure(false)
  const [openedAbout, aboutHandler] = useDisclosure(false)

  const [openedLoopClosePanel, toggleLoopClosePanel] = useToggle([false, true])

  const [pointCloudVisible, togglePointCloudVisible] = useToggle([true, false])
  const [footprintVisible, toggleFootprintVisible] = useToggle([true, false])

  // zustand
  const project = useProject((state) => state.project)
  const { isLoading, setLoading } = useProject((state) => state)
  const { historys, addHistory } = useHistory((state) => state)

  useEffect(() => {
    ipcRenderer.on('convert-project-reply', (event, payload) => {
      console.log(payload)
      if (payload) {
        openProject(payload)
        setLoading(false)
      }
    })

    // get history projects
    ipcRenderer.invoke('get-history').then((res) => {
      // read res by line
      const lines = res.split('\n')
      lines.forEach((line: string) => {
        if (!fs.existsSync(`${line}/potree/octree.bin`)) return
        const potreeStat = fs.statSync(`${line}/potree/octree.bin`)

        const potreeSize =
          potreeStat.size > 1e9
            ? `${(potreeStat.size / 1e9).toFixed(2)}GB`
            : `${(potreeStat.size / 1e6).toFixed(2)}MB`
        const potreeDate = potreeStat.mtime.toLocaleDateString()

        const name = line.split('/').pop() || ''

        addHistory({
          name: name,
          path: line,
          size: potreeSize,
          createdAt: potreeDate
        })
      })
    })
  }, [])

  return (
    <>
      <Box w="100vw" h="100vh" display="flex" sx={{ flexDirection: 'column' }}>
        <Menubar
          onOpenWelcome={welcomeHandler.toggle}
          onOpenSetting={settingHandler.toggle}
          onOpenAbout={aboutHandler.toggle}
          onOpenLoopClose={toggleLoopClosePanel}
        />

        <Allotment defaultSizes={[35, 45, 20]}>
          <Allotment.Pane>
            <PanelView
              path={project?.path}
              footprint={project?.footprint}
              raycaster={openedLoopClosePanel}
              pointCloudVisible={pointCloudVisible}
              footprintVisible={footprintVisible}
            />
          </Allotment.Pane>
          <Allotment.Pane visible={openedLoopClosePanel}>
            <PanelLoopClose onClose={toggleLoopClosePanel} />
          </Allotment.Pane>
          <Allotment.Pane maxSize={350} minSize={350}>
            <Allotment vertical>
              <Allotment.Pane>
                <PanelDataTree
                  onFootprintVisibleChange={toggleFootprintVisible}
                  onPointCloudVisibleChange={togglePointCloudVisible}
                />
              </Allotment.Pane>
              <Allotment.Pane>
                <PanelProperties />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
        </Allotment>

        <Statusbar />
        <PopoverAbout opened={openedAbout} onClose={aboutHandler.close} />
        <PopoverWelcome opened={openedWelcome} onClose={welcomeHandler.close} />
        <PopoverSetting opened={openedSetting} onClose={settingHandler.close} />
        <PopoverLoading opened={isLoading} onClose={() => setLoading(false)} />
      </Box>
    </>
  )
}

export default App
