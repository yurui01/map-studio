import {
  Box,
  Group,
  Text,
  createStyles,
  Grid
} from '@mantine/core'
import * as RadixMenubar from '@radix-ui/react-menubar'
import { ipcRenderer } from 'electron'
import { useFullscreen } from '@mantine/hooks';

// assets
import {
  IconAperture,
  IconCrop,
  IconExit,
  IconExport,
  IconFile,
  IconFrameCorners,
  IconGear,
  IconRecycle,
  IconSave,
  Iconify
} from '@/assets/icons'
import { openProject } from '@/samples/node-api';

const MenubarStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    // padding: 2,
    borderRadius: 3
  },
  trigger: {
    padding: '6px 12px',
    outline: 'none',
    userSelect: 'none',
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: 3,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    '&[data-highlighted], &[data-state="open"]': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0]
    }
  },
  // content and subcontent
  content: {
    zIndex: 100,
    minWidth: 200,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
    borderRadius: 3,
    padding: 8,
    boxShadow: theme.shadows.sm,
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity'
  },
  subcontent: {
    zIndex: 100,
    minWidth: 200,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
    borderRadius: 3,
    padding: 8,
    boxShadow: theme.shadows.sm,
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity'
  },
  item: {
    zIndex: 100,
    all: 'unset',
    fontSize: theme.fontSizes.xs,
    lineHeight: 1,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 8px',
    position: 'relative',
    userSelect: 'none',
    '&[data-highlighted], &[data-state="open"]': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },
  subTrigger: {
    all: 'unset',
    fontSize: theme.fontSizes.xs,
    lineHeight: 1,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 8px',
    position: 'relative',
    userSelect: 'none',
    '&[data-highlighted], &[data-state="open"]': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray[8],
    margin: 5
  }
}))

interface MenubarProps {
  onOpenWelcome: () => void
  onOpenSetting: () => void
  onOpenAbout: () => void
  onOpenLoopClose: () => void
}

export default function Menubar({
  onOpenWelcome,
  onOpenSetting,
  onOpenAbout,
  onOpenLoopClose
}: MenubarProps) {
  const { classes } = MenubarStyles()

  const { toggle, fullscreen } = useFullscreen();

  const handleExit = () => {
    ipcRenderer.invoke('app-exit')
  }

  return (
    <Box w="100%" h={40} bg="dark.6">
      <Group align="center" px={8} spacing={2}>
        <RadixMenubar.Root className={classes.root}>
          <RadixMenubar.Menu>
            <RadixMenubar.Trigger className={classes.trigger}>
              <Text
                variant="gradient"
                size="lg"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                fw="700"
                ff="Ubuntu"
                px={8}
                sx={{ cursor: 'pointer' }}
              >
                M
              </Text>
            </RadixMenubar.Trigger>
            <RadixMenubar.Portal>
              <RadixMenubar.Content className={classes.content}>
                <RadixMenubar.Item className={classes.item} onClick={onOpenAbout}>
                  <Grid align="center" gutter={0} w="100%">
                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">关于 Map Studio</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Separator className={classes.separator} />
                <RadixMenubar.Item
                  className={classes.item}
                  onClick={onOpenWelcome}
                >
                  <Grid align="center" w="100%">
                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">启动画面</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Separator className={classes.separator} />
                <RadixMenubar.Item className={classes.item} onClick={onOpenSetting}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconGear} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">设置...</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Separator className={classes.separator} />
                <RadixMenubar.Item className={classes.item} onClick={handleExit}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconExit} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">退出</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
              </RadixMenubar.Content>
            </RadixMenubar.Portal>
          </RadixMenubar.Menu>

          <RadixMenubar.Menu>
            <RadixMenubar.Trigger className={classes.trigger}>
              文件
            </RadixMenubar.Trigger>
            <RadixMenubar.Portal>
              <RadixMenubar.Content className={classes.content}>
                <RadixMenubar.Item className={classes.item} onClick={() => openProject()}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconFile} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">打开</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Item className={classes.item}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconSave} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">保存</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Item className={classes.item}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconExport} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">导出</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
              </RadixMenubar.Content>
            </RadixMenubar.Portal>
          </RadixMenubar.Menu>

          <RadixMenubar.Menu>
            <RadixMenubar.Trigger className={classes.trigger}>
              编辑
            </RadixMenubar.Trigger>
            <RadixMenubar.Portal>
              <RadixMenubar.Content className={classes.content}>
                <RadixMenubar.Item className={classes.item} onClick={onOpenLoopClose}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconRecycle} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">闭环工具</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
              </RadixMenubar.Content>
            </RadixMenubar.Portal>
          </RadixMenubar.Menu>

          <RadixMenubar.Menu>
            <RadixMenubar.Trigger className={classes.trigger}>
              窗口
            </RadixMenubar.Trigger>
            <RadixMenubar.Portal>
              <RadixMenubar.Content className={classes.content}>
                <RadixMenubar.Item className={classes.item} onClick={toggle}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconFrameCorners} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">切换全屏</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Separator className={classes.separator} />
                <RadixMenubar.Item className={classes.item}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconCrop} width={16} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text fz="xs">保存截图</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
                <RadixMenubar.Item className={classes.item}>
                  <Grid align="center" w="100%">
                    <Grid.Col span={2} p={0}>
                      <Iconify icon={IconCrop} width={16} />
                    </Grid.Col>
                    <Grid.Col span={10}>
                      <Text fz="xs">保存截图(仅渲染窗口)</Text>
                    </Grid.Col>
                  </Grid>
                </RadixMenubar.Item>
              </RadixMenubar.Content>
            </RadixMenubar.Portal>
          </RadixMenubar.Menu>
        </RadixMenubar.Root>
      </Group>
    </Box>
  )
}
