import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scaleWrapRef = useRef(null);

  // Reveal animation like your JS (intersecting => animate)
  useInView(sectionRef, {
    onEnter: () => {
      const title = titleRef.current;
      if (!title) return;
      title.classList.remove("opacity-0");
      title.classList.add("animate-reveal");
    },
    onExit: () => {
      const title = titleRef.current;
      if (!title) return;
      title.classList.remove("animate-reveal");
      title.classList.add("opacity-0");
    },
    options: { threshold: 0.3, rootMargin: "0px 0px -50px 0px" },
  });

  // Fit contact text (scale based on wrapper width / scrollWidth)
  useEffect(() => {
    const container = scaleWrapRef.current;
    const h1 = titleRef.current;
    if (!container || !h1) return;

    const fit = () => {
      const scale = container.offsetWidth / h1.scrollWidth;
      h1.style.setProperty("--scale", String(scale));
    };

    const ro = new ResizeObserver(() => fit());
    ro.observe(container);
    fit();

    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full h-[400px] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="contact-scale" ref={scaleWrapRef}>
          <h1
            ref={titleRef}
            id="contact-title"
            className="font-extrabold [font-size:clamp(6rem,15vw,18rem)] [letter-spacing:clamp(0.25rem,6vw,6rem)] leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-left opacity-0"
          >
            <span className="block">LETS</span>
            <span className="block">CONNECT</span>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-md bg-black/50 border border-white/20 rounded-lg shadow-md p-6 max-w-[90%] md:max-w-[600px] text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-thin mb-4 text-white">
            WANT TO REACH OUT? HERE&apos;S HOW!
          </h2>
          <div className="flex items-center justify-center gap-3 text-white">
            <img src="/images/email.svg" alt="email" className="w-6 h-6 md:w-8 md:h-8" />
            <span className="font-semibold">daniella.ovbude@gmail.com</span>
          </div>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              className="mt-6 px-6 py-2 rounded-full font-bold bg-white text-black hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white transition-all"
            >
              Resume
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
