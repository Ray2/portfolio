import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export default function P5Background({ theme }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) {
      return undefined;
    }

    let instance;
    let removePointerListener;
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
        const maxDisturbances = 8;
        const disturbanceLife = 100;
        const disturbances = [];
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        let lastPointerSample = 0;
        let isPointerDown = false;
        let renderer;

        const addPointerDisturbance = (event) => {
          if (!renderer || reducedMotion) return;

          const now = performance.now();
          if (now - lastPointerSample < 78) return;
          lastPointerSample = now;

          const bounds = renderer.elt.getBoundingClientRect();
          const screenX = event.clientX - bounds.left;
          const screenY = event.clientY - bounds.top;

          disturbances.push({ x: screenX, y: screenY, age: 0 });
          if (disturbances.length > maxDisturbances) {
            disturbances.shift();
          }
        };

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
          p.pixelDensity(1);
          p.frameRate(30);
          renderer = p.createCanvas(width, height, p.WEBGL);
          renderer.parent(containerRef.current);
          p.noStroke();
          applyCanvasStyles();

          const handlePointerDown = (event) => {
            isPointerDown = true;
            addPointerDisturbance(event);
          };
          const handlePointerMove = (event) => {
            if (isPointerDown) {
              addPointerDisturbance(event);
            }
          };
          const handlePointerUp = () => {
            isPointerDown = false;
          };

          window.addEventListener("pointerdown", handlePointerDown, {
            passive: true,
          });
          window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
          });
          window.addEventListener("pointerup", handlePointerUp, {
            passive: true,
          });
          window.addEventListener("pointercancel", handlePointerUp, {
            passive: true,
          });
          window.addEventListener("blur", handlePointerUp);

          removePointerListener = () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointercancel", handlePointerUp);
            window.removeEventListener("blur", handlePointerUp);
          };
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
          applyCanvasStyles();
        };

        p.draw = () => {
          if (
            document.documentElement.classList.contains(
              "coverflow-scrolling"
            )
          ) {
            return;
          }

          if (theme === "dark") {
            p.background(8, 10, 17);
          } else {
            p.background(233, 245, 255);
          }

          const surfaceRotationX = 2;
          const surfaceRotationY = p.frameCount * 0.0001;
          const cosineX = Math.cos(surfaceRotationX);
          const sineX = Math.sin(surfaceRotationX);
          const cosineY = Math.cos(surfaceRotationY);
          const sineY = Math.sin(surfaceRotationY);
          const cameraZ = p.height / 2 / Math.tan(Math.PI / 6);

          p.rotateX(surfaceRotationX);
          p.rotateY(surfaceRotationY);

          const t = p.frameCount * 0.01;
          const margin = spacing * marginMultiplier;

          for (let index = disturbances.length - 1; index >= 0; index -= 1) {
            disturbances[index].age += 1;
            if (disturbances[index].age >= disturbanceLife) {
              disturbances.splice(index, 1);
            }
          }

          for (let x = -p.width / 2 - margin; x < p.width / 2 + margin; x += spacing) {
            for (let z = -p.height / 2 - margin; z < p.height / 2 + margin; z += spacing) {
              const n = p.noise(x * 0.01, z * 0.01, t);
              let displacedX = x;
              let displacedZ = z;
              let yOffset = p.map(n, 0, 1, -15, 15);
              let scatter = 0;
              let rotationScatter = 0;
              const rotatedX = x * cosineY + z * sineY;
              const depthBeforeX = -x * sineY + z * cosineY;
              const rotatedY =
                yOffset * cosineX - depthBeforeX * sineX;
              const rotatedZ =
                yOffset * sineX + depthBeforeX * cosineX;
              const projectionScale =
                cameraZ / Math.max(1, cameraZ - rotatedZ);
              const projectedX =
                p.width / 2 + rotatedX * projectionScale;
              const projectedY =
                p.height / 2 + rotatedY * projectionScale;

              for (const disturbance of disturbances) {
                const dx = projectedX - disturbance.x;
                const dy = projectedY - disturbance.y;
                const distance = Math.hypot(dx, dy) || 1;
                const progress = disturbance.age / disturbanceLife;
                const life = Math.pow(1 - progress, 1.35);
                const waveRadius = 24 + disturbance.age * 1.6;
                const waveDistance = Math.abs(distance - waveRadius);
                const wave = Math.exp(
                  -(waveDistance * waveDistance) / (2 * 40 * 40)
                );
                const core = Math.exp(
                  -(distance * distance) / (2 * 76 * 76)
                );
                const influence = Math.max(wave, core * 0.72) * life;

                if (influence < 0.012) continue;

                const cellPhase =
                  x * 0.071 + z * 0.053 + disturbance.age * 0.1;
                const outwardPush = influence * (25 + disturbance.age * 0.2);

                displacedX +=
                  (dx / distance) * outwardPush +
                  Math.sin(cellPhase) * influence * 12;
                displacedZ +=
                  (-dy / distance / Math.abs(sineX)) * outwardPush +
                  Math.cos(cellPhase * 1.13) * influence * 12;
                yOffset -=
                  influence * 36 +
                  Math.sin(cellPhase * 1.7) * influence * 18;
                scatter = Math.max(scatter, influence);
                rotationScatter +=
                  Math.sin(cellPhase * 0.83) * influence * 0.55;
              }

              p.push();
              p.translate(displacedX, yOffset, displacedZ);
              p.rotateX(p.frameCount * 0.01 + rotationScatter);
              p.rotateY(
                p.frameCount * 0.01 +
                  scatter * 0.7 +
                  rotationScatter * 0.42
              );
              p.rotateZ(rotationScatter * 0.6);
              const shimmer = p.sin(t * 1.3 + x * 0.01 + z * 0.01) * 10;
              if (theme === "dark") {
                p.fill(
                  24 + n * 38 + shimmer * 0.08,
                  34 + n * 44 + shimmer * 0.1,
                  54 + n * 58 + shimmer * 0.15
                );
              } else {
                p.fill(
                  152 + n * 60 + shimmer * 0.15,
                  198 + n * 38 + shimmer * 0.1,
                  232 + n * 22 + shimmer * 0.2
                );
              }
              p.box(boxSize * (1 - scatter * 0.12));
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
      if (removePointerListener) {
        removePointerListener();
      }
      if (instance) {
        instance.remove();
      }
    };
  }, [theme]);

  return <div className="p5-background" aria-hidden="true" ref={containerRef} />;
}
