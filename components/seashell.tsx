"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Leva, useControls } from "leva";
import * as THREE from "three";

function createGrowingTubeGeometry(
  segments: number,
  radialSegments: number,
  r0: number,
  E: number,
  C: number,
  T: number,
  sMax: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  const ds = sMax / segments;
  let X = new THREE.Vector3(0, 0, 0);
  let t = new THREE.Vector3(1, 0, 0);
  let n = new THREE.Vector3(0, 1, 0);
  let b = new THREE.Vector3(0, 0, 1);
  const centres: THREE.Vector3[] = [];
  const normalsN: THREE.Vector3[] = [];
  const normalsB: THREE.Vector3[] = [];
  const radii: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const s = i * ds;
    const radius = r0 * Math.exp(E * s);
    const k = C / radius;
    const tau = T / radius;
    centres.push(X.clone());
    normalsN.push(n.clone());
    normalsB.push(b.clone());
    radii.push(radius);
    X = X.clone().add(t.clone().multiplyScalar(radius * ds));
    const dt = n.clone().multiplyScalar(k * ds);
    const dn = t
      .clone()
      .multiplyScalar(-k * ds)
      .add(b.clone().multiplyScalar(tau * ds));
    const db = n.clone().multiplyScalar(-tau * ds);
    t = t.add(dt).normalize();
    n = n.add(dn).normalize();
    b = b.add(db).normalize();
  }

  for (let i = 0; i <= segments; i++) {
    const C0 = centres[i];
    const N = normalsN[i];
    const B0 = normalsB[i];
    const r = radii[i];
    for (let j = 0; j <= radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      positions.push(
        C0.x + (N.x * cos + B0.x * sin) * r,
        C0.y + (N.y * cos + B0.y * sin) * r,
        C0.z + (N.z * cos + B0.z * sin) * r,
      );
      normals.push(
        N.x * cos + B0.x * sin,
        N.y * cos + B0.y * sin,
        N.z * cos + B0.z * sin,
      );
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b0 = a + radialSegments + 1;
      indices.push(a, b0, a + 1, b0, b0 + 1, a + 1);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  geom.computeBoundingSphere();
  return geom;
}

const presets = {
  straight: { E: 0.1, C: 0, T: 0, sMax: 10 },
  planispiral: { E: 0.1, C: 1, T: 0, sMax: 10 },
  helical: { E: 0.1, C: 0.5, T: 0.5, sMax: 10 },
  meander: { E: 0.1, C: 0.2, T: 1, sMax: 10 },
};

function Seashell() {
  const [controls, set] = useControls(() => ({
    Preset: { options: Object.keys(presets), value: "planispiral" },
    segments: { value: 200, min: 10, max: 500, step: 10 },
    radialSegments: { value: 12, min: 3, max: 64, step: 1 },
    r0: { value: 0.5, min: 0.01, max: 2, step: 0.01 },
    E: { value: 0.1, min: 0, max: 1, step: 0.01 },
    C: { value: 0.5, min: 0, max: 2, step: 0.01 },
    T: { value: 0.2, min: -2, max: 2, step: 0.01 },
    sMax: { value: 10, min: 1, max: 50, step: 1 },
  }));
  useEffect(() => {
    const p = presets[controls.Preset as keyof typeof presets];
    set({ E: p.E, C: p.C, T: p.T, sMax: p.sMax });
  }, [controls.Preset]);

  const mesh = useRef<THREE.Mesh>(null!);
  const geom = useMemo(
    () =>
      createGrowingTubeGeometry(
        controls.segments,
        controls.radialSegments,
        controls.r0,
        controls.E,
        controls.C,
        controls.T,
        controls.sMax,
      ),
    [controls],
  );
  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={mesh} geometry={geom}>
      <meshNormalMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

export function SeashellViewer() {
  return (
    <div className="w-full h-full relative bg-black">
      <div className="top-4 right-4 z-50">
        <Leva collapsed={false} />
      </div>
      <Canvas className="inset-0" camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight />
        <OrbitControls enableDamping />
        <Seashell />
      </Canvas>
    </div>
  );
}
