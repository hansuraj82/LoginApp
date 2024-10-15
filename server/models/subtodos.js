const  mongoose = require('mongoose');

//creating sutodos schema
const SubTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false,
        required: true
    }

},
{
    timestamps: true
}
);

//creating the modal of subTodoSchema
const SubTodo = mongoose.model('SubTodo',SubTodoSchema);


//exporting subtodo
module.exports = SubTodo;