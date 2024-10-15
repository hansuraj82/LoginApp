const express = require('express');
const router = express.Router();
const Todo = require('../models/todosModel');
const SubTodo = require('../models/subtodos')
const userModel = require('../models/userModel');
const { Auth } = require('../jwtAuth');

//route for createTodo
router.post('/todo', Auth, async (req, res) => {
    try {
        //destructuring userId from jwtToken
        const { userId } = req.user;
        //finding all the data of the user with the help of userId
        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ error: 'User Not Found' })
        const { title, complete, subtodos } = req.body;
        let subtodoResponses = [];
        if (Array.isArray(subtodos) && subtodos.length > 0) {
            for (const subtodo of subtodos) {
                const { content, isCompleted } = subtodo;
                const newSubTodo = new SubTodo({
                    content,
                    isCompleted
                });
                const newSubTodoResponse = await newSubTodo.save()
                subtodoResponses.push(newSubTodoResponse._id);

            }
        }

        const newTodo = new Todo({
            title,
            complete,
            createdBy: userId,
            subtodos: subtodoResponses


        })
        const response = await newTodo.save();
        if (!response) return res.status(500).json({ errro: "No Response" })
        res.status(200).json({ msg: response })

    } catch (error) {
        res.status(500).json({ Errorincatch: error })
    }
});


//route for display todo
router.get('/todo', Auth, async (req, res) => {
    try {
        const { userId } = req.user;
        const userExistData = await Todo.find({ createdBy: userId }).populate('subtodos');
        userExistData.reverse()
        res.status(200).json({ todo: userExistData })
    } catch (error) {
        res.status(500).json({ msg: "server Error" });
    }


})

//route to delete the todo
router.delete('/todo/:id', Auth, async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId)
        const { subtodos } = todo;
        if (Array.isArray(subtodos) && subtodos.length > 0) {
            for (const subtodo of subtodos) {
                const res = await SubTodo.findByIdAndDelete(subtodo)
            }

        }


        const todoDelete = await Todo.findByIdAndDelete(todoId)

        if (!todoDelete) {
            res.status(404).json({ Error: "No operation Performed" })
        }
        res.status(200).json({ todoDelete })
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }


})

//put method to update the title of the todo
router.put('/todo/title/:id', Auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTitle = req.body;
        const response = await Todo.findByIdAndUpdate(id, updatedTitle)
        if (!response) {
            res.status(404).json({ msg: "Id not found" })
        }
        res.status(200).json({ msg: response })
    } catch (error) {
        res.status(500).json({ error: "server Error" })
    }

})

//put method to update the subtodo of todo
router.put('/todo/subTodo/:id', Auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSubtodoData = req.body;
        const response = await SubTodo.findByIdAndUpdate(id, updatedSubtodoData);
        if (!response) {
            res.status(404).json({ msg: "Id not found" })
        }
        res.status(200).json({ msg: response })
    } catch (error) {
        res.status.apply(500).json({ error: "server Error" })
    }
})


//delete method to delete a subtodo of todo
router.delete('/todo/subTodo/:id', Auth, async (req, res) => {
    try {
        const id = req.params.id;
        const response = await SubTodo.findByIdAndDelete(id);
        if (!response) {
            res.status(404).json({ msg: "Id not found" })
        }
        res.status(200).json({ msg: response })
    } catch (error) {
        res.status.apply(500).json({ error: "server Error" })
    }
})

router.put('/todo/addSubTodo/:id', Auth, async (req, res) => {
    try {
        const id = req.params.id;
        const {subtodos} = await Todo.findById(id)


        const { content } = req.body;
        const newSubTodo = new SubTodo({
            content: content
        });
        const newSubTodoResponse = await newSubTodo.save()
        await subtodos.push(newSubTodoResponse._id);
        const updatedSubtodoDataResponse = await Todo.findByIdAndUpdate(id,{subtodos:subtodos});

        






        if (!updatedSubtodoDataResponse) {
            res.status(404).json({ msg: "Subtodo not updated" })
        }
        res.status(200).json({ msg: updatedSubtodoDataResponse })
    } catch (error) {
        res.status(500).json({ error: "server Error",error })
    }

})
//exporting the route
module.exports = router;