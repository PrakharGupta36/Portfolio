import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcesssing() {
  return (
    <EffectComposer multisampling={0}>
      {/* Subtle DOF - slight blur for realism */}
      <DepthOfField
        focusDistance={0}
        focalLength={0.015}
        bokehScale={0.5}
        height={480}
      />

      {/* Soft bloom */}
      <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={0.2}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.6}
        height={300}
      />

      {/* Very subtle film grain */}
      <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.005} />

      {/* Natural vignette */}
      <Vignette
        blendFunction={BlendFunction.NORMAL}
        eskil={false}
        offset={0.2}
        darkness={0.6}
      />
    </EffectComposer>
  );
}
