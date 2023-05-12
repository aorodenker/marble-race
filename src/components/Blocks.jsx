import * as THREE from 'three';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, Float } from '@react-three/drei';
import { useRef, useState } from 'react';

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0, roughness: 0 });
const floor2Material = new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0, roughness: 0 });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', metalness: 0, roughness: 1 });
const wallMaterial = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 });

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position} >
      <Float floatIntensity={0.5} rotationIntensity={0.5} >
        <Text
          scale={0.3}
          font="/bebas-neue-v9-latin-regular.woff"
          color="#ffffff"
          position={[0, 0.75, 0]}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      >
      </mesh>
    </group>
  );
};

const BlockEnd = ({ position = [0, 0, 0] }) => {
  const hamburger = useGLTF('./hamburger.glb');
  hamburger.scene.children.forEach(mesh => mesh.castShadow = true);

  return (
    <group position={position} >
      <Text
        font="/bebas-neue-v9-latin-regular.woff"
        scale={1}
        position={[0, 2.25, 2]}
        color="#ffffff"
      >
        Finish
      </Text>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
      >
      </mesh>
      <RigidBody type="fixed" colliders="hull" position={[0, 0.25, 0]} restitution={0.2} friction={0} >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
};

const Spinner = ({ position = [0, 0, 0] }) => {
  const obstacleRef = useRef();
  const [speed] = useState((Math.random() + 0.02) * (Math.random() < 0.5 ? -1 : 1));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const timeSpeed = time * speed;
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, timeSpeed, 0));

    obstacleRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position} >
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      >
      </mesh>
      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0} >
        <mesh
          receiveShadow
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        >
        </mesh>
      </RigidBody>
    </group>
  );
};

const Limbo = ({ position = [0, 0, 0] }) => {
  const obstacleRef = useRef();
  const [timeOffset] = useState(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(time + timeOffset) + 1.15;
    const nextPosition = { x: position[0], y: position[1] + y, z: position[2] };

    obstacleRef.current.setNextKinematicTranslation(nextPosition);
  });

  return (
    <group position={position} >
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      >
      </mesh>
      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0} >
        <mesh
          receiveShadow
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        >
        </mesh>
      </RigidBody>
    </group>
  );
};

const Axe = ({ position = [0, 0, 0] }) => {
  const obstacleRef = useRef();
  const [timeOffset] = useState(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;
    const nextPosition = { x: position[0] + x, y: position[1] + 0.75, z: position[2] };

    obstacleRef.current.setNextKinematicTranslation(nextPosition);
  });

  return (
    <group position={position} >
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      >
      </mesh>
      <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0} >
        <mesh
          receiveShadow
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
        >
        </mesh>
      </RigidBody>
    </group>
  );
};

const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0} >
        <mesh
          castShadow
          geometry={boxGeometry}
          material={wallMaterial}
          position={[2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
        />
        <mesh
          receiveShadow
          geometry={boxGeometry}
          material={wallMaterial}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
        />
        <mesh
          receiveShadow
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, 0.75, -(length * 4) + 2]}
          scale={[4, 1.5, 0.3]}
        />
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

export {
  BlockStart,
  BlockEnd,
  Spinner,
  Limbo,
  Axe,
  Bounds
};