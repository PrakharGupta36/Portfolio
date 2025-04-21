import { Fragment } from "react";

export default function Lights() {
  return (
    <Fragment>
      <spotLight
        position={[2, 5, 2]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        castShadow
      />
      <ambientLight intensity={0.2} />
    </Fragment>
  );
}
