import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const ContactCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("Siddharthkj1122@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mouse position values for the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse movements for a more fluid tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform mouse position to rotation (tilting the card)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Calculate relative mouse position between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#080808] flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 overflow-hidden py-24 px-8 perspective-container">
      {/* Subtle Background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00F5FF]/10 via-transparent to-transparent pointer-events-none" />

      {/* Intro Text on the side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center lg:text-left max-w-lg"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1]">
          Hi, <br className="hidden lg:block" /> I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#FF00E5]">Siddharth,</span>
        </h1>
        <p className="mt-6 text-white/50 text-lg md:text-xl font-mono leading-relaxed">
          Select your player. I'm a full-stack developer ready to level up your next project.
        </p>
      </motion.div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[340px] md:w-[420px] aspect-[5/7] rounded-2xl cursor-pointer group z-10"
      >
        {/* Holographic Glowing Border */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00F5FF] via-[#FF00E5] to-[#ADFF00] opacity-40 blur-xl group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Actual Card Body */}
        <div
          className="absolute inset-0 bg-[#0c0c0c] rounded-2xl border-2 border-white/10 overflow-hidden flex flex-col p-6 shadow-2xl"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Card Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider font-mono">Siddharth Jadhav</h2>
              <p className="text-xs text-white/50 font-mono tracking-widest mt-1">PLAYER ONE</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00F5FF]/10 flex items-center justify-center border border-[#00F5FF]/50 shadow-[0_0_10px_rgba(0,245,255,0.3)]">
              <span className="text-[#00F5FF] text-xs font-bold">L99</span>
            </div>
          </div>

          {/* Card Image Placeholder */}
          <div className="w-full h-48 bg-[#111] rounded-lg mb-6 border border-white/5 relative overflow-hidden flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
            {/* You can replace this emoji with your actual picture <img src="..." /> */}
            <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">🦊</span>
          </div>

          {/* Card Stats / Contact Info */}
          <div className="flex-1 flex flex-col gap-3 font-mono text-sm relative z-10">
            <div className="bg-black/40 rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-[#00F5FF]/50 hover:bg-black/60 transition-all">
              <span className="text-[#FF3B3B] font-bold text-xs tracking-wider">CLASS:</span>
              <span className="text-white text-xs tracking-widest">FULL STACK DEV</span>
            </div>

            <div className="bg-black/40 rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-[#00F5FF]/50 hover:bg-black/60 transition-all">
              <span className="text-[#00F5FF] font-bold text-xs tracking-wider">EMAIL:</span>
              <div className="flex items-center gap-2">
                <a href="mailto:Siddharthkj1122@gmail.com" className="text-white/80 hover:text-white truncate max-w-[140px]">
                  Siddharthkj1122@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  title="Copy email"
                >
                  {copied ? (
                    <span className="text-[#ADFF00] text-xs font-bold px-1">✓</span>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-white/50 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/*

            <div className="bg-black/40 rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-[#00F5FF]/50 hover:bg-black/60 transition-all">
              <span className="text-[#FF9900] font-bold text-xs tracking-wider">PHONE:</span>
              <a href="tel:+1234567890" className="text-white/80 hover:text-white truncate max-w-[180px]">
                000000
              </a>
            </div> */}

            <div className="bg-black/40 rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-[#00F5FF]/50 hover:bg-black/60 transition-all">
              <span className="text-[#ADFF00] font-bold text-xs tracking-wider">GITHUB:</span>
              <a href="https://github.com/siddkj22" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white truncate max-w-[180px]">
                https://github.com/siddkj22
              </a>
            </div>

            <div className="bg-black/40 rounded-lg p-3 flex justify-between items-center border border-white/5 hover:border-[#00F5FF]/50 hover:bg-black/60 transition-all">
              <span className="text-[#FF00E5] font-bold text-xs tracking-wider">LINKEDIN:</span>
              <a href="https://www.linkedin.com/in/siddharthjadhav2/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white truncate max-w-[180px]">
                https://www.linkedin.com/in/siddharthjadhav2/
              </a>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              Hover to interact
            </p>
          </div>

          {/* Glare effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]),
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
