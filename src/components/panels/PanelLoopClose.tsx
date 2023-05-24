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
import { load } from '@loaders.gl/core'
import { LASLoader } from '@loaders.gl/las'

// components
import Toolbar from '../toolbar/Toolbar'
import { useLoopClose } from '@/zustand/useLoopClose'

// assets
import DISC from '@/assets/images/disc.png'
import { ipcRenderer } from 'electron'
import { useProject } from '@/zustand/useProject'
import { apsFullMsg } from '../../../proto/aps_msgs'
import { shallow } from 'zustand/shallow'
import fs from 'fs'

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
  positions: Float32Array | undefined
  color: string
  origin: [number, number, number]
  orientation?: [number, number, number, number]
  axes: boolean
  onChange?: (
    position: [number, number, number],
    rotation: [number, number, number, number]
  ) => void
}

const PointCloudMesh = ({
  positions,
  color,
  origin = [0, 0, 0],
  orientation,
  axes,
  onChange
}: PointCloudMeshProps) => {
  const sprite = useTexture(DISC)

  const handleCurrentFrameDrag = (e: any) => {
    // console.log(e.elements)
    const matrix = new THREE.Matrix4().fromArray(e.elements)
    const position = new THREE.Vector3().setFromMatrixPosition(matrix)
    let rotation = new THREE.Quaternion().setFromRotationMatrix(matrix)
    let originVe = new THREE.Vector3()
      .fromArray([-origin[0], -origin[1], -origin[2]])
      .applyQuaternion(rotation)
    // console.log(origin, originVe)
    const position1 = position
      .sub(originVe)
      .sub(new THREE.Vector3().fromArray(origin))
    console.log(position1.toArray(), rotation.toArray())
    onChange &&
      onChange(
        position1.toArray() as [number, number, number],
        rotation.toArray() as [number, number, number, number]
      )
  }

  if (axes) {
    return (
      <group position={[-origin[0], -origin[1], -origin[2]]}>
        <PivotControls
          offset={origin}
          scale={3}
          rotation={
            orientation &&
            (new THREE.Euler()
              .setFromQuaternion(new THREE.Quaternion().fromArray(orientation))
              .toArray() as [number, number, number])
          }
          onDrag={handleCurrentFrameDrag}
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

  const [offset, setOffset] = useState<{
    position: [number, number, number]
    rotation: [number, number, number]
  }>({
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  })

  const [scrolled, setScrolled] = useState(false)

  const project = useProject((state) => state.project)
  const { currentFrame, referenceFrame, setCurrentFrame, setReferenceFrame } =
    useLoopClose((state) => state, shallow)

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
      const msg = apsFullMsg
        .encode({
          topicName: '/aps/loop/manual/select/set',
          topicType: 0,
          loopManualSelectParam: {
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
        })
        .finish()

      ipcRenderer.invoke(
        'loop-select-set',
        JSON.stringify(apsFullMsg.decode(msg))
      )

      ipcRenderer.on('loop-select-set-reply', (event, arg) => {
        const currentLASFile = fs.readFileSync(`${project!.path}/cur_frame.las`)
        const currentFrameLASBlob = new Blob([currentLASFile])
        // load blob with loaders.gl
        load(currentFrameLASBlob, LASLoader, { worker: false }).then(
          (data: any) => {
            const { header, attributes } = data
            const { POSITION, COLOR_0 } = attributes
            setCurrentFrame({
              ...currentFrame,
              pointcloud: { positions: POSITION.value, colors: COLOR_0.value }
            })
          }
        )

        const referenceLASFile = fs.readFileSync(
          `${project!.path}/ref_frame.las`
        )
        const referenceFrameLASBlob = new Blob([referenceLASFile])
        // load blob with loaders.gl
        load(referenceFrameLASBlob, LASLoader, { worker: false }).then(
          (data: any) => {
            const { header, attributes } = data
            const { POSITION, COLOR_0 } = attributes
            setReferenceFrame({
              ...referenceFrame,
              pointcloud: { positions: POSITION.value, colors: COLOR_0.value }
            })
          }
        )
      })
    }
  }, [currentFrame?.id && referenceFrame?.id])

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
          <PointCloudMesh
            positions={currentFrame?.pointcloud?.positions}
            color="blue"
            origin={
              currentFrame
                ? [currentFrame.px, currentFrame.py, currentFrame.pz]
                : [0, 0, 0]
            }
            axes={true}
            onChange={(position, orientation) => {
              const euler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion().fromArray(orientation))
              setOffset({
                position: position as [number, number, number],
                rotation: euler.toArray() as [number, number, number]
              })
            }}
          />
          <PointCloudMesh
            positions={referenceFrame?.pointcloud?.positions}
            color="red"
            origin={
              referenceFrame
                ? [referenceFrame.px, referenceFrame.py, referenceFrame.pz]
                : [0, 0, 0]
            }
            axes={false}
          />
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
              <th>rx</th>
              <th>ry</th>
              <th>rz</th>
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
                <td>{currentFrame.px.toFixed(5)}</td>
                <td>{currentFrame.py.toFixed(5)}</td>
                <td>{currentFrame.pz.toFixed(5)}</td>
                <td>{currentFrame.rx!.toFixed(5)}</td>
                <td>{currentFrame.ry!.toFixed(5)}</td>
                <td>{currentFrame.rz!.toFixed(5)}</td>
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
                <td>{referenceFrame.px.toFixed(5)}</td>
                <td>{referenceFrame.py.toFixed(5)}</td>
                <td>{referenceFrame.pz.toFixed(5)}</td>
                <td>{referenceFrame.rx!.toFixed(5)}</td>
                <td>{referenceFrame.ry!.toFixed(5)}</td>
                <td>{referenceFrame.rz!.toFixed(5)}</td>
              </tr>
            )}

            {currentFrame && referenceFrame && (
              <tr>
                <td>
                  <Badge color="green" radius={4}>
                    调整量
                  </Badge>
                </td>
                <td></td>
                <td>{offset.position[0].toFixed(5)}</td>
                <td>{offset.position[1].toFixed(5)}</td>
                <td>{offset.position[2].toFixed(5)}</td>
                <td>{offset.rotation[0].toFixed(5)}</td>
                <td>{offset.rotation[0].toFixed(5)}</td>
                <td>{offset.rotation[1].toFixed(5)}</td>
                <td>{offset.rotation[2].toFixed(5)}</td>
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
