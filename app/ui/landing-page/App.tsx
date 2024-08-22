"use client";

import * as THREE from "three";
import { useState, useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Html,
  Text,
  Effects,
  Environment,
  Center,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { WaterPass } from "three-stdlib";
import { ControlledInput } from "./ControlledInput";
import { IoSearchCircle } from "react-icons/io5";

extend({ WaterPass });

export default function AppThree() {
  return (
    // eventPrefix="client" to get client instead of offset coordinates
    // offset would reset xy to 0 when hovering the html overlay
    <Canvas eventPrefix="client" shadows camera={{ position: [1, 0.5, 10] }}>
      <Input scale={2} position={[0.4, 0.25, -1]} className=" rounded-3xl" />
      <Postpro />
      <Rig />
    </Canvas>
  );
}

function Postpro() {
  const ref = useRef();
  useFrame((state) => (ref.current.time = state.clock.elapsedTime * 3));
  return (
    <Effects>
      <waterPass ref={ref} factor={0.5} />
    </Effects>
  );
}

function Rig({ vec = new THREE.Vector3() }) {
  useFrame((state) => {
    state.camera.position.lerp(vec.set(1 + state.pointer.x, 0.5, 4.5), 0.01);
    state.camera.lookAt(0, 0, 0);
  });
}

function Input(props) {
  const [text, set] = useState(" Access Control System");
  return (
    <group {...props}>
      <Text
        position={[-1.2, -0.022, 0]}
        anchorX="center"
        // font="/Inter-Regular.woff"
        fontSize={0.335}
        letterSpacing={-0.0}
      >
        {text}
        <meshStandardMaterial color="black" />
      </Text>
      <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <Html transform>
        <div className="flex -ml-16">
          <ControlledInput
            type={text}
            onChange={(e) => set(e.target.value)}
            value={text}
            className="rounded-2xl w-56 border"
          />
          <IoSearchCircle className="-ml-5 mt-1" />
        </div>
      </Html>
    </group>
  );
}
