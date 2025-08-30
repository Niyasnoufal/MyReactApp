import { useEffect, useState} from "react"

const MouseCircle = () => {
    const[posX, setPosX] = useState(0);
    const[posY, setPosY] = useState(0);


    useEffect (() => {
    const handleMouse = (e) => {
            setPosX(e.clientX);
            setPosY(e.clientY);
    }
        window.addEventListener("mousemove", handleMouse);
        return () => {
            window.removeEventListener("mousemove", handleMouse)
        }
    }, [])
  return (
    <>
        <div className="w-5 h-5 rounded-full bg-blue-500 shadow-2xl fixed pointer-events-none transition-transform duration-100" style={{left: `${posX -20}px`, top:`${posY- 20}px`}}>
        </div>
        
    </>
        
  ) 
}

export default MouseCircle
