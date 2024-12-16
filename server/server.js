const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const User = require('./models/Users');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URI)
    .then(() => console.log("Database Connected Successfully.."))
    .catch(err => console.error("Database connection failed:", err));


app.post('/register', async (req, res) => {
    const { name, email, password, isAdmin = false } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({success: false});
        }

        const newUser = new User({
            name,
            email,
            password,
            isAdmin,
        });

        await newUser.save();
        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser || existingUser.password !== password) {
            return res.status(401).send("Invalid email or password");
        }

        const token = jwt.sign({ userId: existingUser._id, isAdmin: existingUser.isAdmin }, SECRET, { expiresIn: "1h" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    isAdmin: existingUser.isAdmin
                },
                token,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send("Access Denied: No Token Provided");
    }

    try {
        const decodedJWT = jwt.verify(token, SECRET);
        req.user = decodedJWT;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(401).send('Access Denied: Invalid Token');
    }
};


app.post('/add', authenticateJWT, async (req, res) => {
    const { name, state,completed = false} = req.body;

    try {
        const newTodo = new Todo({
            name,
            state,
            completed,
            userId: req.user.userId,
        });

        await newTodo.save();
        res.status(200).send("To-Do Created Successfully");
    } catch (err) {
        console.error("Error while creating Todo:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.put('/editName/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const todo = await Todo.findOne({ _id: id, userId: req.user.userId });
        if (!todo) {
            return res.status(404).send("Todo not found or you don't have permission to edit it");
        }

        if (name !== undefined) todo.name = name;
        await todo.save();

        res.status(200).send("Todo Edited Successfully");
    } catch (err) {
        console.error("Error while editing Todo:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.delete('/del/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;

    if (!req.user.isAdmin) {
        return res.status(403).send("Access Denied: Only Admins can delete Todos");
    }

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).send("Todo not found");
        }

        res.status(200).send("Todo Deleted Successfully by the Admin");
    } catch (err) {
        console.error("Error while deleting Todo:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.get('/todos', authenticateJWT, async (req, res) => {
    try {
        if(req.user.isAdmin){
            const todos = await Todo.find()
            res.status(200).json(todos)
        }
        else{
            const todos = await Todo.find({ userId: req.user.userId });
            res.status(200).json(todos);
        }
    } catch (error) {
        console.error("Error while fetching Todos:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
