import {Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
// import FireTrail2 from './Components/FireTrail2'
// import TimeLine from './Components/Timeline'
import LoginForm from './Components/LoginForm'
import Home from './Pages/Home'
import AdminRoute from './Components/AdminRoute'
import AdminDashboard from './Components/AdminDashboard'




// import MouseCircle from './Components/MouseCircle'

const App = () => {
  return (
   <main>
      <NavBar/>
      {/* <MouseCircle /> */}
     {/* <FireTrail /> */}
     <Routes>
      <Route path='/login' element={<LoginForm type="login" />} />
      <Route path='/register' element={<LoginForm type="register" />} />
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<AdminRoute><AdminDashboard/></AdminRoute>} />
     </Routes>
     {/* <FireTrail2 /> */}
     {/* < TimeLine /> */}

    
   </main>
  )
}

export default App
