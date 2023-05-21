import { useState, useRef } from 'react'
import { Box } from '@mantine/core'
import * as THREE from 'three'
import { useControls } from 'leva'
// components
import Toolbar from '../toolbar/Toolbar'
import { useEffect } from 'react'

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
}

export default function PanelView({ path }: PanelViewProps) {
  const axesRef = useRef<THREE.AxesHelper | null>(null)
  const gridRef = useRef<THREE.GridHelper | null>(null)

  const { size, shape, pointSizeType, activeAttributeName } = useControls({
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
        圆形: 0,
        矩形: 1
      }
    },
    pointSizeType: {
      label: '尺寸类型',
      value: 0,
      options: {
        固定: 0,
        自适应: 1
      }
    },
    activeAttributeName: {
      label: '颜色类型',
      value: 'rgba',
      options: {
        RGB: 'rgba',
        高程: 'elevation',
        自定义: 'custom'
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
    HEX: {
      label: '自定义颜色',
      value: '#ffffff',
      render: (get) => get('activeAttributeName') === 'custom'
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
    viewer.setControls(viewer.orbitControls)
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
        }
      )
    }
  }, [path])

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
