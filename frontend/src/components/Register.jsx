import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const   Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let res = await axios.post('http://localhost:3000/register', {name,email, password})
            console.log(res)
            if (res.data.success){
                navigate('/login')
            }
        }
        catch(err){
            console.log(err)
            alert("User Already Exists!!")
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Register