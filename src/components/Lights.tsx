import { Fragment } from "react";

export default function Lights() {
  return (
    <Fragment>
      <ambientLight intensity={Math.PI / 2} />

      <pointLight position={[-1, 2, -1]} decay={0} intensity={Math.PI} />
    </Fragment>
  );
}
