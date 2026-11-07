import Portfolio from "./Portfolio";
import P5Background from "./P5Background.jsx";
import MouseTrail from "./MouseTrail.jsx";

export default function App() {
  return (
    <div className="app-shell theme-light">
      <P5Background theme="light" />
      <MouseTrail theme="light" />
      <Portfolio />
    </div>
  );
}
