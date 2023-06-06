import { useState } from 'react'
import {
  ActionIcon,
  Group,
  SegmentedControl,
  Tooltip,
  createStyles,
  Text,
  Box
} from '@mantine/core'
import * as RadixMenubar from '@radix-ui/react-menubar'

// icons
import {
  Iconify,
  IconGrid,
  IconAxes,
  IconPerspectiveView,
  IconOrthogonalView,
  Icon3DSelectSolid,
  Icon3dSelectPoint,
  IconPerspective,
  IconCaretRight,
  IconCaretDown
} from '@/assets/icons'

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
    // data-highlighted or data-state="open" set bg color
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

interface ToolbarProps {
  axes?: boolean
  grid?: boolean
  view?: boolean
  control?: boolean
  camera?: boolean
  fov?: number

  onAxesChange?: (v: boolean) => void
  onGridChange?: (v: boolean) => void
  onCameraChange?: (v: number) => void
  onControlChange?: (v: number) => void
  onViewChange?: (v: number) => void
}

export default function Toolbar({
  axes = true,
  grid = true,
  view = true,
  control = true,
  camera = true,
  onAxesChange,
  onGridChange,
  onCameraChange,
  onControlChange,
  onViewChange
}: ToolbarProps) {
  const { classes } = MenubarStyles()

  const [axesState, setAxesState] = useState<boolean>(axes)
  const [gridState, setGridState] = useState<boolean>(grid)
  const [cameraState, setCameraState] = useState<number>(1)
  const [controlState, setControlState] = useState<number>(1)

  const handleAxesChange = () => {
    onAxesChange && onAxesChange(!axesState)
    setAxesState(!axesState)
  }

  const handleGridChange = () => {
    onGridChange && onGridChange(!gridState)
    setGridState(!gridState)
  }

  const handleCameraChange = (v: number) => {
    onCameraChange && onCameraChange(v)
    setCameraState(v)
  }

  const handleControlChange = (v: number) => {
    onControlChange && onControlChange(v)
    setControlState(v)
  }

  const handleViewChange = (v: number) => {
    onViewChange && onViewChange(v)
  }

  return (
    <Group
      sx={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10
      }}
    >
      <RadixMenubar.Root className={classes.root}>
        <RadixMenubar.Menu>
          <RadixMenubar.Trigger className={classes.trigger}>
            <Group>
              <Iconify icon={IconPerspective} />
              <Text fz="xs">视图</Text>
              <Iconify icon={IconCaretDown} width={14} height={14} />
            </Group>
          </RadixMenubar.Trigger>
          <RadixMenubar.Portal>
            <RadixMenubar.Content className={classes.content}>
              {view && (
                <RadixMenubar.Sub>
                  <RadixMenubar.SubTrigger className={classes.subTrigger}>
                    <Group
                      w="100%"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Iconify icon={IconPerspective} width={18} />
                      <Text fz="xs">视角</Text>
                      <Iconify ml="auto" icon={IconCaretRight} width={12} />
                    </Group>
                  </RadixMenubar.SubTrigger>
                  <RadixMenubar.Portal>
                    <RadixMenubar.SubContent
                      className={classes.subcontent}
                      alignOffset={-5}
                    >
                      <RadixMenubar.Item
                        className={classes.item}
                        onClick={() => handleViewChange(0)}
                      >
                        <Group>
                          <Box></Box>
                          <Text fz="xs">左视角</Text>
                        </Group>
                      </RadixMenubar.Item>
                      <RadixMenubar.Item
                        className={classes.item}
                        onClick={() => handleViewChange(1)}
                      >
                        <Group>
                          <Box></Box>
                          <Text fz="xs">右视角</Text>
                        </Group>
                      </RadixMenubar.Item>
                      <RadixMenubar.Separator className={classes.separator} />
                      <RadixMenubar.Item
                        className={classes.item}
                        onClick={() => handleViewChange(2)}
                      >
                        <Group>
                          <Box></Box>
                          <Text fz="xs">顶视角</Text>
                        </Group>
                      </RadixMenubar.Item>
                      <RadixMenubar.Item
                        className={classes.item}
                        onClick={() => handleViewChange(3)}
                      >
                        <Group>
                          <Box></Box>
                          <Text fz="xs">底视角</Text>
                        </Group>
                      </RadixMenubar.Item>
                      <RadixMenubar.Separator className={classes.separator} />
                      <RadixMenubar.Item
                        className={classes.item}
                        onClick={() => handleViewChange(4)}
                      >
                        <Group>
                          <Box></Box>
                          <Text fz="xs">前视角</Text>
                        </Group>
                      </RadixMenubar.Item>
                      <RadixMenubar.Item
                        className={classes.item}
                        onClick={() => handleViewChange(5)}
                      >
                        <Group>
                          <Box></Box>
                          <Text fz="xs">后视角</Text>
                        </Group>
                      </RadixMenubar.Item>
                    </RadixMenubar.SubContent>
                  </RadixMenubar.Portal>
                </RadixMenubar.Sub>
              )}
            </RadixMenubar.Content>
          </RadixMenubar.Portal>
        </RadixMenubar.Menu>
      </RadixMenubar.Root>

      {axes && (
        <Tooltip
          label="显示 / 隐藏坐标轴"
          color="dark"
          openDelay={1000}
          fz={10}
        >
          <ActionIcon
            variant="transparent"
            bg={axesState ? 'blue.8' : 'dark.6'}
            onClick={handleAxesChange}
          >
            <Iconify icon={IconAxes} />
          </ActionIcon>
        </Tooltip>
      )}

      {grid && (
        <Tooltip
          label="显示 / 隐藏网格线"
          color="dark"
          openDelay={1000}
          fz={10}
        >
          <ActionIcon
            variant="transparent"
            bg={gridState ? 'blue.8' : 'dark.6'}
            onClick={handleGridChange}
          >
            <Iconify icon={IconGrid} />
          </ActionIcon>
        </Tooltip>
      )}

      {camera && (
        <Tooltip
          label="切换当前视图为正交视图 / 透视视图"
          color="dark"
          openDelay={1000}
          fz={10}
        >
          <SegmentedControl
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
              '.mantine-SegmentedControl-label': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 28,
                width: 28,
                padding: 1
              }
            })}
            value={cameraState.toString()}
            color="blue.8"
            data={[
              {
                label: (
                  <Iconify icon={IconPerspectiveView} width={16} height={16} />
                ),
                value: '1'
              },
              {
                label: (
                  <Iconify icon={IconOrthogonalView} width={16} height={16} />
                ),
                value: '0'
              }
            ]}
            onChange={(v) => handleCameraChange(Number(v))}
          />
        </Tooltip>
      )}

      {control && (
        <Tooltip
          label="切换当前鼠标控制方式为轨道控制 / 顶点控制"
          color="dark"
          openDelay={1000}
          fz={10}
        >
          <SegmentedControl
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
              '.mantine-SegmentedControl-label': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 28,
                width: 28,
                padding: 1
              }
            })}
            color="blue.8"
            value={controlState.toString()}
            data={[
              {
                label: (
                  <Iconify icon={Icon3DSelectSolid} width={16} height={16} />
                ),
                value: '0'
              },
              {
                label: (
                  <Iconify icon={Icon3dSelectPoint} width={16} height={16} />
                ),
                value: '1'
              }
            ]}
            onChange={(v) => handleControlChange(Number(v))}
          />
        </Tooltip>
      )}
    </Group>
  )
}
