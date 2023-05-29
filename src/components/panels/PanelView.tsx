import { useState, useRef } from 'react'
import { Box } from '@mantine/core'
import * as THREE from 'three'
import { useControls } from 'leva'
// components
import Toolbar from '../toolbar/Toolbar'
import { useEffect } from 'react'
import { IPose } from '@/types/project'
import { useLoopClose } from '@/zustand/useLoopClose'

import { IFrame } from '@/types/frame'

declare global {
  interface Window {
    Potree: any
    TWEEN: any
  }
}

const { Potree } = window

let viewer: any

interface PanelViewProps {
  path?: string
  footprint?: IPose[]
  raycaster: boolean
  pointCloudVisible: boolean
  footprintVisible: boolean
}

export default function PanelView({
  path,
  footprint,
  raycaster,
  pointCloudVisible = false,
  footprintVisible = false
}: PanelViewProps) {
  const axesRef = useRef<THREE.AxesHelper | null>(null)
  const gridRef = useRef<THREE.GridHelper | null>(null)
  const pointCloudRef = useRef<any>(null)
  const footprintRef = useRef<{
    points: THREE.Object3D
    tube: THREE.Mesh
  }>()

  const { size, shape, pointSizeType, activeAttributeName, gradient, color } =
    useControls({
      total: {
        label: '点总数',
        value: Number(281112324).toLocaleString(),
        editable: false
      },
      size: {
        label: '点大小',
        value: 1,
        min: 0.1,
        max: 3
      },
      shape: {
        label: '点形状',
        value: 0,
        options: {
          矩形: 0,
          圆形: 1
        }
      },
      pointSizeType: {
        label: '尺寸类型',
        value: 0,
        options: {
          固定: 0,
          自适应: 2
        }
      },
      activeAttributeName: {
        label: '颜色类型',
        value: 'rgba',
        options: {
          RGB: 'rgba',
          高程: 'elevation',
          自定义: 'color'
        }
      },
      gradient: {
        label: '渐变预设',
        value: 0,
        options: {
          SPECTRAL: 0,
          PLASMA: 1,
          YELLOW_GREEN: 2,
          VIRIDIS: 3,
          INFERNO: 4,
          GRAYSCALE: 5,
          TURBO: 6,
          RAINBOW: 7,
          CONTOUR: 8
        },
        render: (get) => get('activeAttributeName') === 'elevation'
      },
      color: {
        label: '自定义颜色',
        value: '#ffffff',
        render: (get) => get('activeAttributeName') === 'color'
      }
    })

  const handleAxesChange = (v: boolean) => {
    axesRef.current!.visible = v
  }

  const handleGridChange = (v: boolean) => {
    gridRef.current!.visible = v
  }

  const handleCameraChange = (v: number) => {
    if (v === 0) viewer.setCameraMode(0)
    if (v === 1) viewer.setCameraMode(1)
  }

  const handleControlChange = (v: number) => {
    if (v === 0) viewer.setControls(viewer.orbitControls)
    if (v === 1) viewer.setControls(viewer.earthControls)
  }

  const handleViewChange = (v: number) => {
    switch (v) {
      case 0:
        viewer.setLeftView()
        break
      case 1:
        viewer.setRightView()
        break
      case 2:
        viewer.setTopView()
        break
      case 3:
        viewer.setBottomView()
        break
      case 4:
        viewer.setFrontView()
        break
      case 5:
        viewer.setBackView()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const elRenderer = document.getElementById('renderer')
    if (!elRenderer) return

    viewer = new Potree.Viewer(elRenderer)
    viewer.setEDLEnabled(true)
    viewer.setFOV(60)
    viewer.setPointBudget(5 * 1000 * 1000)
    viewer.setControls(viewer.earthControls)
    viewer.renderer.antialias = false
    viewer.renderer.setPixelRatio(window.devicePixelRatio)

    const axesHelper = new THREE.AxesHelper(25)
    viewer.scene.scene.add(axesHelper)
    axesRef.current = axesHelper

    const gridHelper = new THREE.GridHelper(1000, 100, '#ffffff', '#ffffff')
    gridHelper.rotateX(Math.PI / 2)
    const gridMaterial = new THREE.MeshBasicMaterial({
      opacity: 0.2,
      transparent: true
    })
    gridHelper.material = gridMaterial
    gridRef.current = gridHelper
    viewer.scene.scene.add(gridHelper)

    viewer.scene.view.setView([10, 10, 10], [0, 0, 0])
  }, [])

  useEffect(() => {
    if (path) {
      Potree.loadPointCloud(
        `file://${path}/potree/metadata.json`,
        'pointcloud',
        (e: any) => {
          let { pointcloud } = e
          viewer.scene.addPointCloud(pointcloud)
          viewer.fitToScreen()
          pointcloud.material.activeAttributeName = 'elevation'
          pointcloud.material.size = 1
          pointcloud.material.shape = 0
          pointcloud.material.miniSize = 0
          pointcloud.material.pointSizeType = 0
          pointcloud.material.opacity = 1

          pointCloudRef.current = pointcloud
        }
      )
    }
  }, [path])

  useEffect(() => {
    console.log(raycaster)
    if (raycaster) {
      const ct = document.getElementById('renderer')
      if (!ct) return

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const onMouseMove = (event: MouseEvent) => {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        var rect = ct.getBoundingClientRect()
        mouse.x =
          ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1
        mouse.y =
          -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1
      }

      const onMouseClick = (event: MouseEvent) => {
        if (!useLoopClose.getState().currentFrame) {
          // update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, viewer.scene.getActiveCamera())

          // calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObjects(
            footprintRef.current!.points.children
          )

          if (intersects.length > 0) {
            const point = intersects[0].object
            // set blue color
            // @ts-ignore
            point.material.color.setHex('0x376df6')

            // set current frame
            useLoopClose.getState().setCurrentFrame(point.userData as IFrame)
            return
          }
        }

        if (!useLoopClose.getState().referenceFrame) {
          // update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, viewer.scene.getActiveCamera())

          // calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObjects(
            footprintRef.current!.points.children
          )

          if (intersects.length > 0) {
            const point = intersects[0].object
            // set blue color
            // @ts-ignore
            point.material.color.setHex('0x376df6')

            // set current frame
            useLoopClose.getState().setReferenceFrame(point.userData as IFrame)
            return
          }
        }
      }
      window.addEventListener('mousemove', onMouseMove, false)
      window.addEventListener('click', onMouseClick, false)
    }
  }, [raycaster])

  useEffect(() => {
    if (footprint && footprint.length > 0) {
      const points = new THREE.Object3D()

      for (let point of footprint) {
        let geometry = null
        if (point.id === '119' || point.id === '1042') {
          geometry = new THREE.SphereGeometry(0.3, 32, 32)
        } else {
          geometry = new THREE.SphereGeometry(0.1, 32, 32)
        }
        const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
          point.position[0],
          point.position[1],
          point.position[2]
        )
        const euler = new THREE.Euler().setFromQuaternion(
          new THREE.Quaternion(
            point.orientation[1],
            point.orientation[2],
            point.orientation[3],
            point.orientation[0]
          )
        )
        var angles = new THREE.Vector3()
          .fromArray(euler.toArray() as [number, number, number])
          .multiplyScalar(THREE.MathUtils.RAD2DEG)
        sphere.userData = {
          id: point.id,
          timestamp: point.timestamp,
          px: point.position[0],
          py: point.position[1],
          pz: point.position[2],
          qw: point.orientation[0],
          qx: point.orientation[1],
          qy: point.orientation[2],
          qz: point.orientation[3],
          rx: angles.x,
          ry: angles.y,
          rz: angles.z
        } as IFrame
        points.add(sphere)
      }

      const vectors: THREE.Vector3[] = []
      for (let i = 0; i < points.children.length; i++) {
        const point = points.children[i]
        vectors.push(point.position)
      }

      const closedSpline = new THREE.CatmullRomCurve3(vectors)

      const tubeGeometry = new THREE.TubeGeometry(
        closedSpline,
        points.children.length,
        0.01,
        8,
        false
      )
      const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial)

      viewer.scene.scene.add(tube)

      viewer.scene.scene.add(points)
      footprintRef.current = {
        points,
        tube
      }
    }
  }, [footprint])

  useEffect(() => {
    if (pointCloudRef.current) {
      pointCloudRef.current.material.pointSizeType = pointSizeType
    }
  }, [pointSizeType])

  useEffect(() => {
    if (pointCloudRef.current) {
      pointCloudRef.current.material.activeAttributeName = activeAttributeName
    }
  }, [activeAttributeName])

  useEffect(() => {
    if (pointCloudRef.current) {
      const gradientNames = Object.keys(Potree.Gradients)
      let gradientName = gradientNames[gradient]
      let gradientValue = Potree.Gradients[gradientName]
      pointCloudRef.current.material.gradient = gradientValue
    }
  }, [gradient])

  useEffect(() => {
    if (pointCloudRef.current) {
      pointCloudRef.current.material.shape = shape
    }
  }, [shape])

  useEffect(() => {
    if (pointCloudRef.current) {
      pointCloudRef.current.material.size = size
    }
  }, [size])

  useEffect(() => {
    if (pointCloudRef.current) {
      pointCloudRef.current.material.color = new THREE.Color(color)
    }
  }, [color])

  useEffect(() => {
    if (pointCloudRef.current) {
      pointCloudRef.current.visible = pointCloudVisible
    }
  }, [pointCloudVisible])

  useEffect(() => {
    if (footprintRef.current) {
      footprintRef.current.points.visible = footprintVisible
      footprintRef.current.tube.visible = footprintVisible
    }
  }, [footprintVisible])

  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="dark.7"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.dark[4]}`,
          borderBottom: `1px solid ${theme.colors.dark[4]}`,
          borderLeft: `1px solid ${theme.colors.dark[4]}`
        })}
      >
        <Toolbar
          onAxesChange={handleAxesChange}
          onGridChange={handleGridChange}
          onCameraChange={handleCameraChange}
          onControlChange={handleControlChange}
          onViewChange={handleViewChange}
        />

        <Box id="renderer" pos="relative" w="100%" h="100%" />
      </Box>
    </>
  )
}
