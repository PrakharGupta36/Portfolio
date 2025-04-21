import { Fragment } from "react";

export default function Lights() {
  return (
    <Fragment>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-1, -1, -1]} decay={0} intensity={Math.PI} />
    </Fragment>
  );
}
