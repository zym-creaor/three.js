import React, { Suspense, useRef,useState } from 'react'
import { Canvas, extend, useLoader, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, Loader, useTexture } from '@react-three/drei'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'
import * as THREE from 'three'
import './App.css'
extend({ LUTPass })

const deg2rad = degrees => degrees * (Math.PI / 180);

function Grading() {
    const { texture3D } = useLoader(LUTCubeLoader, '/cubicle-99.CUBE')
    return <Effects children={<lUTPass attachArray="passes" lut={texture3D} />} />
}
function Controls(props) {
    const { camera, gl } = useThree()
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <OrbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]}  />
}
function Sphere(props) {
    //   const texture = useTexture('/terrazo.png')
    const texture = useLoader(THREE.TextureLoader, '/2294472375_24a3b8ef46_o.jpg')
    const [rotate,setRotate]=useState(true)
    return (
        <mesh
            onClick={(e) => {
                if(texture){
                    setRotate(false)
                }
            }}
            // onContextMenu={(e) => console.log('context menu')}
            // onDoubleClick={(e) => console.log('double click')}
            // onWheel={(e) => console.log('wheel spins')}
            // onPointerUp={(e) => console.log('up')}
            // onPointerDown={(e) => console.log('down')}
            // onPointerOver={(e) => console.log('over')}
            // onPointerOut={(e) => console.log('out')}
            // onPointerEnter={(e) => console.log('enter')}
            // onPointerLeave={(e) => console.log('leave')}
            // onPointerMove={(e) => console.log('move')}
            // onPointerMissed={() => console.log('missed')}
            // onUpdate={(self) => console.log('props have been updated')}
        >
            {/* <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} /> */}
            <sphereBufferGeometry args={[1, 64, 64]} />
            <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} clearcoat={0.8} clearcoatRoughness={0} roughness={1} metalness={0} />
            <Controls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={rotate} rotateSpeed={-0.5} />
        </mesh>
        // <mesh {...props}>
        //   <sphereBufferGeometry args={[1, 64, 64]} />
        //   <meshPhysicalMaterial envMapIntensity={0.4} map={texture} clearcoat={0.8} clearcoatRoughness={0} roughness={1} metalness={0} />
        // </mesh>
    )
}

export default function App() {
    // const { camera, gl } = useThree()

    // camera.rotation.set(deg2rad(30), 0, 0);
    return (
        <div className='App'>
            <Canvas frameloop="demand" dpr={[1, 2]}>
                <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[5, 15, 10]} />
                <Suspense fallback={null}>
                    <Sphere />
                    {/* <Grading /> */}
                    <Environment preset="warehouse" />
                </Suspense>
                <OrbitControls></OrbitControls>
            </Canvas>
            <Loader />
        </div>
    )
}
