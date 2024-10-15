import React from 'react';
import { Subtodo } from './Subtodo';
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import {deleteTodo, formatDateAndTime} from "../helper/helper"
import { isCompletedTodo } from '../helper/helper';






export function Todo({ todoData , updateData , handleSubTodoAdditionFromParent , handleTitleChangeFromParent}) {
    const isComplete = todoData.complete;
    const deleteTheTodo = async(todoId)=> {
    await deleteTodo(todoId);
        updateData()
    }
    // delte subTodo and render at the time of deletion
    const handleSubToUpdation = () => {
        updateData()
    }
    const isCompletedTodoOrNot = async(todoId,todoCompletion) => {
        await isCompletedTodo(todoId,todoCompletion);
        updateData()
    }
    

    const addWork =  (todoId) => {
        handleSubTodoAdditionFromParent(todoId);
    }

    return (
        <>


            <div className='todoCardDimension shadow-lg my-3 mx-3 pb-3 '>
                <div className='bg-white container d-flex justify-content-between pt-3'>
                    <div className=''>
                        <h4 className=''>{todoData.title} </h4>
                       
                    </div>
                    <div className='d-flex'>
                        
                       { !isComplete && <div onClick={() => {isCompletedTodoOrNot(todoData._id,todoData.complete)}} className='shadow-lg d-flex justify-content-center align-items-center rounded rounded-3 cursor-p' style={{backgroundColor: 'rgb(106 196 213)'}}>
                            <FaCheck className='fs-4 mx-2'></FaCheck>
                        </div>}
                        { isComplete && <div onClick={() => {isCompletedTodoOrNot(todoData._id,todoData.complete)}} className='shadow-lg  d-flex justify-content-center align-items-center rounded rounded-3 cursor-p' style={{backgroundColor: 'rgb(33 229 138)'}}>
                            <FaCheck className='fs-4 mx-2'></FaCheck>
                        </div>}
                        <div onClick={() => {deleteTheTodo(todoData._id)}} className='shadow-lg bg-danger d-flex justify-content-center align-items-center rounded rounded-3 mx-2 cursor-p'>
                            <MdDelete className='fs-4 mx-2'></MdDelete>
                        </div>
                        <div onClick={() => {handleTitleChangeFromParent(todoData._id)}} className='shadow-lg bg-info d-flex justify-content-center align-items-center rounded rounded-3 cursor-p'>
                            <MdDriveFileRenameOutline className='fs-2'></MdDriveFileRenameOutline>
                        </div>
                    </div>
                    
                    



                </div>
                <hr />
                {
                    todoData.subtodos.map((subtodosData, index) => (
                        <Subtodo key={subtodosData._id} subtodosData={subtodosData} handleSubToUpdation={handleSubToUpdation}></Subtodo>
                    ))
                }
                <div className='d-flex justify-content-center my-2'>
                        <button onClick={() => {addWork(todoData._id)}} className='btn btn-primary'>Add work</button>
                    </div>
                    <span className='d-flex justify-content-center text-secondary' style={{
                            fontSize: '15px',
                            height: '5px',
                            
                        }}>Created On {formatDateAndTime(todoData.createdAt)}</span>

            </div>



        </>
    )

}