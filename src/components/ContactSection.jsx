import { useRef } from "react";
import { useInView } from "../hooks/useInView";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useInView(sectionRef, {
    onEnter: () => {
      titleRef.current?.classList.remove("opacity-0");
      titleRef.current?.classList.add("animate-reveal");
    },
    onExit: () => {
      titleRef.current?.classList.remove("animate-reveal");
      titleRef.current?.classList.add("opacity-0");
    },
    options: { threshold: 0.3 },
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-[500px] md:min-h-[400px] bg-white dark:bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 z-0 pointer-events-none">
        <h1
          ref={titleRef}
          className="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 dark:from-purple-700 via-pink-500 dark:via-pink-800 to-red-500 dark:to-red-800 opacity-40 md:opacity-100"
        >
          <div className="flex justify-between w-full text-[clamp(3rem,22vw,14rem)] md:text-[clamp(1rem,20vw,14rem)]">
            {"LET'S".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>

          <div className="flex justify-between w-full pt-25 md:pt-0 text-[clamp(3rem,22vw,14rem)] md:text-[clamp(1rem,20vw,14rem)]">
            {"CONNECT".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>
        </h1>
      </div>

      <div className="relative z-10 backdrop-blur-md bg-white/70 md:bg-white/40 dark:bg-black/70 dark:md:bg-black/40 border border-white/20 rounded-lg shadow-xl p-4 md:p-6 lg:p-8 w-[85%] sm:w-[80%] md:max-w-[600px] md:max-w-[600px] text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-thin mb-4 text-black dark:text-white">
          WANT TO REACH OUT? HERE&apos;S HOW!
        </h2>

        <div className="flex items-center justify-center gap-3 text-black dark:text-white">
          <svg
            viewBox="0 -2.5 20 20"
            className="w-6 h-6 md:w-8 md:h-8"
            fill="currentColor"
          >
            <path d="m18 2.291-8 7.027-8-7.037V2h16zM2 13V4.945l8 7.035 8-7.027V13zm-2 2h20V0H0z"/>
          </svg>
          <span className="font-semibold text-lg md:text-xl lg:text-2xl">
            daniella.ovbude@gmail.com
          </span>
        </div>

        <a href="./Daniella_Ovbude.pdf" target="_blank" rel="noopener noreferrer">
          <button
            type="button"
            className="mt-6 px-6 py-2 rounded-full font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white transition-all"
          >
            Resume
          </button>
        </a>
      </div>
    </section>
  );
}