import { useEffect, useRef } from "react";

const MAX_RIPPLES = 28;
const RIPPLE_LIFE = 260;
const MOVE_INTERVAL = 42;

export default function MouseTrail({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!canvas || !context || reducedMotion || coarsePointer) {
      return undefined;
    }

    const ripples = [];
    let animationFrame = 0;
    let lastMoveTime = 0;
    let isAnimating = false;

    const colors =
      theme === "dark"
        ? {
            primary: "58, 78, 112",
            secondary: "30, 44, 70",
            opacity: 0.72,
          }
        : {
            primary: "158, 204, 234",
            secondary: "202, 228, 246",
            opacity: 0.82,
          };

    const resizeCanvas = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(window.innerWidth * density));
      const height = Math.max(1, Math.floor(window.innerHeight * density));

      if (canvas.width === width && canvas.height === height) return;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.age += 1;

        const progress = ripple.age / RIPPLE_LIFE;
        const life = Math.max(0, 1 - progress);

        if (life <= 0) {
          ripples.splice(index, 1);
          continue;
        }

        const radius = 52 + Math.sin(progress * Math.PI) * 5;
        const wave = Math.sin(progress * Math.PI * 4) * 1.2;
        const outerRadius = radius + wave;
        const gradient = context.createRadialGradient(
          ripple.x,
          ripple.y,
          Math.max(0, outerRadius - 38),
          ripple.x,
          ripple.y,
          outerRadius + 46
        );

        gradient.addColorStop(0, `rgba(${colors.primary}, 0)`);
        gradient.addColorStop(
          0.38,
          `rgba(${colors.primary}, ${0.13 * life * colors.opacity})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${colors.primary}, ${0.29 * life * colors.opacity})`
        );
        gradient.addColorStop(
          0.64,
          `rgba(${colors.secondary}, ${0.1 * life * colors.opacity})`
        );
        gradient.addColorStop(1, `rgba(${colors.primary}, 0)`);

        context.beginPath();
        context.arc(ripple.x, ripple.y, outerRadius, 0, Math.PI * 2);
        context.strokeStyle = gradient;
        context.lineWidth = 18 * life + 6;
        context.stroke();

        context.beginPath();
        context.arc(ripple.x, ripple.y, radius + wave * 0.5, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${colors.primary}, ${
          0.18 * life * colors.opacity
        })`;
        context.lineWidth = 2 * life + 0.5;
        context.stroke();
      }

      if (ripples.length > 0) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const addRipple = (x, y) => {
      ripples.push({ x, y, age: 0 });
      if (ripples.length > MAX_RIPPLES) {
        ripples.shift();
      }
      startAnimation();
    };

    const handlePointerMove = (event) => {
      const now = performance.now();
      if (now - lastMoveTime < MOVE_INTERVAL) return;

      lastMoveTime = now;
      addRipple(event.clientX, event.clientY);
    };

    const handlePointerDown = (event) => {
      addRipple(event.clientX, event.clientY);
    };

    resizeCanvas();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      ripples.length = 0;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return <canvas className="mouse-trail" ref={canvasRef} aria-hidden="true" />;
}
