import { BsX } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const EditCard = ({tasks, setTasks, showEditCard, setShowEditCard,updateCard,setUpdateCard }) => {

    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [isWrappShowed, setIsWrappShowed] = useState(false);
    const [isArrowDown, setIsArrowDown] = useState(true);
    

    const closeModal = () => {
        setShowEditCard(!showEditCard);
    }
    const onChangeInput = (event) => {
        setInputValue(event.target.value);
    }
    const onChangeTextarea = (event) => {
        setTextareaValue(event.target.value)
    }

    const createSubTask = (event) => {
        event.preventDefault();
        setUpdateCard({...updateCard, subTasks: [...updateCard.subTasks, {id: uuidv4(), selected: false, title: ''}]});
    }

    const changeSubtasksTitle = (subTask, event) => {
        setUpdateCard(
            {...updateCard, subTasks:
                updateCard.subTasks.map(item => {
                    if(item.id === subTask.id) {
                        return {...subTask, title: event.target.value}
                    }
                return item;
                })
            }
        )
    }

    const deleteSubtask = (subTask) => {
        setUpdateCard({...updateCard, subTasks: updateCard.subTasks.filter(item => item.id !== subTask.id)})
    }

    const showWrapper = () => {
        setIsWrappShowed(!isWrappShowed);
        setIsArrowDown(!isArrowDown);
    }

    const changeStatus = (column) => {
        setUpdateCard(
            {...updateCard, activeStatus: column.title}
        )

        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    return {...task, columns: task.columns.map(itemCol => {
                        if(itemCol.title === column.title) {
                            return {...itemCol, cards: [...itemCol.cards, {...updateCard, activeStatus: column.title}] }
                        } else {
                            return {...itemCol, cards: itemCol.cards.filter(item => item.id !== updateCard.id)
                            }
                        }
                    })}
                }
                return task;
            })
        )
        setIsWrappShowed(!isWrappShowed);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        setUpdateCard(
            {...updateCard, title: inputValue !== '' ? inputValue : updateCard.title , description: textareaValue !== '' ? textareaValue : updateCard.title }
        )

        setTasks(tasks.map(task => {
            if(task.selected) {
                return {...task, 
                    columns: task.columns.map(column => {
                        return {...column, 
                            cards: column.cards.map(card => {
                                if(card.id === updateCard.id) {
                                    return {...card, title: inputValue !== '' ? inputValue : updateCard.title , description: textareaValue !== '' ? textareaValue : updateCard.title }
                                }
                                return card;
                            })               
                        }
                    })
                }
            }
            return task;
        }))

        setShowEditCard(!showEditCard);
    }

    return (
        <div className='Modal'>
            <button className="Modal--close" onClick={closeModal}><BsX /></button>
            <form className='AddNewTask' onSubmit={onFormSubmit}>
                <div className='AddNewTask__topWrapper'>
                    <h2>Change Task</h2>
                </div>
                <div className='AddNewTask__boxWrapper'>
                    <p className="AddNewTask__sub-title">Title</p>
                    <label className="AddNewTask__label undefined">
                        <input 
                            required
                            defaultValue={updateCard.title}
                            type="text" 
                            name="title"
                            onChange={onChangeInput}
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
                        defaultValue={updateCard.description}
                    />
                </div>

                <div className="AddNewTask__boxWrapper">
                    <p className="AddNewTask__sub-title">Subtasks</p>

                    <ul className="AddNewTask__subtaskUl">
                        {updateCard === "" ? '' : updateCard.subTasks.map( subTask => 
                            <li key={subTask.id} className="AddNewTask__subtaskLi">
                                <label className="AddNewTask__label">
                                    <input 
                                        className="AddNewTask__subtask-input" 
                                        type="text"
                                        name={subTask.id}
                                        onChange={(event) => changeSubtasksTitle(subTask, event)}
                                        defaultValue={subTask.title}
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
                            <span className="SelectDropDown__trigger-text">{updateCard.activeStatus}</span>
                            <span className='SelectDropDown__trigger-icon'>{isArrowDown ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}</span>
                        </button>

                        <div className={`SelectDropDown__wrapper ${isWrappShowed ? '' : 'none'}`}>
                            {tasks.map( (task) => {
                                    if(task.selected) {
                                        return (task.columns.map(column =>  {
                                            return (
                                                <button key={column.id} type="button" className="SelectDropDown__btn" onClick={() => changeStatus(column)}  title={column.title}>
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
                    <button type="submit" className="Button  Button--small">Change Task</button>
                </div>
            </form>
        </div>
    )
}

export default EditCard;