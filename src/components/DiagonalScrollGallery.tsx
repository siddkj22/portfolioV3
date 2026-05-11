import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';

const PROJECTS = [
  { id: "00", title: "MICROSERVICES", img: "./assets/microservices.png", Text: "I specialize in building decoupled, scalable backend systems utilizing a microservices architecture to ensure high availability and modularity. My experience involves designing and implementing REST APIs using Spring Boot and ASP.NET Core, focusing on creating independent services like Authentication, Project Management, and Bidding to prevent cross-service resource contention." },
  { id: "01", title: "ALGORITHMS", img: "./assets/algorithms.png", Text: "strong foundation in competitive programming is applied through advanced implementations, such as developing a custom physics engine using vector mathematics and neural networks for autonomous navigation and collision avoidance in a self-driving car simulation." },
  { id: "02", title: "REAL-TIME SYSTEMs", img: "./assets/realtime.png", Text: "I engineered real-time systems by integrating SignalR and Redis Pub/Sub to achieve sub-100ms bid updates for concurrent users within a microservices architecture. I focused on low-latency data flow, ensuring immediate synchronization between the backend and frontend for high-stakes environments like live auctions." },
  { id: "03", title: "AI DEVELOPMENT", img: "./assets/aiImage.png", Text: "I developed AI applications by building a Convolutional Neural Network (CNN) using TensorFlow and Keras, achieving over good accuracy in classifying hand gestures from datasets. I integrated these models into full-stack environments by serving them through Flask REST APIs to provide real-time predictions for live video streams in a React frontend." },
  { id: "04", title: "FULL STACK", img: "./assets/fullstack.png", Text: "focused on system scalability by implementing independent PostgreSQL databases per service to prevent table lock contention. On the frontend, I built responsive interfaces with React, connecting them to backend services via REST APIs and NGINX gateway routing to ensure seamless data flow and deployment." },
  { id: "05", title: "AGILE DEVELOPMENT", img: "./assets/agile.png", },
  { id: "06", title: "Game Development", img: "./assets/gameDEvelopment.png", Text: "implemented realistic vehicle movement and sensor-driven steering behaviors to handle complex interactions within the game environment. I also focused on the visual logic of the game, creating custom rendering systems to visualize real-time sensor inputs and steering behavior for autonomous navigation." },
];

// The "sweet spot" range: when a card's position value is in this band, it is
// considered center-stage and gets auto-highlighted in full colour + title shown.
const SPOTLIGHT_MIN = -8;
const SPOTLIGHT_MAX = 8;

const FlowCard = ({ project, index, progress, onClick }: { project: any, index: number, progress: any, onClick: () => void }) => {
  const [isSpotlit, setIsSpotlit] = useState(false);

  // Shift all cards back by -50 at scroll=0 so card 0 starts near the centre
  // of the visible range instead of already passing the camera.
  const position = useTransform(progress, (p: number) => (p * 200) - (index * 25) - 50);

  // Track when this card enters / leaves the spotlight zone
  useMotionValueEvent(position, 'change', (pos) => {
    setIsSpotlit(pos >= SPOTLIGHT_MIN && pos <= SPOTLIGHT_MAX);
  });

  // Z-axis: Negative is far back, positive is passing behind the camera.
  const z = useTransform(position, (pos) => pos * 15);

  // X-axis: Moves from right (positive) to left (negative) as it comes closer.
  const x = useTransform(position, (pos) => pos * -12);

  // Y-axis: Moves from top (negative) to bottom (positive).
  // We add a sine wave that ripples based on the scroll progress to create the "water flow" effect.
  const y = useTransform(position, (pos) => {
    const linearY = pos * 8;
    const wave = Math.sin(pos * 0.05) * 80; // The flowing ripple
    return linearY + wave;
  });

  // Opacity: Fades in from deep background, stays solid, fades out as it hits the camera
  const opacity = useTransform(position, (pos) => {
    if (pos < -80) return 0; // too far back
    if (pos > 40) return 0;  // passed the camera

    // Fade in gradient
    if (pos < -40) return (pos + 80) / 40;
    // Fade out gradient
    if (pos > 20) return 1 - ((pos - 20) / 20);

    return 1;
  });

  return (
    <motion.div
      className="absolute w-[280px] md:w-[400px] aspect-[3/4] flex flex-col cursor-pointer"
      style={{ x, y, z, opacity }}
      onClick={onClick}
    >
      <div className={`text-white text-xs font-mono tracking-widest mb-2 transition-opacity duration-300 ${isSpotlit ? 'opacity-100' : 'opacity-50'}`}>
        {project.id}
      </div>
      <motion.div
        className="w-full h-full relative group"
        layoutId={`card-${project.id}`}
      >
        <img
          src={project.img}
          alt={project.title}
          className={`w-full h-full object-cover rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.8)] filter transition-all duration-700 ${isSpotlit ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
        />
        {/* Project Title Overlay — shown on hover OR when card is spotlit */}
        <div className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent transition-opacity duration-500 ${isSpotlit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <h3 className="text-2xl font-bold text-white tracking-tighter uppercase">{project.title}</h3>
          {isSpotlit && (
            <p className="text-xs text-[#00F5FF] font-mono tracking-widest mt-1 animate-pulse">▶ Click to expand</p>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};

export const DiagonalScrollGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<any | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-container bg-[#050505]">

        {/* Header Text from the image */}
        <div className="absolute top-12 left-8 md:top-16 md:left-16 z-50 pointer-events-none mix-blend-difference">
          <h2 className="text-4xl md:text-7xl font-bold text-white uppercase leading-[0.9] tracking-tighter">
            Archive FW'26 <br />
            Collection <span className="text-lg md:text-2xl align-top">({PROJECTS.length})</span>
          </h2>
        </div>

        <div className="absolute bottom-12 right-12 z-50 pointer-events-none">
          <p className="font-mono text-xs tracking-[0.5em] text-white uppercase">Scroll to Surf</p>
        </div>

        {/* 3D Scene Origin */}
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          {/* Shift the whole scene slightly down and left to center the diagonal path */}
          <div className="absolute" style={{ transform: 'translate(-20vw, -30vh)' }}>
            {PROJECTS.map((project, index) => (
              <FlowCard
                key={project.id}
                project={project}
                index={index}
                progress={smoothProgress}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Expand Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              layoutId={`card-${activeProject.id}`}
              className="w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeProject.img}
                alt={activeProject.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              <button
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-black/60 transition-all"
                onClick={() => setActiveProject(null)}
              >
                ✕
              </button>

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                <h3 className="text-sm font-mono text-[#00F5FF] tracking-widest mb-4">PROJECT // {activeProject.id}</h3>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase leading-tight drop-shadow-lg">{activeProject.title}</h2>
                <p className="text-white/90 leading-relaxed mb-8 font-light text-lg md:text-xl max-w-2xl drop-shadow-md">
                  {activeProject.Text}.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform">
                    View Case Study
                  </button>
                  <button className="px-8 py-4 bg-black/40 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-colors">
                    Live Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
