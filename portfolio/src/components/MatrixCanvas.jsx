import { useEffect, useRef } from "react";

export default function MatrixCanvas({ className = "", fontSize = 16, frameInterval = 50 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let columns = 0;
    let drops = [];
    let animationId = 0;
    let lastTime = 0;

    const heart = "♡";

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // avoid compound scaling
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.scale(dpr, dpr);

      const newColumns = Math.floor(rect.width / fontSize);
      if (newColumns > columns) {
        for (let i = columns; i < newColumns; i++) {
          drops[i] = Math.floor((Math.random() * rect.height) / fontSize);
        }
      } else if (newColumns < columns) {
        drops = drops.slice(0, newColumns);
      }
      columns = newColumns;
    };

    const draw = (t) => {
      if (t - lastTime < frameInterval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastTime = t;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "#CB0034";
        ctx.fillText(heart, x, y);

        if (Math.random() > 0.95) {
          ctx.fillStyle = "#000000";
          ctx.fillText(heart, x, y);
        }

        drops[i]++;

        if (drops[i] * fontSize > height && Math.random() > 0.99) drops[i] = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => resizeCanvas());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    resizeCanvas();
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [fontSize, frameInterval]);

  return <canvas ref={canvasRef} className={className} />;
}
