import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CARDS = [
  {
    id: 1,
    title: "01. WHO",
    subtitle: "The core",
    color: "#ff3e00",
    text: "Competitive programmer and full stack developer"
  },
  {
    id: 2,
    title: "02. WHAT",
    subtitle: "Forging the Core",
    color: "#00F5FF",
    text: "Strong algorithmic problem-solving combined with hands-on experience in server-side logic and agile development."
  },
  {
    id: 3,
    title: "03. HOW",
    subtitle: "Heavy Machinery",
    color: "#ADFF00",
    text: "Simulationg the real world in code, blending custom physics and algorithms to create highly interactive experiences."
  },
  {
    id: 4,
    title: "04. ANCHOR",
    subtitle: "Going Live",
    color: "#FF00E5",
    text: "Pune, India, Siddharthkj1122@gmail.com"
  }
];

export const HorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire target section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate vertical scroll into horizontal movement (from 0% to -75% since there are 4 cards)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    // The parent container is deliberately tall (400vh) so it takes a long time to scroll past it
    <section ref={targetRef} className="relative h-[400vh] bg-[#080808]">

      {/* The sticky container stays pinned to the screen while we scroll the parent */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Background text that stays put */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-5 pointer-events-none whitespace-nowrap">
          <h2 className="text-[15vw] font-black uppercase tracking-tighter">Workflow</h2>
        </div>

        {/* The horizontal track that moves left */}
        <motion.div style={{ x }} className="flex gap-16 px-16 relative z-10">
          {CARDS.map((card, index) => {
            // Calculate a slight parallax effect for the inner content based on scroll
            const yParallax = useTransform(
              scrollYProgress,
              // Stagger the parallax range for each card based on its position
              [index * 0.25, index * 0.25 + 0.5],
              [50, -50]
            );

            return (
              <div
                key={card.id}
                className="w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] shrink-0 flex flex-col justify-between p-12 bg-[#111] border border-white/10 rounded-3xl relative overflow-hidden group"
              >
                {/* Decorative Background Blob */}
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: card.color }}
                />

                <motion.div style={{ y: yParallax }}>
                  <p className="text-sm font-mono tracking-[0.2em] mb-4" style={{ color: card.color }}>
                    {card.subtitle}
                  </p>
                  <h3 className="text-5xl font-black uppercase text-white mb-8 tracking-tighter">
                    {card.title}
                  </h3>
                </motion.div>

                <div className="relative z-10">
                  <div className="w-full h-px bg-white/10 mb-8 relative overflow-hidden">
                    {/* Animated line on hover */}
                    <div
                      className="absolute top-0 left-0 h-full w-full bg-white/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <p className="text-lg text-white/50 font-light leading-relaxed max-w-md">
                    {card.text}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
