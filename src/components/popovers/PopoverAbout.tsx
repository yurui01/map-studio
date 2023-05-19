import { Modal, Group, Image, Stack, Text } from '@mantine/core'

// assets
import AllyMeta from '@/assets/images/allymeta.png'

interface PopoverAboutProps {
  opened: boolean
  onClose(): void
}

export default function PopoverAbout({ opened, onClose }: PopoverAboutProps) {
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
      <Stack sx={{ height: 300 }} p={30}>
        <Group spacing={0}>
          <Text
            variant="gradient"
            sx={{
              fontSize: 44,
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1,
              color: '#fff',
              fontFamily: 'Ubuntu, sans-serif'
            }}
          >
            Map Studio
          </Text>
        </Group>
        <Text fz="xs" color="dark.1">
          版本：v0.1.6
        </Text>
        <Group mt="auto">
          <Text fz="xs" color="dark.1">
            © 2023. All rights reserved . 武汉智会创新科技有限公司
          </Text>
          <a
            href="http://allymeta.cn"
            target="_blank"
            style={{ outline: 'none' }}
          >
            <Image
              variant="link"
              src={AllyMeta}
              alt="ally-meta"
              maw={80}
              mx="auto"
            />
          </a>
        </Group>
      </Stack>
    </Modal>
  )
}
