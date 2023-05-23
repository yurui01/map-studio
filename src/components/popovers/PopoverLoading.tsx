import { Modal, Box } from '@mantine/core'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useEffect } from 'react'

interface PopoverLoadingProps {
  opened: boolean
  onClose(): void
}

export default function PopoverLoading({
  opened,
  onClose
}: PopoverLoadingProps) {
  useEffect(() => {
    nprogress.start()

    return () => {
      nprogress.complete()
    }
  }, [])
  
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      transitionProps={{ duration: 10 }}
      centered
      withCloseButton={false}
      size="30%"
      trapFocus
    >
      <div>正在加载...</div>
      <Box>
        <NavigationProgress withinPortal={false} />
      </Box>
    </Modal>
  )
}
