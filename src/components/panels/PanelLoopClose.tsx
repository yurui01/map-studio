import { Box } from '@mantine/core'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import Toolbar from '../toolbar/Toolbar'
import { useRef } from 'react'

export default function PanelLoopClose() {
  const gridRef = useRef<THREE.GridHelper | null>(null)
  const gridHelperMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    opacity: 0.25,
    transparent: true
  })

  const handleGridChange = (v: boolean) => {
    gridRef.current!.visible = v
  }
  
  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="dark.7"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.dark[4]}`,
          borderBottom: `1px solid ${theme.colors.dark[4]}`
        })}
      >
        <Toolbar onGridChange={handleGridChange} control={false} />
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
    </>
  )
}
