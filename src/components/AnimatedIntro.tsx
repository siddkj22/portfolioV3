import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const AnimatedIntro = () => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mouse position values for the magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth magnetic snap
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();

    // Calculate distance from center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Apply limited movement (strength of the magnet)
    mouseX.set(middleX * 0.3);
    mouseY.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Snap back to center
    mouseX.set(0);
    mouseY.set(0);
  };

  // Text Reveal Animation variants
  const sentence = `Print( "hello world")`;
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-[#080808] overflow-hidden">
      {/* Decorative gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#ff3e00]/20 to-[#00F5FF]/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Staggered Text Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.05 }}
        className="flex mb-12 relative z-10"
      >
        {sentence.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className={`text-6xl md:text-8xl font-black text-white ${char === " " ? "w-4" : ""}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Magnetic Button */}
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ x: magneticX, y: magneticY }}
        className="relative px-12 py-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden group cursor-pointer z-10"
      >
        {/* Animated Background Color inside Button */}
        <motion.div
          initial={false}
          animate={{ scale: isHovered ? 1.5 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-0 bg-[#ff3e00] rounded-full z-0 origin-center"
          style={{
            left: '50%',
            top: '50%',
            width: '120%',
            height: '120%',
            x: '-50%',
            y: '-50%'
          }}
        />

        <span className="relative z-10 text-white font-bold tracking-widest uppercase transition-colors duration-300">
          Explore Now
        </span>
      </motion.button>

    </section>
  );
};
