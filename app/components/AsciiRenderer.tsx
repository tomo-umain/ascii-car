"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { AsciiEffect } from "three/examples/jsm/Addons.js";

export type AsciiRendererProps = {
  /** Render index, default: 1 */
  renderIndex?: number;
  /** CSS background color (can be "transparent"), default: black */
  bgColor?: string;
  /** CSS character color, default: white */
  fgColor?: string;
  /** Characters, default: ' .:-+*=%@#' */
  characters?: string;
  /** Invert character, default: true */
  invert?: boolean;
  /** Colorize output (very expensive!), default: false */
  color?: boolean;
  /** Level of detail, default: 0.15 */
  resolution?: number;
};

const RAMP_PRESETS = {
  standard:
    " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@",
  detailed: " `.',:i1!Itofv|()[]{}?sxyz*#$@WM",
  blocky: " ░▒▓█",
};

export function AsciiRenderer({
  renderIndex = 1,
  characters = RAMP_PRESETS.standard,
  invert = false,
  color = true,
  resolution = 0.15,
}: AsciiRendererProps) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    });
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, invert, color, resolution, gl]);

  // Append on mount, remove on unmount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    gl.domElement.style.opacity = "0";
    gl.domElement.parentNode?.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      gl.domElement.parentNode!.removeChild(effect.domElement);
    };
  }, [effect, gl]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame(() => {
    effect.render(scene, camera);
  }, renderIndex);

  // return something to not break type signatures
  return <></>;
}
