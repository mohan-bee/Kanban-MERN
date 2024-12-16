import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const   Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let res = await axios.post('http://localhost:3000/login', {email, password})
            if(res.data.success){
                navigate('/')
            }
            localStorage.setItem("token", res.data.data.token)
        }
        catch(err){
            console.log(err)
            alert("Invalid Credientials")
        }
    }
 
  return (
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Login