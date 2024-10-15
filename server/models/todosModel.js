const mongoose = require('mongoose')

//writing todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    subtodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"
        }
    ]
},
{
    timestamps: true
}
) 

//creating todo model
const Todo = mongoose.model('Todo',todoSchema);

//exporting the todoModel
module.exports = Todo;