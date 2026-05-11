import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILLS = [
  { id: "SYS.01", name: "FRONTEND", level: 98, type: "React, javascript, typescript", color: "#00F5FF" },
  { id: "SYS.02", name: "BACKEND", level: 85, type: "python, java, c++, .net, Node.js, Express.js, c#", color: "#FF00E5" },
  { id: "SYS.03", name: "FRAMEWORKS", level: 92, type: "Spring boot, django, Flask, TensorFlow, Keras ", color: "#ADFF00" },
  { id: "SYS.04", name: "CI / CD", level: 88, type: "Docker, Git, CI/CD, NGINX PostgreSQL, MySQL", color: "#FF3B3B" },
];

// Glitch Text Component
const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 -ml-1 text-red-500 z-0 opacity-70 animate-pulse">{text}</span>
          <span className="absolute top-0 left-0 ml-1 text-blue-500 z-0 opacity-70 animate-pulse">{text}</span>
        </>
      )}
    </div>
  );
};

export const CyberSkills = () => {
  const [activeSkill, setActiveSkill] = useState(SKILLS[0]);

  return (
    <section className="relative min-h-screen bg-[#030303] flex items-center justify-center p-8 overflow-hidden font-mono selection:bg-[#ADFF00] selection:text-black">

      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
               linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%),
               linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
               linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)
             `,
          backgroundSize: '100% 4px, 40px 40px, 40px 40px',
        }}
      />

      {/* Decorative corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-white/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-white/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-white/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-white/20" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left Side: Skill List */}
        <div className="flex flex-col gap-4">
          <div className="mb-8">
            <h2 className="text-[#ADFF00] text-sm tracking-[0.5em] mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ADFF00] animate-ping" />
              System Status
            </h2>
            <h3 className="text-5xl font-black text-white uppercase tracking-tighter">
              <GlitchText text="Core_Modules" />
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {SKILLS.map((skill) => (
              <motion.button
                key={skill.id}
                onMouseEnter={() => setActiveSkill(skill)}
                whileHover={{ x: 10 }}
                className={`relative group px-6 py-4 flex items-center justify-between border-l-4 transition-colors duration-300 ${activeSkill.id === skill.id
                  ? "bg-white/10 border-[#ADFF00]"
                  : "bg-black/50 border-white/10 hover:border-white/40"
                  }`}
              >
                {/* Background scanning effect on hover */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white/5 to-transparent origin-left opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1, transition: { duration: 0.3 } }}
                />

                <div className="flex flex-col items-start relative z-10">
                  <span className="text-xs text-white/40 tracking-widest">{skill.id}</span>
                  <span className={`text-xl font-bold uppercase tracking-wide ${activeSkill.id === skill.id ? 'text-white' : 'text-white/60'}`}>
                    {skill.type}
                  </span>
                </div>

                <div className="relative z-10 text-right">
                  <span className="text-xs text-[#ADFF00] opacity-0 group-hover:opacity-100 transition-opacity">OVERRIDE //</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side: HUD Display */}
        <div className="relative h-[500px] flex items-center justify-center border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden p-8">
          {/* Target Reticle Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-64 h-64 border border-white rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-72 h-72 border border-dashed border-white rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-px h-full bg-white/50" />
            <div className="absolute h-px w-full bg-white/50" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-full"
            >
              {/* Dynamic Data Stream */}
              <div className="absolute -top-12 right-0 text-xs text-white/30 tracking-widest overflow-hidden h-4">
                <motion.div
                  animate={{ y: [0, -20] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  01001100 01001111 01000001 01000100 <br />
                  01010011 01011001 01010011 01010100
                </motion.div>
              </div>

              <div className="border-l-2 pl-6" style={{ borderColor: activeSkill.color }}>
                <h4 className="text-sm tracking-widest text-white/50 mb-2 uppercase">
                  Class: {activeSkill.type}
                </h4>
                <h2 className="text-6xl font-black text-white mb-8 tracking-tighter uppercase">
                  <GlitchText text={activeSkill.name} />
                </h2>

                {/* Progress Bar HUD */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs tracking-widest uppercase text-white/60">
                    <span>Power_Level</span>
                    <span style={{ color: activeSkill.color }}>{activeSkill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full"
                      style={{ backgroundColor: activeSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    />
                    {/* Animated scanning line over progress bar */}
                    <motion.div
                      className="absolute top-0 w-8 h-full bg-white/50 blur-sm"
                      animate={{ left: ['-10%', '110%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#ADFF00] transition-colors">
                    Initialize
                  </button>
                  <button className="px-6 py-2 border border-white/20 text-white/60 font-bold uppercase text-xs tracking-widest hover:text-white hover:border-white transition-colors">
                    Diagnostic
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
