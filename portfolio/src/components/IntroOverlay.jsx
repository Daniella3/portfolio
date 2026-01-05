import { useEffect, useRef, useState } from "react";
import MatrixCanvas from "./MatrixCanvas";

const fullName = "Daniella˚";
const shortName = "D˚";
const letters = "abcdefghijklmnopqrstuvwxyz";
const scrambleSpeed = 100;

export default function IntroOverlay({ onDone }) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [text, setText] = useState(shortName);

  const timers = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ua = navigator.userAgent;
    if (ua.includes("Safari") && !ua.includes("Chrome")) {
      document.documentElement.style.webkitFontSmoothing = "antialiased";
    }

    let i = 0;
    const current = Array(fullName.length).fill("");
    let scrambleInterval = null;

    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      if (scrambleInterval) clearInterval(scrambleInterval);
    };

    scrambleInterval = setInterval(() => {
      const next = current.map((_, idx) =>
        idx < i ? fullName[idx] : letters[Math.floor(Math.random() * letters.length)]
      );
      setText(next.join(""));

      if (i < fullName.length) i++;
      else {
        clearInterval(scrambleInterval);

        const t1 = setTimeout(() => {
          let j = fullName.length;
          const eraseInterval = setInterval(() => {
            setText(fullName.substring(0, j));
            j--;
            if (j < 1) {
              clearInterval(eraseInterval);
              setText(shortName);

              const t2 = setTimeout(() => {
                setOpacity(0);

                const t3 = setTimeout(() => {
                  setVisible(false);
                  onDone?.();
                }, 1500);

                timers.current.push(t3);
              }, 700);

              timers.current.push(t2);
            }
          }, 100);
        }, 1500);

        timers.current.push(t1);
      }
    }, scrambleSpeed);

    return clearAll;
  }, [onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      style={{ opacity, transition: "opacity 1.5s ease-in-out" }}
    >
      <MatrixCanvas className="absolute inset-0 w-full h-full -z-10" />
      <h1 id="animatedText" className="text-6xl" style={{ fontFamily: "'Courier New', monospace" }}>
        {text}
      </h1>
    </div>
  );
}
