import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#e8b55a';
const CYAN = '#00d4ff';
const PURPLE = '#8b5cf6';
const BG = '#0a0a0f';

/* Pseudo-aleatorio determinista: puro para las reglas de React */
const rand = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/* Motas de polvo flotando dentro del haz del proyector */
const Dust: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const x = -rand(i + 0.13) * 6.5;
      const spread = 0.15 + (-x / 6.5) * 1.4;
      arr[i * 3] = x;
      arr[i * 3 + 1] = (rand(i + 7.31) - 0.5) * spread * 2;
      arr[i * 3 + 2] = (rand(i + 42.7) - 0.5) * spread * 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.x = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={GOLD}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/* Bobina de proyector: aro + radios, girando */
const Reel: React.FC<{ position: [number, number, number]; speed: number }> = ({
  position,
  speed,
}) => {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * speed;
  });
  return (
    <group ref={group} position={position}>
      <mesh>
        <torusGeometry args={[0.5, 0.055, 10, 32]} />
        <meshStandardMaterial color="#2a2a38" metalness={0.7} roughness={0.3} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <boxGeometry args={[0.95, 0.05, 0.04]} />
          <meshStandardMaterial color={GOLD} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
};

/* ACT I: proyector de cine con haz volumétrico y parpadeo */
const Projector: React.FC = () => {
  const beamMat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (beamMat.current) {
      const t = state.clock.elapsedTime;
      beamMat.current.opacity = 0.07 + Math.sin(t * 17) * 0.015 + Math.sin(t * 3) * 0.01;
    }
  });

  return (
    <group position={[2.6, 0.3, 0]} rotation={[0, 0.35, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 0.95, 0.9]} />
        <meshStandardMaterial color="#1b1b26" metalness={0.6} roughness={0.35} />
      </mesh>
      <Reel position={[0.3, 0.95, 0]} speed={1.8} />
      <Reel position={[-0.5, 0.95, 0]} speed={-1.3} />
      <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.18, 0.5, 16]} />
        <meshStandardMaterial color="#0d0d14" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Haz de luz */}
      <mesh position={[-3.55, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[1.7, 7, 24, 1, true]} />
        <meshBasicMaterial
          ref={beamMat}
          color={GOLD}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <group position={[-1.05, 0, 0]}>
        <Dust />
      </group>
    </group>
  );
};

/* ACT II: tira de celuloide serpenteando en el espacio */
const FilmStrip: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    }
  });
  return (
    <group ref={group}>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh
          key={i}
          position={[Math.sin(i * 0.7) * 2.6, Math.cos(i * 0.5) * 1.3, -15 - i * 1.15]}
          rotation={[0, Math.sin(i) * 0.4, Math.cos(i * 0.8) * 0.12]}
        >
          <planeGeometry args={[1.8, 1.05]} />
          <meshBasicMaterial color="#14141c" side={THREE.DoubleSide} />
          <Edges color={GOLD} />
        </mesh>
      ))}
    </group>
  );
};

/* ACT III: pantalla de cine brillando en la oscuridad */
const CinemaScreen: React.FC = () => {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (mat.current) {
      mat.current.opacity = 0.72 + Math.sin(state.clock.elapsedTime * 9) * 0.05;
    }
  });
  return (
    <group position={[-2.6, 0.4, -36]} rotation={[0, 0.4, 0]}>
      <mesh position={[0, 0, -0.02]} scale={1.03}>
        <planeGeometry args={[9, 5]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh>
        <planeGeometry args={[9, 5]} />
        <meshBasicMaterial ref={mat} color="#dce9f5" transparent />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <planeGeometry args={[13, 8]} />
        <meshBasicMaterial
          color="#7fb4ff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/* ACT IV: focos de plató */
const Spotlights: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((cone, i) => {
        cone.rotation.z = Math.sin(state.clock.elapsedTime * 0.6 + i * 2) * 0.1;
      });
    }
  });
  return (
    <group ref={group}>
      {[
        { x: -3, z: -46, color: GOLD },
        { x: 0, z: -48, color: CYAN },
        { x: 3, z: -47, color: PURPLE },
      ].map(({ x, z, color }) => (
        <mesh key={color} position={[x, 1, z]}>
          <coneGeometry args={[1.4, 5, 24, 1, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

/* Final: gran bobina dorada, el "FIN" de la película */
const FinalReel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.25;
  });
  return (
    <group ref={group} position={[0, 0.5, -66]}>
      <mesh>
        <torusGeometry args={[2.2, 0.12, 12, 48]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
          <boxGeometry args={[4.1, 0.09, 0.06]} />
          <meshBasicMaterial color={GOLD} />
        </mesh>
      ))}
    </group>
  );
};

/* Cámara: travelling por el estudio guiado por el scroll + parallax de ratón */
const Rig: React.FC<{
  scroll: React.RefObject<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
}> = ({ scroll, pointer }) => {
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, delta) => {
    const t = scroll.current ?? 0;
    const p = pointer.current ?? { x: 0, y: 0 };
    target.set(
      Math.sin(t * Math.PI * 2) * 1.2 + p.x * 0.4,
      0.3 + Math.sin(t * Math.PI * 3) * 0.4 + p.y * 0.25,
      8 - t * 68,
    );
    state.camera.position.lerp(target, Math.min(1, delta * 3));
    state.camera.lookAt(
      state.camera.position.x * 0.6,
      state.camera.position.y * 0.6,
      state.camera.position.z - 8,
    );
  });
  return null;
};

const CinematicWorld: React.FC = () => {
  const [enabled] = useState(
    () =>
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.matchMedia('(max-width: 768px)').matches,
  );
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 60, position: [0, 0.3, 8] }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={[BG, 4, 22]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2.5, 2]} intensity={30} distance={14} color={GOLD} />
        <Projector />
        <FilmStrip />
        <CinemaScreen />
        <Spotlights />
        <FinalReel />
        <Rig scroll={scroll} pointer={pointer} />
      </Canvas>
    </div>
  );
};

export default CinematicWorld;
