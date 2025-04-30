import {
  Bloom,
  DepthOfField,
  EffectComposer,
  FXAA,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostProcesssing() {
  return (
    <EffectComposer multisampling={0}>
      <FXAA />

      <DepthOfField
        focusDistance={0}
        focalLength={0.015}
        bokehScale={0.5}
        height={480}
      />

      <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={0.1}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.6}
        height={300}
      />

      <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.05} />

      <Vignette
        blendFunction={BlendFunction.NORMAL}
        eskil={false}
        offset={0.5}
        darkness={0.58}
      />
    </EffectComposer>
  );
}
