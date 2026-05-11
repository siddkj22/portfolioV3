import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: "BIDSPHERE",
    subtitle: "REAL-TIME BIDDING PLATFORM",
    description: "A microservices platform using Spring Boot and ASP.NET Core SignalR. Features live auctions with Redis Pub/Sub for sub-100ms bid updates.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/Bid-Sphere/Real-Time-Bidding-System",
  },
  {
    id: 2,
    title: "Sign Language Recognition",
    subtitle: "COMPUTER VISION & CLASSIFICATION",
    description: "A Convolutional Neural Network built with TensorFlow and Keras, classifying signs with 95%+ accuracy and streaming results through a Flask API to a React frontend",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/siddkj22/hand-sign-recognition-and-classification",
  },
  {
    id: 3,
    title: "Self Driving Car Simulation",
    subtitle: "PHYSICS & NEURAL NETWORK AUTONOMOUS NAVIGATION",
    description: "A custom physics engine using vector mathematics paired with a neural network for autonomous vehicle navigation and collision avoidance.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/siddkj22/self-driving-car-simulation-python",
  }
];

export const AppleProjectSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-white text-black">
      {PROJECTS.map((project, i) => {
        return (
          <div key={project.id} className="h-[150vh] relative">
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden">

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center px-8 md:px-24 z-10 text-center md:text-left pt-20 md:pt-0">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-style custom spring easing
                >
                  <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-2">
                    {project.title}
                  </h2>
                  <h3 className="text-2xl md:text-4xl font-light text-gray-500 tracking-tight mb-8">
                    {project.subtitle}
                  </h3>
                  <p className="text-lg md:text-xl font-light text-gray-600 max-w-md leading-relaxed">
                    {project.description}
                  </p>

                  <a href={project.link}
                    target="blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-10 px-8 py-4 bg-black text-white rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300">
                    Learn more
                  </a>



                  {/* <button className="mt-10 px-8 py-4 bg-black text-white rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300">
                    Learn more
                  </button> */}
                </motion.div>
              </div>

              {/* Image Container */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center p-8 md:p-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
