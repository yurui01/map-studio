import { Box } from '@mantine/core'
import { Leva } from 'leva'

export default function PanelProperties() {
  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="dark.7"
        p={12}
        sx={(theme) => ({
          borderRight: `1px solid ${theme.colors.dark[4]}`,
          borderBottom: `1px solid ${theme.colors.dark[4]}`
        })}
      >
        <Leva
          hideCopyButton
          titleBar={{
            title: '属性',
            drag: false,
            filter: false
          }}
          fill
          theme={{
            shadows: {
              level1: undefined,
              level2: undefined
            }
          }}
        />
      </Box>
    </>
  )
}
