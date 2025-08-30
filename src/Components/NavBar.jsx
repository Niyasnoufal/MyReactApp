import { navData } from "../navData";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../assets/logo.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
const NavBar = () => {

    const navigate = useNavigate()

    const[isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
        return () => unSubscribe()
    }, [])

    console.log(user)

    const handleSignOut = async() => {
        await signOut(auth)
    }
  
  return (
    <nav className="w-screen flex justify-around items-center bg-black text-white">
        <div className="logo">
            <img src={NavLogo}  alt="My Logo"/>
        </div>

        <ul className="flex justify-around items-center">
            {
             navData.map((items) => (
                   <li key={items.id} className="navLinks hidden sm:flex" >

                        {
                            items.children ? 
                           ( <>

                              <select onChange={(e) => {
                                if(e.target.value) navigate(e.target.value)
                              }
                              }>
                                    <option value="">{items.name}</option>
                                        {
                                            items.children.map((childitems) => (
                                                <option key={childitems.id} value={childitems.path}>
                                                    {childitems.name}
                                                </option>
                                            ))
                                        }
                                
                                   
                              </select>
                            </> ): (<Link to={items.path}>{items.name}</Link>)
                        }
                            
                   
                   </li>
                ))
            }

            {
                !user ? (
                    <>
                        <button className="w-[150px] h-[40px] border rounded-md bg-blue-500 text-white hover:bg-white hover:text-black duration-300 ease-in-out"><Link to="/login">Login </Link></button>
                         <button className="w-[150px] h-[40px] border rounded-md bg-blue-500 text-white hover:bg-white hover:text-black duration-300 ease-in-out"><Link to="/register">Register </Link></button>
                    </> 
                )  :   (
                    <>
                        <h1 className="text-xs bold">Welcome, {user.email}</h1>
                        <button onClick={handleSignOut} className="w-[150px] h-[40px] bg-red-600 text-sm text-white">Logout</button>
                    </>
                )      
            }
            

        </ul>
        <button className="flex sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            {
                !isOpen ? <RxCross1 /> :<GiHamburgerMenu />
            }
                    
         </button>

         {
            !isOpen && (
                <ul className="absolute top-16 left-0 w-full bg-black text-white flex flex-col gap-4 p-4 sm:hidden shadow:md">
                    {
                 navData.map((items) => (
                   <li key={items.id} className="navLinks" >

                        {
                            items.children ? 
                           ( <>

                              <select onChange={(e) => {
                                if(e.target.value) navigate(e.target.value)
                              }
                              }>
                                    <option value="">{items.name}</option>
                                        {
                                            items.children.map((childitems) => (
                                                <option key={childitems.id} value={childitems.path}>
                                                    {childitems.name}
                                                </option>
                                            ))
                                        }
                                
                                   
                              </select>
                            </> ): (<Link to={items.path} onClick={() => setIsOpen(!isOpen)}>{items.name}</Link>)
                        }
                            
                   
                   </li>
                ))
                    }
                </ul>
            )
         }
    </nav>
  )
}

export default NavBar
