import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { deleteSubTodo,isCompletedSubTodo } from '../helper/helper';

export function Subtodo({subtodosData,handleSubToUpdation}) {
//subtodo delete
const subTodoDelete = async(subTodoId) => {
    await deleteSubTodo(subTodoId);
    handleSubToUpdation()
}

const isCompletedSubTodoOrNot = async(subTodoId,SubTodoCompletion) => { 
    await isCompletedSubTodo(subTodoId,SubTodoCompletion);
    handleSubToUpdation();
}

    return (
        <>
            <div className='container d-flex justify-content-between p-3 mt-2' style={{backgroundColor: 'rgb(107 197 214)'}}>
                <h6 className='subtodoWidth'>{subtodosData.content}</h6>
                <div className='d-flex'>
                    <div className=' bg-danger d-flex justify-content-center align-items-center rounded  mx-2 cursor-p'>
                        <MdDelete onClick={() => {subTodoDelete(subtodosData._id)}} className='fs-4 mx-2'></MdDelete>
                    </div>
                    <div className='d-flex justify-content-center align-items-center rounded cursor-p p-1' style={{

                        backgroundColor: subtodosData.isCompleted ? 'rgb(33 229 138)' : '#dadada',
                        
                    }}>
                        <FaCheck onClick={() => {isCompletedSubTodoOrNot(subtodosData._id,subtodosData.isCompleted)}} className='fs-4'></FaCheck>
                    </div>
                </div>

            </div>
        </>
    )

}