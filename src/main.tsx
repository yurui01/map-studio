import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider, Global } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import './samples/node-api'
import './index.scss'

// fonts
import UbuntuRegular from './assets/fonts/Ubuntu-Regular.ttf'
import UbuntuBold from './assets/fonts/Ubuntu-Bold.ttf'

const UbuntuFont = () => {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Ubuntu',
            fontStyle: 'normal',
            fontWeight: 400,
            src: `url('${UbuntuRegular}') format('truetype')`
          }
        },
        {
          '@font-face': {
            fontFamily: 'Ubuntu',
            fontStyle: 'normal',
            fontWeight: 700,
            src: `url('${UbuntuBold}') format('truetype')`
          }
        }
      ]}
    />
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'dark',
      fontFamily: 'Ubuntu, sans-serif',
      shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)'
      }
    }}
  >
    <UbuntuFont />
    <Notifications maw={200} />
    <App />
  </MantineProvider>
)

postMessage({ payload: 'removeLoading' }, '*')
