import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export default function P5Background() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) {
      return undefined;
    }

    let instance;
    const scriptEl = document.querySelector(
      'script[src*="p5.min.js"],script[src*="p5.js"]'
    );

    const createSketch = () => {
      if (!window.p5 || !containerRef.current) {
        return;
      }
      const sketch = (p) => {
        const spacing = 27;
        const boxSize = 25;
        const marginMultiplier = 20;
        let renderer;

        const applyCanvasStyles = () => {
          if (!renderer) return;
          renderer.style("position", "fixed");
          renderer.style("top", "0");
          renderer.style("left", "0");
          renderer.style("width", "100%");
          renderer.style("height", "100%");
          renderer.style("z-index", "0");
          renderer.style("pointer-events", "none");
        };

        p.setup = () => {
          const width = window.innerWidth || CANVAS_WIDTH;
          const height = window.innerHeight || CANVAS_HEIGHT;
          renderer = p.createCanvas(width, height, p.WEBGL);
          renderer.parent(containerRef.current);
          p.noStroke();
          applyCanvasStyles();
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
          applyCanvasStyles();
        };

        p.draw = () => {
          p.background(255);

          p.rotateX(2);
          p.rotateY(p.frameCount * 0.0001);

          const t = p.frameCount * 0.01;
          const margin = spacing * marginMultiplier;

          for (let x = -p.width / 2 - margin; x < p.width / 2 + margin; x += spacing) {
            for (let z = -p.height / 2 - margin; z < p.height / 2 + margin; z += spacing) {
              const n = p.noise(x * 0.01, z * 0.01, t);
              const yOffset = p.map(n, 0, 1, -15, 15);

              p.push();
              p.translate(x, yOffset, z);
              p.rotateX(p.frameCount * 0.01);
              p.rotateY(p.frameCount * 0.01);
              p.fill(180 + n * 75);
              p.box(boxSize);
              p.pop();
            }
          }
        };
      };

      instance = new window.p5(sketch, containerRef.current);
    };

    if (window.p5) {
      createSketch();
    } else if (scriptEl) {
      scriptEl.addEventListener("load", createSketch);
    }

    return () => {
      if (scriptEl) {
        scriptEl.removeEventListener("load", createSketch);
      }
      if (instance) {
        instance.remove();
      }
    };
  }, []);

  return <div className="p5-background" aria-hidden="true" ref={containerRef} />;
}
