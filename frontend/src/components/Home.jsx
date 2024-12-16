import React, { useRef, useState } from 'react'
import Todos from './Todos'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const navigate = useNavigate()
    const [todo, setTodo] = useState('')
    const inputRef = useRef()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    const addTodo = (e) =>{
        e.preventDefault()
        try{
            axios.post('http://localhost:3000/add',{name: todo}, {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }})
            inputRef.current.value = ''
        }
        catch(err){
            console.log(err)
            alert("Error !")
        }
    }
  return (
    <div>Home
        <form onSubmit={addTodo} >
            <input ref={inputRef} type="text" onChange={(e) => setTodo(e.target.value)}/>
            <button type='submit'>Add</button>
        </form>
        <Todos />
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home