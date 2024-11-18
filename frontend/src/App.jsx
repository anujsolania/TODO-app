import { useEffect, useState } from 'react'
import './App.css'
import Createtodo from './components/Createtodo'
import Gettodo from './components/GetTodo'
import SignupLogin from './components/SignupLogin'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';






function App() {
  const [todos,settodos] = useState([])


  async function fetchTodos() {
    const token = localStorage.getItem("authtoken")
    const response = await fetch("http://localhost:3000/gettodos",{
      method: "GET",
      headers:{
        "authorization": token
      }
    }); 
    const json = await response.json()
    const TODOS = await json.TODOS
    if (!TODOS) {
      settodos([])
    } else {
      settodos(TODOS)
    }
  }
  useEffect(() => {
    fetchTodos();
  }, [todos]);


  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignupLogin/>}></Route>
          <Route path='/todobnao' element={<><Createtodo/><Gettodo proptodos={todos}/></>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
{/* <Createtodo/> */}


