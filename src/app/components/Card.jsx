"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";

import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload(
  "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb"
);
useTexture.preload(
  "/band.png"
);

export default function Card() {
  return (
    <div
      className="sticky top-0 right-0 h-screen pointer-events-none z-10"
      style={{
        position: 'sticky',
        top: 0,
        width: '50%',
        right: 0,
        left: 'auto',
        marginLeft: '50%'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        className="pointer-events-auto overflow-visible"
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          interpolate
          gravity={[0, -40, 0]}
          timeStep={1 / 120}
        >
          <Band position={[0, 0, 0]} />
        </Physics>
        <Environment background={false}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10, position = [0, 0, 0] }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef(); // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 3, // Increased from 2 for more stability
    linearDamping: 3,  // Increased from 2 for more stability
  };
  const { nodes, materials } = useGLTF(
    process.env.NODE_ENV === 'development'
      ? "http://localhost:3000/Dakshie.glb"
      : "https://itsmehi.vercel.app//Dakshie.glb"
  );
  const texture = useTexture(
    process.env.NODE_ENV === 'development'
      ? "http://localhost:3000/band.png"
      : "https://itsmehi.vercel.app//band.png"
  );
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Using slightly longer rope distances to reduce tension
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.8]); // Increased from 1
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.8]);    // Increased from 1
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.8]);    // Increased from 1
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.35, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  // Use a debounce mechanism to reduce excessive physics updates
  const lastUpdateTime = useRef(0);

  useFrame((state, delta) => {
    const currentTime = state.clock.getElapsedTime();

    // Handle dragging with smoother transitions
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      // Only wake up the bodies when necessary
      if (currentTime - lastUpdateTime.current > 0.016) { // ~60fps cap
        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
        lastUpdateTime.current = currentTime;
      }

      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      // Fix most of the jitter when over pulling the card with improved lerping
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );

        // More gradual lerping for smoother movement
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );

        // Smoother lerping with adjusted delta
        const lerpSpeed = minSpeed + clampedDistance * (maxSpeed - minSpeed);
        ref.current.lerped.lerp(
          ref.current.translation(),
          Math.min(1, delta * lerpSpeed)
        );
      });

      // Calculate catmull curve with more precision
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      // Increased point count for smoother curve
      band.current.geometry.setPoints(curve.getPoints(64)); // Increased from 32

      // More gentle tilt correction to prevent jitter
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.2, // Reduced from 0.25 for smoother correction
        z: ang.z
      });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[position[0], position[1] + 4, position[2]]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={3}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
                transparent={true} // Enable transparency on the material
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
          transparent={true} // Enable transparency for band material
        />
      </mesh>
    </>
  );
}