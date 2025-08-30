import { useEffect, useRef, useState } from "react";
const FireTrail2 = () => {
    const trailCount = 10;
    const positions = useRef(
        Array.from({length:trailCount}, () => ({x:0, y :0}))
    );
    const mouseRef = useRef({x:0, y:0});
    const requestRef = useRef();

    const[, forceRender] = useState(0);

    useEffect(() => {
        const handleMouse = (e) => {
            mouseRef.current = {
                x : e.clientX,
                y : e.clientY
            }
        }

        const animate = () => {
            let prev = {...mouseRef.current};
            positions.current = positions.current.map((pos) => {
                const newPos = {
                    x: pos.x + (prev.x - pos.x) * 0.3,
                    y: pos.y + (prev.y - pos.y) * 0.3,
                }
                prev = newPos;
                return newPos;
             })
            forceRender((x) => x + 1);
            requestRef.current = requestAnimationFrame(animate);
        };
        animate()
        window.addEventListener("mousemove", handleMouse)

        return () => {
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(requestRef.current)
        };
    }, [])
    
  return (
    <>
        {
            positions.current.map((pos, i) => (
                <div className="w-5 h-5 fixed rounded-full pointer-events-none" key={i}
                style={
                    { 
                        left: `${pos.x - 16}px`,
                        top: `${pos.y - 16}px`,
                        backgroundColor: 'black',
                        filter: 'blur(4px)',
                        opacity: 1 - i * 0.07,
                        transform: `scale(${1 - i * 0.05})`
                
                }
                }>

                </div>
            ))
        }
    </>
  )
}

export default FireTrail2
