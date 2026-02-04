import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import "./Page2.css";

// 3D Model Preview Component
function ModelPreview({ url, scale = 1 }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

// Modal Component for Full View
function DesignModal({ design, designs, onClose, onNavigate }) {
  const isSeries = design.series;
  const seriesDesigns = isSeries 
    ? designs.filter(d => d.series === design.series) 
    : [];
  const currentIndex = seriesDesigns.findIndex(d => d.id === design.id);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(seriesDesigns[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < seriesDesigns.length - 1) {
      onNavigate(seriesDesigns[currentIndex + 1]);
    }
  };

  const handleThumbnailClick = (selectedDesign) => {
    onNavigate(selectedDesign);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-body">
          <div className="modal-content-wrapper">
            <div className="modal-viewer-section">
              {isSeries && currentIndex > 0 && (
                <button className="modal-nav modal-nav-prev" onClick={handlePrevious}>
                  &lt;
                </button>
              )}
              {isSeries && currentIndex < seriesDesigns.length - 1 && (
                <button className="modal-nav modal-nav-next" onClick={handleNext}>
                  &gt;
                </button>
              )}

              {design.type === 'model' && (
                <div className="modal-3d-viewer">
                  <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.8} />
                    <Suspense fallback={null}>
                      <ModelPreview url={design.url} scale={design.scale || 1} />
                    </Suspense>
                    <OrbitControls enableZoom={true} />
                  </Canvas>
                </div>
              )}
              
              {design.type === 'video' && (
                <video 
                  src={design.url} 
                  controls 
                  autoPlay 
                  loop 
                  className="modal-video"
                />
              )}
              
              {design.type === 'image' && (
                <img src={design.url} alt={design.title} className="modal-image" />
              )}
            </div>

            {/* Thumbnail Gallery for Series - Vertical on Right */}
            {isSeries && seriesDesigns.length > 1 && (
              <div className="thumbnail-gallery">
                <div className="thumbnail-track">
                  {seriesDesigns.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`thumbnail-item ${idx === currentIndex ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(item)}
                    >
                      {item.type === 'model' && (
                        <div className="thumbnail-3d">
                          <Canvas camera={{ position: [0, 1, 2], fov: 50 }}>
                            <ambientLight intensity={0.8} />
                            <directionalLight position={[3, 3, 3]} intensity={1} />
                            <Suspense fallback={null}>
                              <ModelPreview url={item.url} scale={item.previewScale || 0.6} />
                            </Suspense>
                            <OrbitControls 
                              enableZoom={false} 
                              enablePan={false}
                              autoRotate
                              autoRotateSpeed={2}
                            />
                          </Canvas>
                        </div>
                      )}
                      
                      {item.type === 'video' && (
                        <div className="thumbnail-video">
                          <video 
                            src={item.url} 
                            muted 
                            loop 
                            autoPlay 
                            playsInline
                          />
                        </div>
                      )}
                      
                      {item.type === 'image' && (
                        <div className="thumbnail-image">
                          <img src={item.url} alt={item.title} />
                        </div>
                      )}
                      
                      <div className="thumbnail-title">{item.title}</div>
                    </div>
                  ))}
                </div>
                <div className="series-counter">
                  {currentIndex + 1} / {seriesDesigns.length}
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-info">
            <h2>{design.title}</h2>
            {design.series && (
              <p className="modal-series">
                {design.series}
              </p>
            )}
            <p>{design.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Design Card
function DesignCard({ design, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="conveyor-card"
      onClick={() => onClick(design)}
    >
      <div className="card-content">
        {design.type === 'model' && (
          <div className="card-3d-preview">
            <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Suspense 
                fallback={
                  <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#444" />
                  </mesh>
                }
              >
                <ModelPreview url={design.url} scale={design.previewScale || 0.8} />
              </Suspense>
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
              />
            </Canvas>
          </div>
        )}
        
        {design.type === 'video' && (
          <div className="card-video-preview">
            <video 
              src={design.url} 
              muted 
              loop 
              autoPlay 
              playsInline
              className="card-video"
              onLoadedData={() => setIsLoaded(true)}
            />
          </div>
        )}
        
        {design.type === 'image' && (
          <div className="card-image-preview">
            <img 
              src={design.url} 
              alt={design.title} 
              className="card-image"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        )}
        
        <div className="card-title-overlay">
          <h3>{design.title}</h3>
        </div>
      </div>
    </div>
  );
}

// Conveyor Row Component
function ConveyorRow({ designs, speed, direction, onCardClick }) {
  const [isPaused, setIsPaused] = useState(false);
  const rowRef = useRef(null);

  return (
    <div 
      className="conveyor-row"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={rowRef}
    >
      <div 
        className={`conveyor-track ${isPaused ? 'paused' : ''}`}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction
        }}
      >
        {[...designs, ...designs].map((design, index) => (
          <DesignCard 
            key={`${design.id}-${index}`}
            design={design}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default function Page2() {
  const [selectedDesign, setSelectedDesign] = useState(null);

  const handleNavigate = (design) => {
    setSelectedDesign(design);
  };

  // Bloom Cats Series - Images and Animation
  const bloomCatsDesigns = [
    {
      id: 'bloom-1',
      title: 'Alstroemeria Cat',
      type: 'image',
      url: './cats/AlCat3.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
    },
    {
      id: 'bloom-2',
      title: 'Orchid Cat',
      type: 'image',
      url: './cats/OrchidCat2.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 2
    },
    {
      id: 'bloom-3',
      title: 'Columbine Cat',
      type: 'image',
      url: './cats/ColumbineCat3.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
    },
    {
      id: 'bloom-4',
      title: 'Bloom Cats Animation',
      type: 'video',
      url: './videos/BloomCats.mp4',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
    },
    {
      id: 'bloom-5',
      title: 'Pansy Cat',
      type: 'image',
      url: './cats/PansyCat2.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
     },
     {
       id: 'bloom-6',
       title: 'Dahlia Cat',
       type: 'image',
      url: './cats/DahliaCat.png',
       series: 'Bloom Cats',
       previewScale: 0.8,
       scale: 1.5
     },
     {
       id: 'bloom-7',
       title: 'Mushroom Cat',
      type: 'image',
      url: './cats/MushroomCat3.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
     },
        {
      id: 'bloom-8',
      title: 'Sunflower Cat',
      type: 'image',
      url: './cats/SunFlowerCat2.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
     },
     {
      id: 'bloom-9',
      title: 'Dandelion Cat',
      type: 'image',
      url: './cats/DandelionCat.png',
      series: 'Bloom Cats',
      previewScale: 0.8,
      scale: 1.5
     },
  ];

  // Name Series (Theo)
  const nameSeriesDesigns = [
    {
      id: 'name-1',
      title: 'Theo',
      type: 'image',
      url: './images/Theo.png',
      series: 'Name',
      previewScale: 0.8,
      scale: 1.5
    },
    {
      id: 'name-2',
       title: 'Cybele',
       type: 'image',
       url: './images/Cybele2.png',
       series: 'Name',
       previewScale: 0.8,
       scale: 1.5
     },
   {
      id: 'name-3',
       title: 'Norbert',
       type: 'image',
       url: './images/Norbert6.png',
       series: 'Name',
       previewScale: 0.8,
       scale: 1.5
     },
  ];

    const jewelsDesigns = [
    {
       id: 'jewels-2',
       title: 'Flora',
       type: 'video',
       url: './videos/Flora.mp4',
       previewScale: 0.6,
       scale: 1.2
     },
      {
       id: 'jewels-1',
       title: 'FlowerJewelery',
       type: 'video',
       url: './videos/FlowerTwist.mp4',
       previewScale: 0.6,
       scale: 1.2
     },
     {
       id: 'jewels-1',
       title: 'RingTwist',
       type: 'video',
       url: './videos/RingTwist.mp4',
       previewScale: 0.6,
       scale: 1.2
     },
  ];

  // Miscellaneous Animations and Designs
  const miscellaneousDesigns = [
    {
      id: 'misc-1',
      title: 'Spinning Globe',
      type: 'video',
      url: './videos/Rova.mp4',
    },
    {
      id: 'misc-2',
      title: 'Beach Scene',
      type: 'video',
      url: './videos/Beach.mp4',
    },
    {
      id: 'misc-3',
      title: 'Snow Globe',
      type: 'video',
      url: './videos/SnowGlobe.mp4',
    },
    {
      id: 'misc-4',
      title: 'Interactive Room',
      type: 'video',
      url: './videos/PoolName.mp4',
      previewScale: 0.6,
      scale: 1.2
    },
      {
       id: 'misc-5',
       title: 'Flora',
       type: 'video',
       url: './videos/Champagne.mp4',
       previewScale: 0.6,
       scale: 1.2
     },
      {
       id: 'misc-6',
       title: 'Train',
       type: 'video',
       url: './videos/TrainImproved.mp4',
       previewScale: 0.6,
       scale: 1.2
     },
  ];

  // Combine all designs for modal navigation
  const allDesigns = [...bloomCatsDesigns, ...nameSeriesDesigns, ...miscellaneousDesigns];

  return (
    <div className="page2">
      <div className="page2-header">
        <h1 className="page2-title">Designs</h1>
        <p className="page2-subtitle">3D Art & Animations</p>
      </div>

      <div className="conveyor-container">
        {/* Bloom Cats Series */}
        <div className="series-section">
          <h3 className="series-label">Bloom Cats</h3>
          <ConveyorRow 
            designs={bloomCatsDesigns}
            speed={40}
            direction="normal"
            onCardClick={setSelectedDesign}
          />
        </div>

        {/* Name Series */}
        {nameSeriesDesigns.length > 0 && (
          <div className="series-section">
            <h3 className="series-label">Name</h3>
            <ConveyorRow 
              designs={nameSeriesDesigns}
              speed={45}
              direction="reverse"
              onCardClick={setSelectedDesign}
            />
          </div>
        )}

        {/* Jewel Series */}
        {jewelsDesigns.length > 0 && (
          <div className="series-section">
            <h3 className="series-label">Jewels</h3>
            <ConveyorRow 
              designs={jewelsDesigns}
              speed={45}
              direction="reverse"
              onCardClick={setSelectedDesign}
            />
          </div>
        )}

        {/* Miscellaneous */}
        <div className="series-section">
          <h3 className="series-label">Animations</h3>
          <ConveyorRow 
            designs={miscellaneousDesigns}
            speed={50}
            direction="normal"
            onCardClick={setSelectedDesign}
          />
        </div>
      </div>

      {selectedDesign && (
        <DesignModal 
          design={selectedDesign}
          designs={allDesigns}
          onClose={() => setSelectedDesign(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}