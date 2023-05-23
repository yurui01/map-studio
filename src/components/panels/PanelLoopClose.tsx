import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Box,
  CloseButton,
  Stack,
  Table,
  createStyles,
  rem,
  Badge,
  Group,
  Button,
  ScrollArea
} from '@mantine/core'
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  PivotControls,
  Points,
  useTexture
} from '@react-three/drei'

// components
import Toolbar from '../toolbar/Toolbar'
import { useLoopClose } from '@/zustand/useLoopClose'

// assets
import DISC from '@/assets/images/disc.png'
import { ipcRenderer } from 'electron'
import { useProject } from '@/zustand/useProject'
import { apsFullMsg } from '../../../proto/aps_msgs'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    transition: 'box-shadow 150ms ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`
    }
  },
  scrolled: {
    boxShadow: theme.shadows.sm
  }
}))

interface PointCloudMeshProps {
  positions: Float32Array
  color: string
  origin: [number, number, number]
  orientation: [number, number, number, number]
  axes: boolean
}

const PointCloudMesh = ({
  positions,
  color,
  origin,
  orientation,
  axes
}: PointCloudMeshProps) => {
  const sprite = useTexture(DISC)

  if (axes) {
    return (
      <group position={[-origin[0], -origin[1], -origin[2]]}>
        <PivotControls
          rotation={
            new THREE.Euler()
              .setFromQuaternion(new THREE.Quaternion().fromArray(orientation))
              .toArray() as [number, number, number]
          }
        >
          <Points positions={positions}>
            <pointsMaterial
              size={3}
              map={sprite}
              alphaTest={0.9}
              // vertexColors
              color={color}
              transparent
              sizeAttenuation={false}
            />
          </Points>
        </PivotControls>
      </group>
    )
  } else {
    return (
      <Points
        positions={positions}
        position={[-origin[0], -origin[1], -origin[2]]}
      >
        <pointsMaterial
          size={3}
          map={sprite}
          alphaTest={0.9}
          // vertexColors
          color={color}
          transparent
          sizeAttenuation={false}
        />
      </Points>
    )
  }
}

interface PanelLoopCloseProps {
  onClose: () => void
}

export default function PanelLoopClose({ onClose }: PanelLoopCloseProps) {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const project = useProject((state) => state.project)
  const { currentFrame, referenceFrame } = useLoopClose((state) => state)

  const gridRef = useRef<THREE.GridHelper | null>(null)
  const gridHelperMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    opacity: 0.25,
    transparent: true
  })

  const handleGridChange = (v: boolean) => {
    gridRef.current!.visible = v
  }

  useEffect(() => {
    if (currentFrame && referenceFrame) {
      // invoke select-set
      const msg = apsFullMsg.encode({
        topicName: '/aps/loop/manual/select/set',
        topicType: 0,
        loopManuelSelectParam: {
          processReturn: {
            status: 0,
            msg: ''
          },
          dataDir: project!.path,
          amapName: project!.amap,
          curScanId: Number(currentFrame.id),
          curScanTime: Number(currentFrame.timestamp),
          refScanId: Number(referenceFrame.id),
          refScanTime: Number(referenceFrame.timestamp)
        }
      }).finish()

      ipcRenderer.invoke('loop-select-set',JSON.stringify(apsFullMsg.decode(msg)) )
    }
  }, [currentFrame && referenceFrame])

  useEffect(() => {
    return () => {
      // clear frames
      useLoopClose.setState({ currentFrame: null, referenceFrame: null })
    }
  }, [])

  return (
    <Box
      w="100%"
      h="100%"
      bg="dark.7"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colors.dark[4]}`,
        borderBottom: `1px solid ${theme.colors.dark[4]}`
      })}
    >
      <CloseButton
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 200
        }}
        onClick={onClose}
      />
      <Toolbar onGridChange={handleGridChange} control={false} />
      <Box
        sx={(theme) => ({
          height: '50%',
          borderBottom: `1px solid ${theme.colors.dark[4]}`
        })}
      >
        <Canvas
          camera={{ up: [0, 0, 1], far: 10000, position: [10, 10, 10] }}
          gl={{ antialias: false }}
          dpr={Math.max(window.devicePixelRatio, 2)}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <gridHelper
            ref={gridRef}
            args={[1000, 100, '#ffffff', '#ffffff']}
            rotation={[Math.PI / 2, 0, 0]}
            material={gridHelperMaterial}
          />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
              labelColor="white"
            />
          </GizmoHelper>
          <OrbitControls
            makeDefault
            minDistance={0}
            enableDamping={false}
            panSpeed={0.5}
            rotateSpeed={0.5}
          />
        </Canvas>
      </Box>

      <Stack justify="space-between" p={24}>
        <Table>
          <thead className={cx(classes.header)}>
            <tr>
              <th>帧</th>
              <th>ID</th>
              <th>px</th>
              <th>py</th>
              <th>pz</th>
              <th>qw</th>
              <th>qx</th>
              <th>qy</th>
              <th>qz</th>
            </tr>
          </thead>
          <tbody>
            {currentFrame && (
              <tr>
                <td>
                  <Badge color="blue" radius={4}>
                    当前帧
                  </Badge>
                </td>
                <td>{currentFrame.id}</td>
                <td>{currentFrame.px}</td>
                <td>{currentFrame.py}</td>
                <td>{currentFrame.pz}</td>
                <td>{currentFrame.qw}</td>
                <td>{currentFrame.qx}</td>
                <td>{currentFrame.qy}</td>
                <td>{currentFrame.qz}</td>
              </tr>
            )}
            {referenceFrame && (
              <tr>
                <td>
                  <Badge color="red" radius={4}>
                    参考帧
                  </Badge>
                </td>
                <td>{referenceFrame.id}</td>
                <td>{referenceFrame.px}</td>
                <td>{referenceFrame.py}</td>
                <td>{referenceFrame.pz}</td>
                <td>{referenceFrame.qw}</td>
                <td>{referenceFrame.qx}</td>
                <td>{referenceFrame.qy}</td>
                <td>{referenceFrame.qz}</td>
              </tr>
            )}

            {currentFrame && referenceFrame && (
              <tr>
                <td>
                  <Badge color="green" radius={4}>
                    调整量
                  </Badge>
                </td>
                <td>1</td>
                <td>0.9</td>
                <td>0.9</td>
                <td>0.9</td>
                <td>0.9</td>
                <td>0.9</td>
                <td>0.9</td>
                <td>0.9</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Group position="right">
          <Button size="xs">配准</Button>
          <Button size="xs">保存</Button>
        </Group>

        <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
          <Table
            fontSize={'xs'}
            sx={(theme) => ({
              borderRadius: 4,
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.white
            })}
          >
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>边</th>
                <th>置信度</th>
                <th>px</th>
                <th>py</th>
                <th>pz</th>
                <th>qx</th>
                <th>qy</th>
                <th>qz</th>
                <th>qw</th>
                <th></th>
              </tr>
            </thead>
          </Table>
        </ScrollArea>

        <Group h={100} position="right">
          <Button size="xs">优化</Button>
          <Button size="xs">取消</Button>
        </Group>
      </Stack>
    </Box>
  )
}
