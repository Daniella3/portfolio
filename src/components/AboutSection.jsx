import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  // Reveal on scroll (like your about IntersectionObserver)
  useInView(sectionRef, {
    onEnter: () => {
      const el = sectionRef.current;
      if (!el) return;
      el.classList.remove("opacity-0", "translate-y-10");
      el.classList.add("opacity-100", "translate-y-0");
    },
    options: { threshold: 0.1, rootMargin: "50px" },
  });

  // Card interaction (hover blur/scale + keyboard focus + touch)
  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".card"));
    const isTouchDevice = "ontouchstart" in window;

    cards.forEach((c) => {
      if (!c.hasAttribute("tabindex")) {
        c.setAttribute("tabindex", "0");
        c.setAttribute("role", "button");
      }
    });

    const clearAll = () => {
      cards.forEach((c) => c.classList.remove("blur-sm", "scale-90", "scale-105", "z-10"));
    };

    const handlers = [];

    cards.forEach((card) => {
      const onEnter = () => {
        if (isTouchDevice) return;
        cards.forEach((c) => {
          if (c === card) {
            c.classList.add("scale-105", "z-10");
            c.classList.remove("blur-sm", "scale-90");
          } else {
            c.classList.add("blur-sm", "scale-90");
            c.classList.remove("scale-105", "z-10");
          }
        });
      };

      const onLeave = () => clearAll();

      const onTouchStart = () => card.classList.add("scale-105");
      const onTouchEnd = () => setTimeout(() => card.classList.remove("scale-105"), 150);

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("focus", onEnter);
      card.addEventListener("blur", onLeave);
      card.addEventListener("touchstart", onTouchStart, { passive: true });
      card.addEventListener("touchend", onTouchEnd);

      handlers.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("focus", onEnter);
        card.removeEventListener("blur", onLeave);
        card.removeEventListener("touchstart", onTouchStart);
        card.removeEventListener("touchend", onTouchEnd);
      });
    });

    container.addEventListener("mouseleave", clearAll);

    return () => {
      handlers.forEach((fn) => fn());
      container.removeEventListener("mouseleave", clearAll);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-gradient-to-r from-pink-200 to-black sm:p-8 md:p-12 lg:p-24 m-10 rounded-2xl shadow-lg relative opacity-0 translate-y-10 transition-all duration-700"
    >
      <div ref={cardsRef} className="cards flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="card w-full md:w-1/2 bg-pink-200 border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden transition-all duration-300 ease-in-out -translate-x-1.5 -translate-y-1.5 hover:-translate-x-1.5 hover:-translate-y-1.5">
          <div className="head w-full h-8 bg-black border-b-4 border-black px-3 py-1 text-pink-200 font-extrabold text-lg">
            About Me
          </div>
          <div className="content px-3 py-2 space-y-5 font-semibold text-lg">
            <p>
              I love crafting reliable systems, experimenting with bold UI ideas, and building projects
              that make life smoother–or just more fun!
            </p>
            <p>
              I graduated with a BSE in Computer Science from Washington University in St. Louis,
              Missouri in 2025. I am currently located in New York City which is my childhood home.
            </p>
          </div>
        </div>

        <div className="card w-full md:w-1/2 bg-black text-pink-200 border-4 border-pink-200 shadow-[12px_12px_0px_#FBCFEB] overflow-hidden transition-all duration-300 ease-in-out translate-x-1.5 translate-y-10 hover:translate-x-1.5 hover:translate-y-10">
          <div className="head w-full h-8 bg-pink-200 border-b-4 border-pink-200 px-3 py-1 text-black font-extrabold text-lg">
            My Interests
          </div>
          <div className="content px-3 py-2 space-y-5 font-semibold text-lg">
            <p>I first began coding in my senior year of high school during the pandemic and it quickly sparked my interest.</p>
            <p>
              I currently focus on full-stack development, combining backend reliability with frontend
              creativity to build applications that are not only dependable but also a delight to use.
            </p>
            <p>
              Outside of coding, I enjoy listening to music, inspecting elements on creatively complex
              websites, and I have become a theatre enthusiast over the recent years, specifically
              musicals and ballet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
