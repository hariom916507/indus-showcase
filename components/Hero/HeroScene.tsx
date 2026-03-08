"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({ position, color, size, speed, distort }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time * speed) * 0.002;
    });

    return (
        <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={speed}
                    roughness={0}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <FloatingSphere position={[-4, 2, -2]} color="#2563eb" size={0.6} speed={2} distort={0.4} />
                <FloatingSphere position={[4, -2, -1]} color="#3b82f6" size={0.4} speed={1.5} distort={0.5} />
                <FloatingSphere position={[0, 3, -3]} color="#6366f1" size={0.3} speed={2.5} distort={0.3} />
            </Canvas>
        </div>
    );
}
