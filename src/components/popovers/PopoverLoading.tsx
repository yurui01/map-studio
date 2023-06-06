import { IconNotification, Iconify } from '@/assets/icons'
import {
  Modal,
  Box,
  Text,
  Alert,
  Center,
  LoadingOverlay,
  Loader,
  Group,
  Stack
} from '@mantine/core'

interface PopoverLoadingProps {
  opened: boolean
  onClose(): void
}

export default function PopoverLoading({
  opened,
  onClose
}: PopoverLoadingProps) {

  return (
    <Modal
      shadow={'xs'}
      opened={opened}
      onClose={onClose}
      transitionProps={{ duration: 10 }}
      centered
      withCloseButton={false}
      size="25%"
      trapFocus
    >
      <Box>
        <Group align="center">
          <Iconify icon={IconNotification} />
          <Text fz="sm" fw="bold">
            提示
          </Text>
        </Group>

        <Center mx="auto">
          <Group>
            <Text fz="xs" py={40}>
              正在加载，请稍后
            </Text>
            <Loader variant="dots" />
          </Group>
        </Center>
      </Box>
    </Modal>
  )
}
