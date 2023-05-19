import { Box } from '@mantine/core'
  
export default function PanelDataTree() {
  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="dark.7"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.dark[4]}`,
          borderRight: `1px solid ${theme.colors.dark[4]}`,
        })}
      ></Box>
    </>
  )
}
