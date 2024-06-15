import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Avatar = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} />;
};

const Temp = () => {
    const avatarUrl = 'https://models.readyplayer.me/665969e0e2ff4b63db8c2476.glb'; // Replace with actual URL

    return (
      <div>
        <Canvas>
          <ambientLight intensity={10} />
          <OrbitControls />
          <Avatar url={avatarUrl} />
        </Canvas>
      </div>
    );
}

export default Temp
