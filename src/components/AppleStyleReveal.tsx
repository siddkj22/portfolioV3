import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TEXT = "Hi, I'm Siddharth Jadhav, I'm a Full-Stack Developer and Competitive Programmer who builds scalable, high - performance systems that solve real problems.I've ranked in the top 3% on Codeforces (Specialist, built real - time bidding platforms handling sub - 100ms latency, and developed AI - powered applications from scratch. and a driving simulator";

// A component that renders a single word and animates its opacity based on scroll progress
const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[1.5vw] lg:mr-[1vw] mt-[1vw] inline-block">
      {children}
    </motion.span>
  );
};

export const AppleStyleReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll over the entire 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"]
  });

  const words = TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-black"
    >
      {/* Sticky container that holds the text in the center of the screen */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 md:px-24">

        {/* Subtle, minimalist top accent */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white/40 tracking-[0.4em] uppercase text-xs font-semibold">The Philosophy</span>
        </motion.div>

        {/* The massive text reveal */}
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center text-center font-bold text-[8vw] md:text-[6vw] lg:text-[3vw] leading-[1.1] tracking-tight text-white">
          {words.map((word, i) => {
            // Calculate the range for each word to fade in sequentially
            const start = i / words.length;
            const end = start + (1 / words.length);

            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </div>

        {/* Minimalist bottom line that scales out */}
        <motion.div
          className="w-px bg-gradient-to-b from-white/50 to-transparent absolute bottom-0"
          style={{
            height: useTransform(scrollYProgress, [0.8, 1], ["0vh", "20vh"])
          }}
        />

      </div>
    </section>
  );
};
