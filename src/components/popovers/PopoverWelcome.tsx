import { useState } from 'react'
import {
  Image,
  Modal,
  Box,
  Text,
  Grid,
  Stack,
  ScrollArea,
  Button
} from '@mantine/core'

// components
import { IconFile, IconFolderOpen, Iconify } from '@/assets/icons'

// assets
import WelcomeBackdrop from '@/assets/images/welcome.png'

interface PopoverWelcomeProps {
  opened: boolean
  onClose(): void
}

export default function PopoverWelcome({
  opened,
  onClose
}: PopoverWelcomeProps) {
  const [history, setHistory] = useState<
    { name: string; date: string; size: string; directory: string }[]
  >([])

  return (
    <Modal
      transitionProps={{ duration: 10 }}
      trapFocus={false}
      opened={opened}
      onClose={onClose}
      closeButtonProps={{
        size: 'md',
        style: { position: 'absolute', zIndex: 200, top: 0, right: 0 }
      }}
      size="65%"
      centered
      padding={0}
    >
      <Box>
        <Text
          sx={{
            fontSize: 64,
            fontWeight: 700,
            textAlign: 'center',
            padding: 30,
            lineHeight: 1,
            color: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            fontFamily: 'Ubuntu, sans-serif'
          }}
        >
          Map Studio
        </Text>
        <Text
          fw={500}
          fs="italic"
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: 60,
            right: 0,
            paddingRight: 30,
            fontFamily: 'Ubuntu, sans-serif',
            color: '#fff'
          }}
        >
          v0.1.7
        </Text>
        <Image src={WelcomeBackdrop} alt="welcome" height={350} />
      </Box>

      <Grid mih={400} gutter={0} mt={30}>
        <Grid.Col span={5} pl={60}>
          <Stack>
            <Text fz="xs" ml={20}>
              打开
            </Text>
            <Button
              size="xs"
              variant="subtle"
              leftIcon={<Iconify icon={IconFolderOpen} width={16} />}
              color="dark"
              sx={(theme) => ({
                alignItems: 'start',
                display: 'flex',
                color: '#f3f3f3',
                ':hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[1]
                }
              })}
            >
              打开文件夹
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col span={7}>
          <Stack>
            <Text fz="xs">最近打开...</Text>
            <ScrollArea w="100%" h="100%">
              {history.map((item) => (
                <Grid key={item.name}>
                  <Grid.Col span={2}>
                    <Image
                      src={`file://${item.directory}/screenshot.png`}
                      alt="text"
                      width={80}
                      height={80}
                      sx={{ borderRadius: 6 }}
                    />
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Box
                      sx={{
                        flexDirection: 'column',
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '100%',
                        padding: '10px 0'
                      }}
                    >
                      <Text fw="bold" fz="sm" sx={{ color: '#f3f3f3' }}>
                        {item.name}
                      </Text>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10
                        }}
                      >
                        <Text fz={'xs'}>
                          <span>创建时间：</span>
                          <span>{item.date}</span>
                        </Text>
                        <Text fz={'xs'}>
                          <span>大小：</span>
                          <span>{item.size}</span>
                        </Text>
                      </Box>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Stack justify="center" sx={{ height: '100%' }}>
                      <Button
                        variant="subtle"
                        size="xs"
                        compact
                        leftIcon={<Iconify icon={IconFolderOpen} />}
                      >
                        打开
                      </Button>
                    </Stack>
                  </Grid.Col>
                </Grid>
              ))}
            </ScrollArea>
          </Stack>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
