

import { useGLTF, useTexture } from "@react-three/drei";
import { JSX, useRef } from "react";
import * as THREE from "three";

type TableGLTF = {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
  };
};

export default function Table(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const { nodes } = useGLTF("/models/table.glb") as unknown as TableGLTF;

  const [colorMap, normalMap, roughnessMap, displacementMap] = useTexture([
    "/textures/wood/color.jpg",
    "/textures/wood/normal.jpg",
    "/textures/wood/roughness.jpg",
    "/textures/wood/displacement.jpg",
  ]);

  // Optional: make tiling consistent
  [colorMap, normalMap, roughnessMap, displacementMap].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      <group
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, -1]}
        scale={1.132}
      >
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry}>
          <meshPhysicalMaterial
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            displacementMap={displacementMap}
            displacementScale={0.05} // tweak based on your texture
            metalness={0.1}
          />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry}>
          <meshPhysicalMaterial color='#555' metalness={0.3} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
