import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
    const [todos, setTodos] = useState([]); 
    const [error, setError] = useState(null); 
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const fetchTodo = async () => {
        try {
            const response = await axios.get('http://localhost:3000/todos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTodos(response.data); 
        } catch (err) {
            console.error("Error fetching todos:", err);
            setError("Failed to fetch todos. Please try again later.");
            navigate('/login')
        }
    };

    useEffect(() => {
        fetchTodo();
    }, [todos]);

    return (
        <div>
            <h1>Todos</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            {!todos.length && !error && <p>Loading...</p>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        {todo.name} - {todo.state} == {todo.completed}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
