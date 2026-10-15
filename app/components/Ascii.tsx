"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { AsciiRenderer } from "./AsciiRenderer";

const Car = () => {
  const object = useLoader(OBJLoader, "/models/Car.obj");
  const carRef = useRef({ rotation: { x: 0, y: 0, z: 0 } });

  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y -= 0.02;
    }
  });

  return (
    <mesh position={[0, -1, 0]} ref={carRef}>
      <primitive object={object} />
    </mesh>
  );
};

export default function Ascii() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <AsciiRenderer />
        <Car />

        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="orange" />
      </Canvas>
    </div>
  );
}
