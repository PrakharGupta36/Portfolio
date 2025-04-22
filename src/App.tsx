import { Environment, Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Fragment, Suspense, useRef } from "react";
import * as THREE from "three";
import useGlobal from "./Global-State";
import Lights from "./components/Lights";
import PostProcesssing from "./components/Post-Processing";
import Macbook from "./components/Macbook";
import Table from "./components/Table";

import { Backdrop } from "@react-three/drei";

function SceneBackdrop() {
  return (
    <Backdrop
      receiveShadow={false}
      floor={20}
      segments={2}
      scale={[500, 30, 20]}
      position={[0, -1, -5]}
    >
      <meshStandardMaterial color='whitesmoke' />
    </Backdrop>
  );
}

function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lastPointerRotation = useRef(0);
  const { laptopClicked } = useGlobal();

  useFrame(({ pointer }) => {
    if (!cameraRef.current) return;

    const targetPos = laptopClicked
      ? new THREE.Vector3(0, 4.1, 1.1) // Laptop camera;
      : new THREE.Vector3(0, 3, 11); // Default camera;

    cameraRef.current.position.lerp(targetPos, 0.05);

    if (!laptopClicked) {
      cameraRef.current.rotation.y = THREE.MathUtils.lerp(
        cameraRef.current.rotation.y,
        lastPointerRotation.current || -pointer.x / 2.75,
        0.05
      );

      lastPointerRotation.current = -pointer.x / 2.75;
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={[0, 3, 11]}
      rotation={[0, 0, 0]}
      makeDefault
      near={0.05}
      far={10000}
    />
  );
}

function Ambience() {
  return (
    <Fragment>
      <PostProcesssing />
      <Environment
        preset='night'
        backgroundIntensity={0.5}
        environmentIntensity={0.2}
      />
      <SceneBackdrop />
      <Lights />
    </Fragment>
  );
}

function Experience() {
  return (
    <Fragment>
      <group rotation={[0, -0.58, 0]} position={[0, 0, 0]}>
        <Macbook />
        <Table />
      </group>
      <Ambience />
    </Fragment>
  );
}

export default function App() {
  const { laptopClicked, setLaptopClicked } = useGlobal();

  return (
    <Fragment>
      <Canvas
        style={{ backgroundColor: "whitesmoke" }}
        dpr={[0.8, 1]}
        gl={{
          antialias: false,
          stencil: false,
          depth: false,
          powerPreference: "high-performance",
        }}
        onClick={() => {
          setLaptopClicked(!laptopClicked);
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.AgXToneMapping;
          gl.setClearColor(0xfdfdfd, 0);
        }}
      >
        <Suspense fallback={null}>
          <Camera />
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
    </Fragment>
  );
}
