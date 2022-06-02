import React, { Suspense } from 'react'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, Loader, useTexture } from '@react-three/drei'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'
import * as THREE from 'three'
import './App.css'
extend({ LUTPass })

function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, '/cubicle-99.CUBE')
  return <Effects children={<lUTPass attachArray="passes" lut={texture3D} />} />
}

function Sphere(props) {
//   const texture = useTexture('/terrazo.png')
  const texture = useLoader(THREE.TextureLoader, '/2294472375_24a3b8ef46_o.jpg')

  return (
    <mesh>
    {/* <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} /> */}
    <sphereBufferGeometry args={[1, 64, 64]} />
    <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide}clearcoat={0.8} clearcoatRoughness={0} roughness={1} metalness={0} />
  </mesh>
    // <mesh {...props}>
    //   <sphereBufferGeometry args={[1, 64, 64]} />
    //   <meshPhysicalMaterial envMapIntensity={0.4} map={texture} clearcoat={0.8} clearcoatRoughness={0} roughness={1} metalness={0} />
    // </mesh>
  )
}

export default function App() {
  return (
    <div className='App'>
      <Canvas frameloop="demand" dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[5, 15, 10]} />
        <Suspense fallback={null}>
          <Sphere />
          <Grading />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Loader />
    </div>
  )
}
