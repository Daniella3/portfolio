import { useEffect, useRef, useState } from "react";

const fullName = "Daniella˚";
const shortName = "D˚";
const letters = "abcdefghijklmnopqrstuvwxyz";
const scrambleSpeed = 100;

export default function ScrambleLogo({ enabled = true }) {
  const [text, setText] = useState(shortName);
  const animating = useRef(false);
  const cleanup = useRef(() => {});

  useEffect(() => () => cleanup.current?.(), []);

  const run = () => {
    if (!enabled || animating.current) return;
    animating.current = true;

    let i = 0;
    const current = Array(fullName.length).fill("");
    let scrambleInterval = null;

    scrambleInterval = setInterval(() => {
      const next = current.map((_, idx) =>
        idx < i ? fullName[idx] : letters[Math.floor(Math.random() * letters.length)]
      );
      setText(next.join(""));

      if (i < fullName.length) i++;
      else {
        clearInterval(scrambleInterval);
        setTimeout(() => {
          let j = fullName.length;
          const eraseInterval = setInterval(() => {
            setText(fullName.substring(0, j));
            j--;
            if (j < 1) {
              clearInterval(eraseInterval);
              setText(shortName);
              animating.current = false;
            }
          }, 100);
        }, 1000);
      }
    }, scrambleSpeed);

    cleanup.current = () => scrambleInterval && clearInterval(scrambleInterval);
  };

  return (
    <div
      className="text-[35px] text-black font-thin inline-block cursor-pointer select-none"
      style={{ fontFamily: "'Courier New', monospace" }}
      onMouseEnter={run}
      onTouchStart={run}
    >
      {text}
    </div>
  );
}
