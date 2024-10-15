import React, { useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/todoFetchHook';
import userData from '../hooks/fetchhook';
import { Todo } from './Todo';
import { FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { addSubTodo, changeTodoTitle, createTodo } from '../helper/helper'
import toast, { Toaster } from 'react-hot-toast';
import img from './userImage/user.png';
import { Link, useNavigate } from 'react-router-dom';



export default function Showtodo() {
    document.title = "Login App - Todo"
    const [toggle, setToggle] = useState(false)
    const hideSideMenu = () => {
        setToggle(false);
    }
    const showSideMenu = () => {
        setToggle(true);
    }




















    // State to hold the array of input fields
    const [inputFields, setInputFields] = useState([]);

    // Function to add a new input field
    const addInputField = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1 }]);
    };
    const removeInputField = (index) => {
        const newFields = inputFields.filter((_, i) => i !== index);
        setInputFields(newFields);
    }

    //useRef hook to handle with the todo
    let subtodoWork1 = useRef('');
    const [todoTitle, setTodoTitle] = useState('');
    const handleTodoTitle = (event) => {
        setTodoTitle(event.target.value);
    }

    // const [formValues, setFormValues] = useState([]);

    const handleSubtodoInputChange = (index, event) => {
        const newFields = [...inputFields];
        newFields[index] = { ...newFields[index], value: event.target.value }
        setInputFields(newFields);



    }

    let [{ apiData }, fetchData] = useFetch();
    const [todoList, setTodoList] = useState(apiData || []);

    //update the state when apiData.todo changes
    useEffect(() => {
        if (apiData.todo !== undefined) {
            setTodoList(apiData.todo);

        }
    }, [apiData.todo]);

    //function for create todo
    const addTodo = async () => {
        if (!todoTitle || todoTitle.trim() === '') {
            toast.error('Todo Title can not be Empty!......');
            return;
        }
        const values = inputFields.map(field => field.value).filter(value => value && value.trim() !== ''); // Filter out empty fields;
        if (!subtodoWork1.current.value || subtodoWork1.current.value.trim() === '') {
            toast.error('Work for Todo should be filled !......')
            return;
        }
        values.push(subtodoWork1.current.value);
        let values_in_object = values.map(value => ({ content: value }))
        await createTodo({ title: todoTitle, subtodos: values_in_object })
        setToggle(false);

        subtodoWork1.current.value = '';
        setInputFields([]);
        setTodoTitle('');
        fetchData()
    }

    const handleChildUpdation = () => {
        fetchData()
    }


    const [addSubTodoToggle, setAddSubTodoToggle] = useState(false);
    const hideSubTodoForm = () => {
        setAddSubTodoToggle(false);
    }


    const [todoIdForAddSubTodo, setTodoIdForAddSubTodo] = useState('');

    const [subTodo, setSubTodo] = useState('');
    const handleSubtodo = (e) => {
        setSubTodo(e.target.value);
    };
    const handleSubTodoAddition = (todoId) => {
        setTodoIdForAddSubTodo(todoId);
        setAddSubTodoToggle(true);
    }
    const submitAddWork = async () => {
        console.log('i am in submitAddWork');
        console.log('sub todo is ', subTodo)
        if (!subTodo || subTodo.trim() === '') {
            toast.error(`Work for a todo can't be empty!.......`);
            return;
        }
        console.log('todoId for sub todo adding is ', todoIdForAddSubTodo);
        if (todoIdForAddSubTodo) {
            const res = await addSubTodo(todoIdForAddSubTodo, subTodo);
            console.log('res is ', res);
            setAddSubTodoToggle(false);
            setSubTodo('')
            fetchData()
        }
    }

    const [todoChangeTitle, setTodoChangeTitle] = useState('');
    const handleTodoChangeTitle = (e) => {
        setTodoChangeTitle(e.target.value);
    }
    const [todoTitleChangeFormToggle, setChangeTodoTitleToggle] = useState(false)
    const hideTodoTitleChangeForm = () => {
        setChangeTodoTitleToggle(false);
    }

    const hideSideMenuAndHideSubTodoForm = () => {
        hideSideMenu();
        hideSubTodoForm();
        hideTodoTitleChangeForm();
        hideProfileMenu()
    }
    const [todoIdForTitleChange, setTodoIdForTitleChange] = useState('');

    const handleTitleChange = (todoId) => {
        setTodoIdForTitleChange(todoId);
        setChangeTodoTitleToggle(true);

    }

    const submitChangeTodoTitle = async () => {
        if (!todoChangeTitle || todoChangeTitle.trim === '') {
            toast.error('Todo Title can not be Empty!......');
            return;
        }
        await changeTodoTitle(todoIdForTitleChange, todoChangeTitle);
        hideTodoTitleChangeForm();
        setTodoChangeTitle('');
        fetchData();
    }
    const [{ apiData: user }] = userData();

    const [profileToggle, setProfileToggle] = useState(false);

    const showProfileMenu = () => {
        setProfileToggle(true);
    }
    const hideProfileMenu = () => {
        setProfileToggle(false);
    }

    const navigate = useNavigate();
    //By clicking logout button remove the token from the localstorage
    function userLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    const hideSideMenuAndProfileMenu = () => {
        hideSideMenu();
        hideProfileMenu();
    }





    if (todoList.length !== 0) {
        return (
            <>
                <Toaster></Toaster>
                <div onClick={hideSideMenuAndHideSubTodoForm} className='fullbar' style={{
                    visibility: toggle || addSubTodoToggle || todoTitleChangeFormToggle || profileToggle ? 'visible' : 'hidden',
                    opacity: toggle || addSubTodoToggle || todoTitleChangeFormToggle || profileToggle ? '0.7' : '0',
                }}></div>

                <div className='container-fluid' style={{
                    height: toggle || addSubTodoToggle || todoTitleChangeFormToggle || profileToggle ? '100vh' : '',
                    overflow: toggle || addSubTodoToggle || todoTitleChangeFormToggle || profileToggle ? 'hidden' : '',
                }}>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }} className='sidebar' style={{
                        left: toggle ? '0px' : '-1000px',
                        visibility: toggle ? 'visible' : 'hidden',
                        opacity: toggle ? '1' : '0'
                    }}>
                        <div className='flex flex-row-reverse' >
                            <FaWindowClose onClick={hideSideMenu} className='fs-1 m-3 cursor-p'></FaWindowClose>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="Todotitle" className="form-label ms-2">Title</label>
                                <input type="text" className="form-control" id="Todotitle" value={todoTitle} onChange={handleTodoTitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subtodo" className="form-label ms-2">Work for above title</label>
                                <input type="text" className="form-control" id="subtodo" ref={subtodoWork1} />
                            </div>
                            {inputFields.map((field, index) => (
                                <div key={field.id}>
                                    <div className="mb-3">
                                        <label htmlFor="subtodo" className="form-label">Work for above title</label>
                                        <input type="text" onChange={(e) => { handleSubtodoInputChange(index, e) }} value={field.value} className="form-control" id="subtodo" />
                                        <p onClick={() => removeInputField(index)} className='btn btn-danger ms-2 mt-1'>Remove</p>
                                    </div>

                                </div>
                            ))}

                        </form>
                        <button onClick={addInputField} className="btn btn-primary ms-1 mb-2">Add More</button>
                        <div className='d-flex justify-content-center'>
                            <button onClick={addTodo} className='btn btn-success col-xl-6 col-md-12 col-sm-12'>Submit</button>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='addSubTodo col-lg-6 col-sm-12  ' style={{
                            top: '40%',
                            visibility: addSubTodoToggle ? 'visible' : 'hidden',
                        }}>
                            <div className='d-flex justify-content-end' >

                                <FaWindowClose onClick={hideSubTodoForm} className='fs-1 m-3 cursor-p'></FaWindowClose>

                            </div>
                            <div>
                                <div className="d-flex justify-content-center">
                                    <label htmlFor="subtodo" className="form-label justify-content-center fs-5 fw-bold">Add work</label>
                                </div>
                                <input type="text" className="form-control text-center" id="subtodo" placeholder='work to do' value={subTodo} onChange={handleSubtodo} />
                            </div>
                            <div className='d-flex justify-content-center m-5'>
                                <button onClick={submitAddWork} className='btn btn-primary'>Submit</button>
                            </div>

                        </div>



                    </div>






                    <div className='row justify-content-center'>
                        <div className='addSubTodo col-lg-6 col-sm-12 ' style={{
                            top: '40%',
                            visibility: todoTitleChangeFormToggle ? 'visible' : 'hidden'

                        }}>
                            <div className='d-flex justify-content-end' >

                                <FaWindowClose onClick={hideTodoTitleChangeForm} className='fs-1 m-3 cursor-p'></FaWindowClose>

                            </div>
                            <div>
                                <div className="d-flex justify-content-center">
                                    <label htmlFor="subtodo" className="form-label justify-content-center fs-5 fw-bold">Change Todo Title</label>
                                </div>
                                <input type="text" className="form-control text-center" id="subtodo" placeholder='Todo Title' value={todoChangeTitle} onChange={handleTodoChangeTitle} />
                            </div>
                            <div className='d-flex justify-content-center m-5'>
                                <button onClick={submitChangeTodoTitle} className='btn btn-primary'>Submit</button>
                            </div>

                        </div>



                    </div>

                    <div className='col-lg-3 col-sm-6 shortProfile' style={{
                        right: '0px',
                        top: '6%',
                        visibility: profileToggle ? 'visible' : 'hidden'
                    }}>

                        <div className='d-flex justify-content-center my-2'>
                            <img className='imageInShorProfile' src={user.profile ? user.profile : img} alt='profile' />
                        </div>
                        <h4 className='d-flex justify-content-center text-white'>{user.firstName ? user.firstName.toUpperCase() : ''} {user.lastName ? user.lastName.toUpperCase() : user.username ? user.username : ''}</h4>
                        <div className='bg-white d-flex justify-content-between' style={{ position: 'relative', top: '16%' }}>
                            <Link className='btn btn-success rounded-0 m-2' to='/profile'>Profile</Link>
                            <button onClick={userLogout} className='btn btn-danger rounded-0 m-2'>Log Out</button>

                        </div>

                    </div>








                    <div className='row'>
                        <div className='' style={{
                            backgroundColor: '#3c8dbc'
                        }}>
                            <div className=' d-flex flex-row-reverse'>
                                <div className='d-flex align-items-center'>
                                    <div className='m-2' >
                                        <img className='imgInTodo' src={user.profile ? user.profile : img} alt='profile' />
                                    </div>
                                    <span className='fs-6 text-white'>{user.username ? user.username : ''}</span>
                                    <GiHamburgerMenu onClick={showProfileMenu} className='fs-4 text-white ms-3 cursor-p' />
                                </div>
                            </div>

                        </div>
                        {todoList.map((todoData, index) => (
                            <div key={todoData._id} className=' col-lg-3 col-md-6 col-sm-12'>
                                <Todo todoData={todoData} updateData={handleChildUpdation} handleSubTodoAdditionFromParent={handleSubTodoAddition} handleTitleChangeFromParent={handleTitleChange} />
                            </div>
                        ))
                        }

                    </div>
                    <div className='text-center'>
                        <button onClick={showSideMenu} className='btn btn-primary '>Add Todo</button>
                    </div>
                </div>


            </>
        )
    }
    else {
        return (
            <>
                <Toaster></Toaster>
                <div onClick={hideSideMenuAndProfileMenu} className='fullbar' style={{
                    visibility: toggle || profileToggle ? 'visible' : 'hidden',
                    opacity: toggle || profileToggle ? '0.5' : '0'
                }}></div>

                <div className='container-fluid' style={{
                    height: toggle ? '100vh' : '',
                    overflow: toggle ? 'hidden' : ''
                }} >





                    <div className='col-lg-3 col-sm-6 shortProfile' style={{
                        right: '0px',
                        top: '6%',
                        visibility: profileToggle ? 'visible' : 'hidden'
                    }}>

                        <div className='d-flex justify-content-center my-2'>
                            <img className='imageInShorProfile' src={user.profile ? user.profile : img} alt='profile' />
                        </div>
                        <h4 className='d-flex justify-content-center text-white'>{user.firstName ? user.firstName.toUpperCase() : ''} {user.lastName ? user.lastName.toUpperCase() : ''}</h4>
                        <div className='bg-white d-flex justify-content-between' style={{ position: 'relative', top: '15%' }}>
                            <Link className='btn btn-success rounded-0 m-2' to='/profile'>Profile</Link>
                            <button onClick={userLogout} className='btn btn-danger rounded-0 m-2'>Log Out</button>

                        </div>

                    </div>



                    <div onClick={(e) => {
                        e.stopPropagation()
                    }} className='sidebar' style={{
                        left: toggle ? '0px' : '-1000px'

                    }} >
                        <div className='flex flex-row-reverse' >
                            <FaWindowClose onClick={hideSideMenu} className='fs-1 m-3 cursor-p'></FaWindowClose>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="Todotitle" className="form-label ms-2">Title</label>
                                <input type="text" className="form-control" id="Todotitle" value={todoTitle} onChange={handleTodoTitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subtodo" className="form-label ms-2">Work for above title</label>
                                <input type="text" className="form-control" id="subtodo" ref={subtodoWork1} />
                            </div>
                            {inputFields.map((field, index) => (
                                <div key={field.id}>
                                    <div className="mb-3">
                                        <label htmlFor="subtodo" className="form-label">Work for above title</label>
                                        <input type="text" onChange={(e) => { handleSubtodoInputChange(index, e) }} value={field.value} className="form-control" id="subtodo" />
                                        <p onClick={() => removeInputField(index)} className='btn btn-danger ms-2 mt-1'>Remove</p>
                                    </div>

                                </div>
                            ))}

                        </form>
                        <button onClick={addInputField} className="btn btn-primary ms-1 mb-2">Add More</button>
                        <div className='d-flex justify-content-center'>
                            <button onClick={() => { addTodo() }} className='btn btn-success col-xl-6 col-md-12 col-sm-12'>Submit</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div style={{
                            backgroundColor: '#3c8dbc',

                        }}>
                            <div className=' d-flex flex-row-reverse'>
                                <div className='d-flex align-items-center'>
                                    <div className='m-2' >
                                        <img className='imgInTodo' src={user.profile ? user.profile : img} alt='profile' />
                                    </div>
                                    <span className='fs-6 text-white'>{user.username ? user.username : ''}</span>
                                    <GiHamburgerMenu onClick={showProfileMenu} className='fs-4 text-white mx-3 cursor-p' />
                                </div>
                            </div>

                        </div>
                    </div>
                    <h4 className='text-center'>
                        No Todo To Show
                    </h4>
                    <div className='text-center'>
                        <button onClick={showSideMenu} className='btn btn-primary '>Create Todo List</button>
                    </div>



                </div>

            </>
        )
    }
} 