import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';

// UPDATE YOUR USERNAMES HERE:
const USERNAMES = {
  leetcode: "SiddharthJadhav", // Replace with your actual LeetCode username
  codeforces: "ninjahamara", // Replace with your actual Codeforces username
  github: "siddkj" // Replace with your actual GitHub username
};

const PROJECTS = [
  {
    id: 1,
    title: "LeetCode Progress",
    category: "PROBLEM SOLVING",
    color: "#FFA116",
    // Dynamic LeetCode Stats Card
    image: `https://leetcard.jacoblin.cool/${USERNAMES.leetcode}?theme=dark&font=Syne&ext=activity`,
    description: "Tracking consistent problem-solving skills, mastering data structures, and optimizing algorithmic efficiency."
  },
  {
    id: 2,
    title: "Codeforces Rank",
    category: "ACHIEVEMENT",
    color: "#1F8ACB",
    // Dynamic Codeforces Stats Card
    image: `https://codeforces-readme-stats.vercel.app/api/card?username=${USERNAMES.codeforces}&theme=dark`,
    description: "Showcasing my current rating and highest achievements in intense, time-constrained competitive programming contests."
  },
  {
    id: 3,
    title: "Codeforces Graph",
    category: "RATING HISTORY",
    color: "#FF3B3B",
    // NOTE: The external Codeforces Graph API is currently down/broken. 
    // Please take a screenshot of your graph, place it in public/assets, and link it here (e.g., './assets/cf-graph.png')
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description: "A visual representation of my rating trajectory, highlighting growth and consistency over numerous contests."
  },
  {
    id: 4,
    title: "LeetCode Graph",
    category: "ACTIVITY CHART",
    color: "#00F5FF",
    // Dynamic LeetCode Heatmap Graph
    image: `https://leetcard.jacoblin.cool/${USERNAMES.leetcode}?theme=dark&ext=heatmap`,
    description: "A detailed heatmap of my daily problem-solving streak and submission activity on LeetCode."
  },
  {
    id: 5,
    title: "GitHub Stats",
    category: "OPEN SOURCE",
    color: "#ADFF00",
    // Dynamic GitHub Stats Card (Shows Total Commits, PRs, Stars, etc.)
    image: `https://github-readme-stats.vercel.app/api?username=${USERNAMES.github}&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true`,
    description: "My open-source footprint, including total commits, pull requests, and continuous development activity across repositories."
  },
];

const ProjectCard = ({ project, onClick }: { project: typeof PROJECTS[0], onClick: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="group relative h-[450px] w-full overflow-hidden rounded-3xl bg-[#111] border border-white/10 cursor-pointer"
    >
      {/* Background Image with Hover Scale */}
      <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-30 pointer-events-none">
        <img
          src={project.image}
          alt={project.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Dynamic Hover Glare Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${project.color}30,
              transparent 80%
            )
          `,
        }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span
            className="px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full border border-white/20 backdrop-blur-sm"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            whileHover={{ scale: 1.2, rotate: 0 }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-white hover:text-black"
          >
            <span className="text-xl">↗</span>
          </motion.div>
        </div>

        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className="text-4xl font-black uppercase tracking-tight mb-4 text-white">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectGallery = () => {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section className="py-32 px-8 min-h-screen bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-[#ff3e00] font-mono tracking-[0.3em] text-sm mb-4 uppercase">Developer Stats</p>
          <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter text-white">
            Coding <br /> Profiles.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-12 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              layoutId={`card-${activeProject.id}`}
              className="w-full max-w-5xl h-[85vh] bg-[#111] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-black/80 transition-all"
                onClick={() => setActiveProject(null)}
              >
                ✕
              </button>

              <div className="relative w-full h-[50%] md:h-[60%] flex flex-col items-center justify-center bg-[#0a0a0a] border-b border-white/10 p-8">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-contain pointer-events-none z-10"
                />
                {/* A subtle colored glow behind the image based on its category color */}
                <div
                  className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${activeProject.color} 0%, transparent 70%)` }}
                />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center flex-1 bg-[#111]">
                <span
                  className="px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full border border-white/20 inline-block w-max mb-6"
                  style={{ color: activeProject.color }}
                >
                  {activeProject.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">{activeProject.title}</h2>
                <p className="text-white/70 leading-relaxed font-light text-lg md:text-xl max-w-3xl">
                  {activeProject.description}
                  <br /><br />
                  Here you can add even more detailed insights, link to specific repositories, or elaborate on the challenges faced and metrics achieved in this specific category!
                </p>
                <div className="mt-auto pt-8 flex gap-4">
                  <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-transform">
                    View Source
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
