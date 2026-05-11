import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: "BACKEND_SYSTEMS", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "ALGORITHMS_DSA", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "FRONTEND_DEV", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "AI_ML_VISION", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "DATA STREAM", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "DEVOPS_INFRA", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
];

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

const ScrambledText = ({ text, isHovered }: { text: string, isHovered: boolean }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3; // Controls the speed of the unscramble
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span className="font-mono tracking-widest uppercase font-bold text-white text-xl">{displayText}</span>;
};

const CarouselItem = ({ project, velocityFactor }: { project: any, velocityFactor: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map the velocity factor to a 3D rotation angle
  // Negative velocity (scrolling up) tilts one way, positive (scrolling down) tilts the other
  const rotateX = useTransform(velocityFactor, [-50, 0, 50], [45, 0, -45], { clamp: true });
  // Add a slight skew/twist based on velocity as well
  const rotateY = useTransform(velocityFactor, [-50, 0, 50], [-20, 0, 20], { clamp: true });
  const z = useTransform(velocityFactor, [-50, 0, 50], [-100, 0, -100], { clamp: true });

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-2xl aspect-video cursor-pointer"
      style={{
        rotateX: isHovered ? 0 : rotateX,
        rotateY: isHovered ? 0 : rotateY,
        z: isHovered ? 50 : z,
        scale: isHovered ? 1.05 : 1,
        transition: "scale 0.4s ease-out",
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-black">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
        />

        {/* Label Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent"
        >
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-[#00F5FF]" />
            <ScrambledText text={project.title} isHovered={isHovered} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const VelocityCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position
  const { scrollY } = useScroll();

  // Extract velocity from scroll position
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the velocity so the cards don't snap back violently when scrolling stops
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Scale down the velocity to a usable number for degrees of rotation
  const velocityFactor = useTransform(smoothVelocity, [-1000, 1000], [-15, 15], { clamp: false });

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] min-h-screen overflow-hidden flex flex-col items-center gap-16 perspective-container">

      <div className="text-center mb-12">
        <h2 className="text-[#00F5FF] font-mono tracking-[0.4em] text-sm mb-4 uppercase">Scroll Velocity Matrix</h2>
        <p className="text-white/40 max-w-md mx-auto">Scroll fast to distort the reality planes. Hover to stabilize and decrypt the data stream.</p>
      </div>

      <div className="flex flex-col items-center gap-32 w-full px-8 pb-32">
        {PROJECTS.map((project) => (
          <CarouselItem key={project.id} project={project} velocityFactor={velocityFactor} />
        ))}
      </div>

    </section>
  );
};
