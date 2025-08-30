import { useEffect, useRef, useState } from "react";

const TimelineItem = ({ children, direction = "left" }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-1/2 px-6 transition-all duration-700 ease-out transform opacity-0 
      ${visible ? "opacity-100 translate-x-0" : direction === "left" ? "-translate-x-20" : "translate-x-20"}
      ${direction === "left" ? "text-right" : "text-left"}`}
    >
      <div className="p-4 bg-blue-500 text-white rounded-xl shadow-lg inline-block">
        {children}
      </div>
    </div>
  );
};

export default function Timeline() {
  const events = [
    "Started learning coding",
    "Built my first project",
    "Got freelance clients",
    "Became a pro 😎",
    "Want to be an Entrepreneur",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare",
    "Next road towards billionare"
  ];

  return (
    <div className="relative max-w-4xl mx-auto p-6">
      {/* Vertical center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>

      {events.map((event, i) => (
        <div key={i} className="flex w-full relative mb-12">
          {/* Dot on center line */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></span>

          {i % 2 === 0 ? (
            <>
              <TimelineItem direction="left">{event}</TimelineItem>
              <div className="w-1/2"></div>
            </>
          ) : (
            <>
              <div className="w-1/2"></div>
              <TimelineItem direction="right">{event}</TimelineItem>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
