import { useState } from 'react'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import { Text, Box, ActionIcon, Group } from '@mantine/core'

// assets
import {
  Icon3DSelectSolid,
  IconCaretDown,
  IconCaretRight,
  IconImage,
  IconPathArrow,
  Iconify,
  IconEye,
  IconEyeClose
} from '@/assets/icons'

// styles
import './styles.css'

interface PanelDataTreeProps {
  onPointCloudVisibleChange: () => void
  onFootprintVisibleChange: () => void
}

export default function PanelDataTree({
  onPointCloudVisibleChange,
  onFootprintVisibleChange
}: PanelDataTreeProps) {
  const [pointCloudVisible, setPointCloudVisible] = useState(true)
  const [footprintVisible, setFootprintVisible] = useState(true)

  return (
    <Box
      w="100%"
      h="100%"
      bg="dark.7"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colors.dark[4]}`,
        borderRight: `1px solid ${theme.colors.dark[4]}`
      })}
    >
      <div className="tree-container">
        <TreeView
          defaultExpandedIds={['root']}
          data={flattenTree({
            name: '',
            children: [
              {
                id: 'root',
                name: 'root',
                children: [
                  {
                    id: 'point-cloud',
                    name: '点云'
                  },
                  {
                    id: 'footprint',
                    name: '路径'
                  }
                  // {
                  //   id: "image",
                  //   name: "图像",
                  // },
                ]
              }
            ]
          })}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            isSelected,
            isHalfSelected,
            getNodeProps,
            isDisabled,
            level,
            handleSelect,
            handleExpand
          }) => {
            return (
              <>
                <Group
                  position={'apart'}
                  sx={(theme) => ({
                    ':hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[1]
                    }
                  })}
                  {...getNodeProps({ onClick: handleExpand })}
                  style={{
                    // width - 30 * (level - 1) - 30 when not is branch
                    width: isBranch ? '100%' : 'calc(100% - 30px)',
                    marginLeft: 30 * (level - 1),
                    paddingLeft: 10,
                    opacity: isDisabled ? 0.5 : 1,
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Group spacing={2}>
                    {isBranch && (
                      <Iconify
                        icon={isExpanded ? IconCaretDown : IconCaretRight}
                      />
                    )}
                    {element.id === 'point-cloud' && (
                      <Iconify icon={Icon3DSelectSolid} color="#74C0FC" />
                    )}
                    {element.id === 'footprint' && (
                      <Iconify
                        icon={IconPathArrow}
                        color="#8CE99A"
                      />
                    )}
                    {element.id === 'image' && (
                      <Iconify icon={IconImage} color="#FFE066" />
                    )}
                    <Text className="name" size={'sm'} mx={4} my={2}>
                      {element.name}
                    </Text>
                  </Group>
                  <ActionIcon
                    sx={{ float: 'right' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (element.id === 'point-cloud') {
                        setPointCloudVisible(!pointCloudVisible)
                        onPointCloudVisibleChange()
                      }
                      if (element.id === 'footprint') {
                        setFootprintVisible(!footprintVisible)
                        onFootprintVisibleChange()
                      }
                    }}
                  >
                    {element.id === 'point-cloud' && (
                      <Iconify
                        icon={pointCloudVisible ? IconEye : IconEyeClose}
                      />
                    )}

                    {element.id === 'footprint' && (
                      <Iconify
                        icon={footprintVisible ? IconEye : IconEyeClose}
                      />
                    )}
                  </ActionIcon>
                </Group>
              </>
            )
          }}
        />
      </div>
    </Box>
  )
}
