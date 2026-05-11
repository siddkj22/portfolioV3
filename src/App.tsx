import { IsometricScroll } from './components/IsometricScroll';
import { AnimatedIntro } from './components/AnimatedIntro';
import { ContactCard } from './components/ContactCard';
import { AppleStyleReveal } from './components/AppleStyleReveal';
import { AppleProjectSection } from './components/AppleProjectSection';
import { VelocityCarousel } from './components/VelocityCarousel';
import { DiagonalScrollGallery } from './components/DiagonalScrollGallery';
import { ProjectGallery } from './components/ProjectGallery';
import { HorizontalScroll } from './components/HorizontalScroll';
import { CyberSkills } from './components/CyberSkills';
import { PixelGameScroll } from './components/PixelGameScroll';



function App() {

  return (
    <main className="bg-[#080808]">

      {/* Animated Intro Section */}
      <AnimatedIntro />

      {/* Game Card Contact Details */}
      <ContactCard />

      {/* Classy Apple-style Philosophy Reveal */}
      <AppleStyleReveal />

      {/* Apple Style Project Showcase */}
      <AppleProjectSection />

      {/* Scroll Velocity 3D Planes */}
      {/*<VelocityCarousel /> */}

      {/* Retro Pixel Art 3D Scroll Section */}
      <PixelGameScroll />

      {/* 2D Interactive Project Grid */}
      <ProjectGallery />

      {/* Diagonal Flowing Gallery (The Image Request) */}
      <DiagonalScrollGallery />

      {/* Pinned Horizontal Scrolling Section */}
      <HorizontalScroll />

      {/* The 3D Scroll Experience */}
      <IsometricScroll />

      {/* Cyber/Mecha Skills Section */}
      <CyberSkills />





      {/* Footer / Outro */}
      <section className="h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-white/30 text-sm font-mono tracking-[1em] uppercase">Thank You For Visiting</h2>




        <button
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({});
          }}
          className="px-8 py-4 bg-white border border-white/20 text-black rounded-full text-sm font-semibold hover:scale-105 hover:border-white/50 transition-all duration-300"
        >
          Contact
        </button>
      </section>
    </main>
  );
}

export default App;
