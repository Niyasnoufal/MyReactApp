import { useEffect, useRef, useState } from "react";

const FireTrail = () => {
  const trailCount = 10; // number of circles
  const positions = useRef(
    Array.from({ length: trailCount }, () => ({ x: 0, y: 0 }))
  );
  const mouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef();
  const [, forceRender] = useState(0); // force React to re-render

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      let prev = { ...mouse.current };
      positions.current = positions.current.map((pos) => {
        const newPos = {
          x: pos.x + (prev.x - pos.x) * 0.3,
          y: pos.y + (prev.y - pos.y) * 0.3,
        };
        prev = newPos;
        return newPos;
      });

      forceRender((v) => v + 1); // 🔥 force update each frame
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {positions.current.map((pos, i) => (
        <div
          key={i}
          className="fixed w-5 h-5 rounded-full pointer-events-none"
          style={{
            left: `${pos.x - 16}px`,
            top: `${pos.y - 16}px`,
            backgroundColor: 'black', // orange/red hues
            filter: "blur(4px)", // glowing fire
            opacity: 1 - i * 0.07,
            transform: `scale(${1 - i * 0.05})`,
          }}
        />
      ))}
    </>
  );
};

export default FireTrail;
