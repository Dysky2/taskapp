import './creatorTasks.css';
import { BsX} from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const CreatorTasks = ({tasks, setTasks, setStateAddTask, stateAddTask, cards, setCards}) => {

    const [inputTitle, setInputTitle] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    const [subTasks, setSubTasks] = useState([]);
    const [isWrappShowed, setIsWrappShowed] = useState(false);

    const [iconArrow, setIcomArrow] = useState(<AiOutlineArrowDown/>)
    const [checkIconArrow, setCheckIconArrow] = useState(false)

    const [statusValue, setStatusValue] = useState('');

    const closeModal = () => {
        setStateAddTask(!stateAddTask);
    }

    const onChangeTitleInput = (event) => {
        setInputTitle(event.target.value);
    }

    const onChangeTextarea = (event) => {
        setTextareaValue(event.target.value)
    }

    const createSubTask = (event) => {
        event.preventDefault();
        if(subTasks.length > 7) {
            event.target.classList.add('none');
        } else {
            setSubTasks([...subTasks, {id: uuidv4(), title: "", selected: false}]);
        }
    }    

    const deleteSubtask = (subTask) => {
        setSubTasks(subTasks.filter(item => item.id !== subTask.id));

        if(subTasks.length <= 8) {
            document.querySelector('.createSub').classList.remove('none');
        }
    }

    const showWrapper = () => {
        setIsWrappShowed(!isWrappShowed);

        if(!checkIconArrow) {
            setIcomArrow(<AiOutlineArrowUp/>)
            setCheckIconArrow(true);
        } else {
            setIcomArrow(<AiOutlineArrowDown/>)
            setCheckIconArrow(false);
        }
    }

    const changeStatus = (column) => {
        setStatusValue(column.title);
        setIsWrappShowed(!isWrappShowed);

        if(!checkIconArrow) {
            setIcomArrow(<AiOutlineArrowUp/>)
            setCheckIconArrow(true);
        } else {
            setIcomArrow(<AiOutlineArrowDown/>)
            setCheckIconArrow(false);
        }
    }

    const changeSubtasksTitle = (subTask, event) => {
        setSubTasks(subTasks.map(item => {
            if(subTask.id === item.id) {
                return {...item, title: event.target.value}
            }
            return item;
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        // setCards([...cards, 
        //     {id: uuidv4(), 
        //     title: inputTitle, 
        //     description: textareaValue, 
        //     subTasks: subTasks, 
        //     activeStatus: statusValue,
        //     status: tasks.map(task => {
        //         if(task.selected) {
        //             if(task.columns.length > 0) {
        //                 return task.columns.map(column => {
        //                     return column.title;
        //                 })
        //             }
        //         }
        //         return null;
        //     })
        //     }
        // ])

        setTasks(
            tasks.map(task => {
                return {...task, 
                    columns: (task.columns.map( (column) => {
                    if(column.title === statusValue) {

                        return {...column, 
                            cards:[...column.cards,
                            {id: uuidv4(), 
                                title: inputTitle, 
                                description: textareaValue, 
                                subTasks: subTasks, 
                                activeStatus: statusValue,
                                status: tasks.map(task => {
                                    if(task.selected) {
                                        if(task.columns.length > 0) {
                                            return task.columns.map(column => {
                                                return column.title;
                                            })
                                        }
                                    }
                                    return null;
                                })
                            }
                            ]
                        }

                    }
                    return column;
                }))} 
            })
        );

        setInputTitle('');
        setTextareaValue('');
        setSubTasks([]);
        document.querySelector('.createSub').classList.remove('none');
        setStateAddTask(!stateAddTask);
    }

    return (
        <div className='Modal'>
            <button className="Modal--close" onClick={closeModal}><BsX /></button>
            <form className='AddNewTask' onSubmit={onFormSubmit}>
                <div className='AddNewTask__topWrapper'>
                    <h2>Add New Task</h2>
                </div>
                <div className='AddNewTask__boxWrapper'>
                    <p className="AddNewTask__sub-title">Title</p>
                    <label className="AddNewTask__label undefined">
                        <input 
                            required
                            value={inputTitle}
                            type="text" 
                            name="title"
                            onChange={onChangeTitleInput}
                        />
                    </label>
                </div>

                <div className="AddNewTask__boxWrapper">
                    <p className="AddNewTask__sub-title">Description</p>
                    <textarea 
                        className="AddNewTask__description" 
                        rows="4" 
                        name="description"
                        onChange={onChangeTextarea}
                        value={textareaValue}
                    />
                </div>

                <div className="AddNewTask__boxWrapper">
                    <p className="AddNewTask__sub-title">Subtasks</p>

                    <ul className="AddNewTask__subtaskUl">
                        {subTasks.map( subTask => 
                            <li key={subTask.id} className="AddNewTask__subtaskLi">
                                <label className="AddNewTask__label">
                                    <input 
                                        className="AddNewTask__subtask-input" 
                                        type="text"
                                        name={subTask.id}
                                        onChange={(event) => changeSubtasksTitle(subTask, event)}
                                    />
                                </label>
                                <button className='AddNewTask__subtask-icon' onClick={() => deleteSubtask(subTask)}><BsX /></button>
                            </li>
                        )}
                    </ul>

                    <button className="Button  Button--small Button--theme createSub" onClick={createSubTask}>+ Add New Subtask</button>
                </div>

                <div className="AddNewTask__boxWrapper AddNewTask__status">
                    <p className="AddNewTask__sub-title">Status</p>
                    <div className="SelectDropDown">
                        <button type="button" className="SelectDropDown__trigger" onClick={showWrapper}>
                            <span className="SelectDropDown__trigger-text">
                                {statusValue === '' ? tasks.map(task => {
                                    if(task.selected) {
                                        if(task.columns.length > 0) {
                                            setStatusValue(task.columns[0].title);
                                            return task.columns[0].title;
                                        }
                                    }
                                    return null;
                                }) : statusValue}
                            </span>
                            <span className='SelectDropDown__trigger-icon'>{iconArrow}</span>
                        </button>

                        <div className={`SelectDropDown__wrapper ${isWrappShowed ? '' : 'none'}`}>
                            {tasks.map( (task) => {
                                if(task.selected) {
                                    return (task.columns.map(column =>  {
                                        return (
                                            <button key={column.id} type="button" className="SelectDropDown__btn" onClick={() => changeStatus(column)} title={column.title}>
                                                <span className="SelectDropDown__btn-text">{column.title}</span>
                                            </button>
                                        )
                                    }))
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
                
                <div className="AddNewTask__boxWrapper">
                    <button type="submit" className="Button  Button--small">Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreatorTasks;