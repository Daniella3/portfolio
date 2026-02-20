import { useState } from "react";
import "./style.css";

import IntroOverlay from "./components/IntroOverlay";
import MatrixCanvas from "./components/MatrixCanvas";
import Navbar from "./components/Navbar";
import IntroHero from "./components/IntroHero";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative font-mono min-h-screen bg-white dark:bg-black">
      <MatrixCanvas className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      <IntroOverlay onDone={() => setReady(true)} />

      <main className={` transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
        <Navbar logoEnabled={ready} />

        <IntroHero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

