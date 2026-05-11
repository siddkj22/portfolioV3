import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ROSTER = [
  { id: 1, name: "JAVA & SPRING BOOT", type: "SHADOW", color: "#00F5FF", sprite: "🥷", text: "Fast attacks with plasma katana. High evasion stats.", side: -1 },
  { id: 2, name: "PYTHON & AI", type: "TANK", color: "#FF3B3B", sprite: "🤖", text: "Heavy armor. Defends against all projectile attacks.", side: 1 },
  { id: 3, name: "C++", type: "MAGIC", color: "#FF00E5", sprite: "🧙‍♂️", text: "Casts dark matter spells. Low HP, devastating AoE.", side: -1 },
  { id: 4, name: "MySQL,POSTGRESQL & REDIS", type: "BOSS", color: "#ADFF00", sprite: "🐉", text: "Breathes toxic flames. End-of-level challenge.", side: 1 },
  { id: 5, name: "TensorFlow & Keras", type: "SWARM", color: "#fcd34d", sprite: "🧟", text: "Slow but regenerates health constantly over time.", side: -1 },
  { id: 6, name: "AGILE DEVELOPMENT", type: "DEVOPS", color: "#f472b6", sprite: "👾", text: "Fires pixel lasers from a distance. Hard to hit.", side: 1 },
  { id: 7, name: "Siddharth", type: "Siddharthkj1122@gmail.com", color: "#9500ffff", sprite: "🦊", text: "Software Developer, Web Developer, Engineer", side: 1 },

];

export const PixelGameScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150, // slightly stiffer for a "snappier" arcade feel
    damping: 20,
    restDelta: 0.001
  });

  return (

    <section
      ref={containerRef}
      className="relative h-[600vh] bg-black"
    >
      {/* Sticky container that holds the text in the center of the screen */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#222034] px-8 md:px-24">
        {/*<div ref={containerRef} className="relative h-[600vh] bg-[#222034] overflow-hidden" style={{ imageRendering: 'pixelated' }}> */}
        {/* Background Pixel Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(#3f3f74 2px, transparent 2px), linear-gradient(90deg, #3f3f74 2px, transparent 2px)',
            backgroundSize: '64px 64px'
          }}
        />

        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

          {/* Arcade Header */}
          <motion.div
            className="absolute top-8 z-50 text-center w-full"
            style={{
              y: useTransform(smoothProgress, [0, 0.05], [0, -50]),
              opacity: useTransform(smoothProgress, [0, 0.05], [1, 0])
            }}
          >
            <h2 className="font-pixel text-[#fcd34d] text-3xl md:text-5xl mb-2 pixel-shadow tracking-widest uppercase">
              CHALLENGER APPROACHING
            </h2>
            <p className="font-vt text-white text-xl tracking-widest animate-pulse">
              SELECT YOUR FIGHTER...
            </p>
          </motion.div>

          {/* Character Cards Slapping In */}
          <div className="relative w-full max-w-3xl h-[60vh] md:h-[70vh] px-4 mt-12 flex items-center justify-center">
            {ROSTER.map((character, index) => {
              const step = 1 / ROSTER.length;
              const start = index * step;
              const end = start + (step * 0.8);

              const x = useTransform(smoothProgress, [start, end, 1], [1500 * character.side, 0, 0]);
              const scale = useTransform(smoothProgress, [start, end, 1], [2, 1, 1]);
              const rotateTarget = index % 2 === 0 ? -6 : 6;
              const rotate = useTransform(smoothProgress, [start, end, 1], [45 * character.side, rotateTarget, rotateTarget]);
              const opacity = useTransform(smoothProgress, [start, start + 0.05, 1], [0, 1, 1]);

              return (
                <motion.div
                  key={character.id}
                  className="absolute w-full max-w-2xl pixel-border pixel-shadow flex flex-col md:flex-row p-6"
                  style={{
                    backgroundColor: character.color,
                    x,
                    y: index * 10, // slight vertical offset so they look like a messy stack
                    scale,
                    rotate,
                    opacity,
                    zIndex: index, // Newer cards stack ON TOP of older ones
                  }}
                >
                  {/* 8-bit Sprite Placeholder */}
                  <div className="w-full md:w-5/12 bg-black/20 flex items-center justify-center border-4 border-black mb-4 md:mb-0 md:mr-6 pixel-shadow h-48 md:h-auto">
                    <span className="text-8xl md:text-9xl filter drop-shadow-lg transform hover:scale-110 transition-transform duration-200">
                      {character.sprite}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-7/12 flex flex-col justify-center bg-black/80 border-4 border-black p-6 pixel-shadow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-white text-black px-3 py-1 font-pixel text-[10px] uppercase pixel-shadow border-2 border-black">
                        {character.type}
                      </span>
                      <span className="font-pixel text-white text-sm">
                        P{index + 1}
                      </span>
                    </div>

                    <h3 className="font-pixel text-white text-2xl md:text-3xl mb-4 leading-tight uppercase text-shadow-sm">
                      {character.name}
                    </h3>

                    <div className="w-full h-2 bg-black border-2 border-white mb-4">
                      <div className="h-full bg-[#fcd34d]" style={{ width: `${60 + (index * 5)}%` }} />
                    </div>

                    <p className="font-vt text-white/80 text-xl md:text-2xl leading-relaxed">
                      {character.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Player Stats Footer */}
          <motion.div
            className="absolute bottom-8 w-full px-12 flex justify-between font-pixel text-[#fcd34d] text-sm md:text-xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)] z-50"
            style={{ opacity: useTransform(smoothProgress, [0.8, 0.9], [0, 1]) }}
          >
            <span>VS MODE</span>
            <span className="animate-pulse text-[#FF3B3B]">FIGHT!</span>
          </motion.div>

        </div>
      </div>

    </section >
  );
};


