import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
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
  ScrollArea,
  ActionIcon,
  Center
} from '@mantine/core'
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  PivotControls,
  Points,
  useTexture,
  OrthographicCamera,
  CameraControls
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
import { Pose, apsFullMsg } from '../../../proto/aps_msgs'
import { shallow } from 'zustand/shallow'
import fs from 'fs'
import { IconDelete, IconReset, Iconify } from '@/assets/icons'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    zIndex: 100,
    top: -1,
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
  matrix?: THREE.Matrix4
}

const PointCloudMesh = ({
  positions,
  color,
  origin = [0, 0, 0],
  orientation,
  axes,
  onChange,
  matrix
}: PointCloudMeshProps) => {
  const sprite = useTexture(DISC)

  const handleCurrentFrameDrag = (e: any) => {
    const matrix = new THREE.Matrix4().fromArray(e.elements)
    const position = new THREE.Vector3().setFromMatrixPosition(matrix)
    const rotation = new THREE.Quaternion().setFromRotationMatrix(matrix)

    onChange &&
      onChange(
        position.toArray() as [number, number, number],
        rotation.toArray() as [number, number, number, number]
      )
  }
  console.log(111)
  if (axes) {
    return (
      <group>
        <PivotControls
          matrix={matrix}
          offset={origin}
          rotation={
            orientation &&
            (new THREE.Euler()
              .setFromQuaternion(new THREE.Quaternion().fromArray(orientation))
              .toArray() as [number, number, number])
          }
          onDrag={handleCurrentFrameDrag}
        >
          <Points
            positions={positions}
            // position={origin && [-origin[0], -origin[1], -origin[2]]}
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
        </PivotControls>
      </group>
    )
  } else {
    return (
      <Points positions={positions}>
        <pointsMaterial
          size={3}
          map={sprite}
          alphaTest={0.9}
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

  const cameraControlsRef = useRef<CameraControls | null>(null)

  const [offset, setOffset] = useState<{
    position: [number, number, number]
    orientation: [number, number, number, number]
    rotation: [number, number, number]
  }>({
    position: [0, 0, 0],
    orientation: [0, 0, 0, 1],
    rotation: [0, 0, 0]
  })
  const [initFrame, setInitFrame] = useState<any>({
    positions: new Float32Array()
  })
  const [edges, setEdges] = useState<number[][]>([])
  const [scrolled, setScrolled] = useState(false)
  const [matrix, setMatrix] = useState<THREE.Matrix4>()
  const [selected, setSelected] = useState<Boolean>(false)

  const project = useProject((state) => state.project)

  const currentFrame = useLoopClose((state) => state.currentFrame)
  const referenceFrame = useLoopClose((state) => state.referenceFrame)
  const setCurrentFrame = useLoopClose((state) => state.setCurrentFrame)
  const setReferenceFrame = useLoopClose((state) => state.setReferenceFrame)
  const reset = useLoopClose((state) => state.reset)

  const gridRef = useRef<THREE.GridHelper | null>(null)
  const gridHelperMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    opacity: 0.25,
    transparent: true
  })

  const handleGridChange = (v: boolean) => {
    gridRef.current!.visible = v
  }

  const handleMatch = () => {
    const msg = apsFullMsg
      .encode({
        topicName: '/aps/loop/manual/match/set',
        topicType: 0,
        loopManualMatchParam: {
          dataDir: project!.path,
          amapName: project!.amap,
          edge: {
            curScanId: Number(currentFrame?.id),
            curScanTime: Number(currentFrame?.timestamp),
            refScanId: Number(referenceFrame?.id),
            refScanTime: Number(referenceFrame?.timestamp),
            initMatchPq: {
              position: {
                x: offset.position[0],
                y: offset.position[1],
                z: offset.position[2]
              },
              orientation: {
                x: offset.orientation[0],
                y: offset.orientation[1],
                z: offset.orientation[2],
                w: offset.orientation[3]
              }
            }
          },
          processReturn: {
            status: 0,
            msg: ''
          }
        }
      })
      .finish()

    ipcRenderer.invoke('loop-match-set', JSON.stringify(apsFullMsg.decode(msg)))

    ipcRenderer.on('loop-match-set-reply', (event, arg) => {
      if (arg.topicName === '/aps/loop/manual/match/ack') {
        if (arg.loopManualMatchParam) {
          const { orientation, position } = arg.loopManualMatchParam.edge
            ?.initMatchPq as Pose
          if (!orientation || !position) return
          const orientationQue = new THREE.Quaternion().fromArray([
            orientation.x,
            orientation.y,
            orientation.z,
            orientation.w
          ])
          const rotationEluer = new THREE.Euler().setFromQuaternion(
            orientationQue
          )
          // euler to degree
          const rotationDeg = rotationEluer
            .toArray()
            .map((v: any) => (v * 180) / Math.PI)

          setOffset({
            position: [position.x, position.y, position.z],
            orientation: orientationQue.toArray() as [
              number,
              number,
              number,
              number
            ],
            rotation: rotationDeg as [number, number, number]
          })

          setMatrix(
            new THREE.Matrix4()
              .makeRotationFromEuler(rotationEluer)
              .setPosition(position.x, position.y, position.z)
          )
        }
      }
    })
  }

  const handleSaveEdge = () => {
    console.log(matrix)
    if (matrix) {
      const rotation = new THREE.Quaternion().setFromRotationMatrix(matrix)
      const position = new THREE.Vector3().setFromMatrixPosition(matrix)
      let line: number[] = [
        Number(referenceFrame!.id),
        Number(currentFrame!.id),
        position.x,
        position.y,
        position.z,
        rotation.w,
        rotation.x,
        rotation.y,
        rotation.z
      ]
      line = line.map((v) => Number(v.toFixed(5)))
      if (fs.existsSync(`${project!.path}/loops.txt`)) {
        fs.appendFileSync(`${project!.path}/loops.txt`, line.toString() + '\n')
      } else {
        fs.writeFileSync(`${project!.path}/loops.txt`, line.toString() + '\n')
      }

      setEdges([...edges, line])
    }
  }

  const handleResetEdge = () => {
    setMatrix(new THREE.Matrix4())
    setSelected(false)
    reset()
  }

  const handleOptimize = () => {
    const msg = {
      topicName: '/aps/loop/manual/optimize/set',
      topicType: 0,
      loopManualOptimizeParam: {
        dataDir: project!.path,
        amapName: project!.amap
      }
    }
    ipcRenderer.invoke('loop-optimize', JSON.stringify(msg))
  }

  useEffect(() => {
    if (currentFrame?.id && referenceFrame?.id) {
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
        setTimeout(() => {
          const currentLASFile = fs.readFileSync(
            `${project!.path}/cur_frame.las`
          )
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

          const initFile = fs.readFileSync(`${project!.path}/init_frame.txt`)
          const initData = initFile.toString().split('\n')
          let initArr: any[] = []
          for (let line of initData) {
            const lineData = line.split(',')
            initArr.push(lineData[0])
            initArr.push(lineData[1])
            initArr.push(lineData[2])
          }
          setInitFrame({
            positions: new Float32Array(initArr)
          })

          setSelected(true)
        }, 2000)
      })
    }
  }, [currentFrame?.id && referenceFrame?.id])

  const handleViewChange = (v: number) => {
    switch (v) {
      case 0:
        cameraControlsRef.current?.rotateTo(
          90 * THREE.MathUtils.DEG2RAD,
          90 * THREE.MathUtils.DEG2RAD,
          true
        )
        break
      case 1:
        cameraControlsRef.current?.rotateTo(
          -90 * THREE.MathUtils.DEG2RAD,
          90 * THREE.MathUtils.DEG2RAD,
          true
        )
        break
      case 2:
        cameraControlsRef.current?.rotateTo(
          0 * THREE.MathUtils.DEG2RAD,
          0 * THREE.MathUtils.DEG2RAD,
          true
        )
        break
      case 3:
        cameraControlsRef.current?.rotateTo(
          0 * THREE.MathUtils.DEG2RAD,
          180 * THREE.MathUtils.DEG2RAD,
          true
        )
        break
      case 4:
        cameraControlsRef.current?.rotateTo(
          0 * THREE.MathUtils.DEG2RAD,
          90 * THREE.MathUtils.DEG2RAD,
          true
        )
        break
      case 5:
        cameraControlsRef.current?.rotateTo(
          180 * THREE.MathUtils.DEG2RAD,
          90 * THREE.MathUtils.DEG2RAD,
          true
        )
    }
  }

  useEffect(() => {
    // if loops.txt exist then load
    if (!project) return

    if (fs.existsSync(`${project!.path}/loops.txt`)) {
      const loopsData = fs.readFileSync(`${project!.path}/loops.txt`)
      const lines = loopsData.toString().split('\n')
      for (let line of lines) {
        const lineData = line.split(',').map((v) => Number(v))
        if (lineData.length < 6) continue
        setEdges((prev) => [...prev, lineData])
      }
    }
  }, [project])

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
      <Toolbar
        onGridChange={handleGridChange}
        control={false}
        onViewChange={handleViewChange}
      />
      <Box
        sx={(theme) => ({
          height: '50%',
          borderBottom: `1px solid ${theme.colors.dark[4]}`
        })}
      >
        <Canvas
          gl={{ antialias: false }}
          dpr={Math.max(window.devicePixelRatio, 2)}
        >
          <OrthographicCamera
            makeDefault
            position={[0, 0, 1000]}
            up={[0, 0, 1]}
            zoom={50}
            // top={200}
            // bottom={-200}
            // left={200}
            // right={-200}
            near={1}
            far={2000}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <gridHelper
            ref={gridRef}
            args={[50, 50, '#ffffff', '#ffffff']}
            rotation={[Math.PI / 2, 0, 0]}
            material={gridHelperMaterial}
          />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              disabled
              axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
              labelColor="white"
            />
          </GizmoHelper>
          {selected && (
            <>
              <PointCloudMesh
                positions={
                  currentFrame?.pointcloud &&
                  currentFrame?.pointcloud?.positions
                }
                color="yellow"
                origin={
                  currentFrame
                    ? [currentFrame.px, currentFrame.py, currentFrame.pz]
                    : [0, 0, 0]
                }
                axes={true}
                onChange={(position, orientation) => {
                  const euler = new THREE.Euler().setFromQuaternion(
                    new THREE.Quaternion().fromArray(orientation)
                  )
                  // euler to degree
                  const rotation = euler
                    .toArray()
                    .map((v: any) => (v * 180) / Math.PI)
                  setOffset({
                    position: position as [number, number, number],
                    orientation: orientation,
                    rotation: rotation as [number, number, number]
                  })
                }}
                matrix={matrix}
              />
              <PointCloudMesh
                positions={referenceFrame?.pointcloud?.positions}
                color="white"
                origin={
                  referenceFrame
                    ? [referenceFrame.px, referenceFrame.py, referenceFrame.pz]
                    : [0, 0, 0]
                }
                axes={false}
              />
            </>
          )}

          {/* <OrbitControls
            makeDefault
            minDistance={0}
            enableDamping={false}
            // panSpeed={0.5}
            // rotateSpeed={0.5}
          /> */}
          <CameraControls
            makeDefault
            dollySpeed={0.5}
            ref={cameraControlsRef}
            dampingFactor={0}
          />
        </Canvas>
      </Box>

      <Stack justify="space-between" p={12}>
        <Table fontSize={'xs'} withBorder withColumnBorders mih={140}>
          <thead className={cx(classes.header)}>
            <tr>
              <th>帧</th>
              <th>ID</th>
              <th>PX</th>
              <th>PY</th>
              <th>PZ</th>
              <th>RX</th>
              <th>RY</th>
              <th>RZ</th>
              <th></th>
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
                <td />
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
                <td />
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
                <td>{offset.rotation[1].toFixed(5)}</td>
                <td>{offset.rotation[2].toFixed(5)}</td>
                <td>
                  <Center>
                    <ActionIcon size="xs">
                      <Iconify icon={IconReset} width={14} />
                    </ActionIcon>
                  </Center>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Group position="right">
          <Button size="xs" color="blue.9" onClick={handleMatch}>
            配准
          </Button>
          <Button size="xs" color="green.9" onClick={handleSaveEdge}>
            保存
          </Button>
          <Button size="xs" color="gray" onClick={handleResetEdge}>
            重置
          </Button>
        </Group>

        <ScrollArea
          h={180}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            mah={200}
            withBorder
            withColumnBorders
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
                <th>参考帧</th>
                <th>当前帧</th>
                <th>PX</th>
                <th>PY</th>
                <th>PZ</th>
                <th>QW</th>
                <th>QX</th>
                <th>QY</th>
                <th>QZ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {edges.map((edge, index) => (
                <tr key={index}>
                  <td>{edge[0]}</td>
                  <td>{edge[1]}</td>
                  <td>{edge[2]}</td>
                  <td>{edge[3]}</td>
                  <td>{edge[4]}</td>
                  <td>{edge[5]}</td>
                  <td>{edge[6]}</td>
                  <td>{edge[7]}</td>
                  <td>{edge[8]}</td>
                  <td>
                    <Center>
                      <ActionIcon size="xs">
                        <Iconify icon={IconDelete} width={14} />
                      </ActionIcon>
                    </Center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>

        <Group h={40} position="right">
          <Button size="xs" color="green.9" onClick={handleOptimize}>
            优化
          </Button>
          <Button size="xs" color="red.9">
            取消
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}
