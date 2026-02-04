import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import VanillaTilt from 'vanilla-tilt';
import './Page3.css';

// Floating & Swaying Model
function FloatingModel({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const clock = useRef(0);

  useFrame((state, delta) => {
    clock.current += delta;
    // Bob up and down
    ref.current.position.y = 0.05 * Math.sin(clock.current * 1);
    ref.current.rotation.y = 0.5 * Math.sin(clock.current * 0.5); 
  });

  return <primitive ref={ref} object={scene} scale={0.9} />;
}

export default function Page3() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tiltRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: 'Learn Shell Scripting',
      tags: ['React', 'Three.js'],
      description: 'An interactive learning platform I built to strengthen my understanding of shell scripting by restructuring course material into a more practical, hands-on format. Developed with React and enhanced with Three.js for visual engagement.',
      websiteUrl: 'https://shell-scriptingweb.firebaseapp.com/',
      modelUrl: './models/ShellScriptWeb2.glb'
    },
    {
      id: 2,
      name: 'Fruits',
      tags: ['JavaScript', 'HTML/CSS', '3d Model'],
      description: 'My second web project, built to practice multi-page layouts, basic animations, and visual design. The site integrated my first Blender 3D model. I remade it in 2026 to improve the layout and information.',
      websiteUrl: 'https://lyriele.github.io/Fruit-2026/',
      modelUrl: './models/Fruitsblend.glb'
    },
    {
      id: 3,
      name: 'Family Tree',
      tags: ['React', 'JavaScript', 'UI/UX'],
      description: 'I am developing a genealogy app that lets families digitize their history. I have built out the client and server sides to support functional user accounts, focusing on making it easy to save stories and organize old family photos in one place.',
      websiteUrl: null,
      modelUrl: './models/UnderConstructionglb.glb'
    },
  ];

  const currentProjectData = projects[currentProject];

  const handleProjectChange = (index) => {
    if (index === currentProject || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 400);
  };

  useEffect(() => {
    if (tiltRef.current && !isTransitioning) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: false,
        'max-glare': 0,
        perspective: 1000,
        scale: 1,
      });
    }
    return () => tiltRef.current?.vanillaTilt?.destroy();
  }, [currentProject, isTransitioning]);

  return (
    <div className="page3-container">
      <div className={`page3-content ${isTransitioning ? 'transitioning' : ''}`}>

        {/* LEFT SIDE */}
        <div className="page3-left">
          <h2 className="page3-project-name">{currentProjectData.name}</h2>
          <div className="page3-tags">
            {currentProjectData.tags.map((tag, i) => (
              <span key={i} className="page3-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* CENTER 3D MODEL */}
        <div className="page3-center" ref={tiltRef}>
          <Canvas
            camera={{ position: [0, 1, 7], fov: 35 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            {/* Lighting */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 15, 10]} intensity={2} />
            <pointLight position={[-10, 10, -10]} intensity={1.2} />
            <pointLight position={[10, -10, 10]} intensity={1.2} />

            <FloatingModel url={currentProjectData.modelUrl} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={(3 * Math.PI) / 4}
            />
          </Canvas>
        </div>

        {/* RIGHT SIDE */}
        <div className="page3-right">
          <p className="page3-description">{currentProjectData.description}</p>
          <a
            href={currentProjectData.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="page3-website-link"
          >
            Visit Website
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

      </div>

      {/* PROGRESS DOTS */}
      <div className="page3-progress-bar">
        {projects.map((p, index) => (
          <button
            key={p.id}
            className={`page3-progress-dot ${index === currentProject ? 'active' : ''}`}
            onClick={() => handleProjectChange(index)}
            aria-label={`Go to ${p.name}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
}
