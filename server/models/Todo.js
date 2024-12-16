const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state :{
        type: String,
        default: "Todo"
    },
    completed: {
        type: Boolean
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = new mongoose.model("Todo", TodoSchema)