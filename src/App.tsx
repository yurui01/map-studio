import { Box, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Allotment } from 'allotment'

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
  PopoverWelcome
} from './components/popovers'

function App() {
  const [openedWelcome, welcomeHandler] = useDisclosure(true)
  const [openedSetting, settingHandler] = useDisclosure(false)
  const [openedAbout, aboutHandler] = useDisclosure(false)

  return (
    <>
      <Box w="100vw" h="100vh" display="flex" sx={{ flexDirection: 'column' }}>
        <Menubar
          onOpenWelcome={welcomeHandler.toggle}
          onOpenSetting={settingHandler.toggle}
          onOpenAbout={aboutHandler.toggle}
        />

        <Allotment defaultSizes={[35, 45, 20]}>
          <Allotment.Pane>
            <PanelView />
          </Allotment.Pane>
          <Allotment.Pane>
            <PanelLoopClose />
          </Allotment.Pane>
          <Allotment.Pane>
            <Allotment vertical>
              <Allotment.Pane>
                <PanelDataTree />
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
      </Box>
    </>
  )
}

export default App
