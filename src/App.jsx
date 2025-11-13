import { Route, Routes } from "react-router-dom"
import Login from "./app/Login"
import Signup from "./app/Signup"
import Home from "./app/Home"

function App() {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
    </Routes>

  )
}

export default App
