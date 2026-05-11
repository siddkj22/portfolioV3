import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: "Mechanical Engineering", color: "#FF3B3B", category: "AUG 2023", description: "Graduated with a B.E. from Savitribai Phule Pune University (GPA: 8.04/10.0)[cite: 29]. Developed a strong foundation in physics and math." },
  { id: 2, title: "The Pivot to Code", color: "#00F5FF", category: "AI DEVELOPMENT", description: "Self-learning algorithm for predictive analysis." },
  { id: 3, title: "Object-Oriented Programing with Java", color: "#FF00E5", category: "San Diego uni coursework", description: "Completed Object-Oriented Programming with Java through the University of San Diego. Focused on clean architecture and scalable backend design." },
  { id: 4, title: "Applied Machine Learning", color: "#ADFF00", category: "Course", description: "Completed Machine Learning through MIT. Learned the mathematics behind neural networks and predictive modeling." },
  { id: 5, title: "Post graduate diploma in Advanced Computing", color: "rgba(38, 113, 138, 1)", category: "FEB 2026", description: "Completed a Post Graduate Diploma at C-DAC, Pune, specializing in Software Development, AI/ML, and Cloud Computing[cite: 28]." },
];

export const IsometricScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // If the container is primarily in the viewport
      if (rect.top > -100 && rect.top < 100) {
        const now = Date.now();
        const timeSinceLastWheel = now - lastWheelTime.current;

        if (e.deltaY > 0) {
          // Scrolling down
          if (activeIndex < PROJECTS.length) {
            e.preventDefault(); // lock native page scroll

            if (timeSinceLastWheel > 600) { // 600ms cooldown
              setActiveIndex(prev => prev + 1);
              lastWheelTime.current = now;
            }
          } else if (timeSinceLastWheel < 600) {
            // Prevent accidental scrolling out of section while the last animation is finishing
            e.preventDefault();
          }
        } else if (e.deltaY < 0) {
          // Scrolling up
          if (activeIndex > 0) {
            e.preventDefault(); // lock native page scroll

            if (timeSinceLastWheel > 600) {
              setActiveIndex(prev => prev - 1);
              lastWheelTime.current = now;
            }
          } else if (timeSinceLastWheel < 600) {
            // Prevent accidental scrolling out of section when returning to top
            e.preventDefault();
          }
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (rect.top > -300 && rect.top < 300) {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const now = Date.now();
        const timeSinceLastTouch = now - lastWheelTime.current;

        if (deltaY > 20) {
          if (activeIndex < PROJECTS.length) {
            e.preventDefault();
            if (timeSinceLastTouch > 600) {
              setActiveIndex(prev => prev + 1);
              lastWheelTime.current = now;
              touchStartY = touchEndY;
            }
          } else if (timeSinceLastTouch < 600) {
            e.preventDefault();
          }
        } else if (deltaY < -20) {
          if (activeIndex > 0) {
            e.preventDefault();
            if (timeSinceLastTouch > 600) {
              setActiveIndex(prev => prev - 1);
              lastWheelTime.current = now;
              touchStartY = touchEndY;
            }
          } else if (timeSinceLastTouch < 600) {
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex]);

  // ADD THIS RIGHT BELOW YOUR EXISTING useEffect
  useEffect(() => {
    // If we are actively flipping cards (index 1, 2, 3, or 4)
    if (activeIndex > 0 && activeIndex < PROJECTS.length) {
      // 1. Magnetically snap the component to perfectly fill the screen
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      // 2. Lock the browser's scrollbar so they are trapped in the animation
      document.body.style.overflow = "hidden";
    } else {
      // 3. Unlock the scrollbar when they reach the beginning or the end
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure the scrollbar unlocks if they leave the page
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeIndex]);



  return (

    <div ref={containerRef} className="relative w-screen h-[100dvh] left-1/2 -ml-[50vw] bg-[#080808]">
      {/* original <div ref={containerRef} className="relative h-screen bg-[#080808]"> */}

      <div className="w-full h-full flex items-center justify-center overflow-hidden perspective-container">

        {/* Animated Background Title */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{
            opacity: activeIndex > 0 ? 0.02 : 0.15,
            scale: activeIndex > 0 ? 1.8 : 1,
            y: activeIndex > 0 ? -100 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[25vw] font-black text-white uppercase select-none tracking-tighter">
            Build
          </h1>
        </motion.div>

        {/* Initial Video-style Header */}
        <motion.div
          className="absolute top-16 left-16 z-50"
          animate={{
            y: activeIndex > 0 ? -80 : 0,
            opacity: activeIndex > 0 ? 0 : 1,
            scale: activeIndex > 0 ? 0.9 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-mono tracking-[0.4em] text-white/40 mb-3 uppercase">Portfolio / 2026</p>
          <h2 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
            The Design<span className="text-[#ff3e00]">.</span>
          </h2>
        </motion.div>

        {/* Isometric Card Stack */}
        <div className="relative w-full max-w-6xl aspect-video transform-style-3d px-8">
          {PROJECTS.map((project, index) => {
            const isShown = activeIndex >= index + 1;

            return (
              <motion.div
                key={project.id}
                className="absolute inset-0 glass-card flex flex-col justify-end p-16 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]"
                initial={{
                  rotateX: 0,
                  rotateZ: 0,
                  y: 1200,
                  x: 0,
                  scale: 0.9,
                  opacity: 0,
                }}
                animate={{
                  rotateX: isShown ? 52 : 0,
                  rotateZ: isShown ? -28 : 0,
                  y: isShown ? index * -45 : 1200,
                  x: isShown ? index * 25 : 0,
                  scale: isShown ? 1 - index * 0.04 : 0.9,
                  opacity: isShown ? 1 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  zIndex: PROJECTS.length - index,
                }}
              >
                {/* Decorative Accent Blur */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 blur-[120px] opacity-30 rounded-full"
                  style={{ backgroundColor: project.color }}
                />

                <div className="relative z-10 w-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-white/20" />
                    <p className="text-sm font-mono tracking-widest text-white/60 uppercase">
                      0{index + 1} — {project.category}
                    </p>
                  </div>

                  <div className="flex justify-between items-end gap-12">
                    <div className="max-w-2xl">
                      <h3 className="text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                        {project.title}
                      </h3>
                      <p className="text-lg text-white/40 max-w-md font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-24 w-24 rounded-full border border-white/10 flex items-center justify-center group bg-white/5 hover:bg-white transition-all duration-500"
                    >
                      <span className="text-2xl group-hover:text-black transition-colors transform -rotate-45 group-hover:rotate-0">
                        →
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Subtle Grainy Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-16 flex flex-col items-center"
          animate={{
            opacity: activeIndex > 0 ? 0 : 1,
            y: activeIndex > 0 ? 20 : 0
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/40 mt-4">Scroll</p>
        </motion.div>
      </div>
    </div>
  );
};
