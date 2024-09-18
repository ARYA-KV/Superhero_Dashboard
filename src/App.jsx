
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dahboard/Dashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>


    </Routes>
     
    </>
  )
}

export default App
