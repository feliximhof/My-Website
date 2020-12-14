import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as THREE from "three";
import React, {
    Suspense,
    useState,
    useCallback,
    useRef,
    useMemo,
 
  } from "react";
import App from './App';
import { Canvas, useFrame } from "react-three-fiber";
import Effects from "./Effects";
import Projects from "./Projects";
import Personal from './About/Personal';
import Studies from './About/Studies';
import Work from './About/Work';
import About from './About';
import Contact from './Contact';
import { RGBAFormat } from 'three';

function Swarm({ count, mouse }) {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
  
    const particles = useMemo(() => {
      const temp = [];
      for (let i = 0; i < count; i++) {
        const t = Math.random() * 100;
        const factor = 20 + Math.random() * 100;
        const speed = 0.01 + Math.random() / 200;
        const xFactor = -20 + Math.random() * 40;
        const yFactor = -20 + Math.random() * 40;
        const zFactor = -10 + Math.random() * 20;
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
      }
      return temp;
    }, [count]);
  
    useFrame((state) => {
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
        t = particle.t += speed / 2;
        const a = Math.cos(t) + Math.sin(t * 1) / 10;
        const b = Math.sin(t) + Math.cos(t * 2) / 10;
        const s = Math.max(1.5, Math.cos(t) * 5);
        particle.mx += (mouse.current[0] - particle.mx) * 0.02;
        particle.my += (-mouse.current[1] - particle.my) * 0.02;
        dummy.position.set(
          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor),
          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor),
          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor)
        );
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    });
  
    return (
      <>
        <instancedMesh ref={mesh} args={[null, null, count]}>
          <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
          <meshPhongMaterial attach="material" color={0x673ab7} />
        </instancedMesh>
      </>
    );
  }
  
  function Zoomy() {
    // This one makes the camera move in and out
    useFrame(({ clock, camera }) =>
      camera.updateProjectionMatrix(
        void (camera.position.z = 20 + Math.sin(clock.getElapsedTime()) * 30)
      )
    );
    return null;
  }

export default function Navigator() {

    const mouse = useRef([0, 0]);
  const light = useRef();
  const [clicking, click] = useState(false);

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

    return (
    
        <div
                    className="App"
                    style={{ width: "100%", height: "100%" }}
                    onMouseMove={onMouseMove}
                    onDrag={(ev) => console.log("drag @ ", ev)}
                  >
                    <Canvas
                      style={{ width: "100%", height: "100%", position: "fixed", backgroundColor: 'transparent' }}
                      gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
                      camera={{
                        fov: 75,
                        position: [0, 0, 70],
                      }}
                      onCreated={({ gl }) => {
                        gl.setClearColor({color: 'black', alpha: 0.1}
                        );
                        // gl.toneMapping = THREE.ACESFilmicToneMapping
                        // gl.outputEncoding = THREE.sRGBEncoding
                      }}
                      onPointerUp={() => click(false)}
                      onPointerDown={() => click(true)}
                      // onPointerOver={() => hover(true)}
                      // onPointerOut={() => hover(false)}
                    >
                      {/* <ambientLight intensity={0.5} color="cyan" /> */}
                      {/* <pointLight position={[-100, 0, 100]} intensity={0.5} color="magenta" /> */}
                      {/* <pointLight position={[0, 100, -30]} intensity={2.2}>
                        <mesh>
                          <sphereBufferGeometry attach="geometry" args={[3, 32, 32]} />
                          <meshBasicMaterial attach="material" color="cyan" />
                        </mesh>
                      </pointLight> */}
                      {/* <fog attach="fog" args={['black', 100, 120]} /> */}
                      <pointLight position={[0, 100, -100]} intensity={5} color="#00f" />
                      <pointLight position={[0, 50, 0]} intensity={0.3} color={0xe30100} />
                      <pointLight ref={light} distance={30} intensity={3} color={0xd90200}>
                        <mesh>
                          <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
                          <meshBasicMaterial attach="material" color="black" />
                        </mesh>
                      </pointLight>
                      <Swarm
                        style={{ width: "100%", height: "100%" }}
                        mouse={mouse}
                        count={40}
                      />
              
                      <Suspense fallback={null}>
                        <Effects />
                      </Suspense>
                    </Canvas>
                    <main>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/projects" component={Projects}  />
                <Route path="/about" component={About}  />
                <Route path="/contact" component={Contact}  />
                <Route path="/work" component={Work}  />
                <Route path="/studies" component={Studies}  />
                <Route path="/myself" component={Personal}  />
                <Route component={Error} />
            </Switch>

        </main>
                    </div>
      
                    
           
    )
}

