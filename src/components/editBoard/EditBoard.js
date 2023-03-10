import './Edit.Board.css';
import { BsX } from "react-icons/bs";
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const EditBoard = ({editedTask, setEditedTask, showEditBoard, setShowEditBoard, tasks, setTasks, columnsToUpdate,setColumnsToUpdate}) => {

    const [input, setInput] = useState('');
    const [com, setCom] = useState('');
    const [defaultValue, setDefaultValue] = useState('')

    const closeModal = () => {
        tasks.map(task => {
            if(task.selected && task.columns.length >= 1) {
                if( ([...new Set(task.columns.map(column => {return column.title}))]).length !== (task.columns.map(column => {return column.title})).length )  {
                    setCom("Columns names are the same");
                } else  {
                    setTasks(tasks.map(task => {
                        if(task.selected) {
                            return {...task, title: input === "" ? editedTask.title : input}
                        }

                        return task;
                    }))
            
                    setShowEditBoard(!showEditBoard);
                }
            } else {
                return null;
            }
        })
        setInput('');
    }

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const createNewColumn = () => {    
        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    task.columns.push({id: uuidv4(), title: "", cards: []})
                }
                return task;
            })
        )
    }

    const onColumnChange = (column,event) => {
        setCom('');
        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    return {...task, columns: 
                        task.columns.map(itemCol => {
                            if(itemCol.id === column.id) {
                                return {...itemCol, title: event.target.value}
                            }
                            return itemCol;
                        })
                    }
                }
                return task;
            })
        )
    }

    const deleteColumn = (column) => {
        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    return {...task, columns: task.columns.filter(item => item.id !== column.id)}
                }
                return task;
            })
        )
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        tasks.map(task => {
            if(task.selected && task.columns.length >= 1) {
                if( ([...new Set(task.columns.map(column => {return column.title}))]).length !== (task.columns.map(column => {return column.title})).length )  {
                    setCom("Columns names are the same");
                } else  {
                    setTasks(tasks.map(task => {
                        if(task.selected) {
                            return {...task, title: input === "" ? editedTask.title : input}
                        }
                        
                        return task;
                    }))
                    setInput('')
                    setShowEditBoard(!showEditBoard);
                }
            } else {
                return null;
            }
        })
    }

    return (
        <div className="Modal">
            <button className="Modal--close" onClick={closeModal}><BsX /></button>
            <form className="AddNewBoard" onSubmit={onFormSubmit}>
                <div className="AddNewBoard__topWrapper">
                    <h2>Edit Board</h2>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <p className="AddNewBoard__sub-title">Name</p>
                    <label className="AddNewBoard__label">
                        {tasks.map(task => {
                            if(task.selected) {
                                return(
                                    <input 
                                        key={task.id}
                                        type='text' 
                                        required
                                        onChange={onInputChange}
                                        defaultValue = {task.title}
                                    />
                                )
                            }
                        })}
                    </label>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <p className="AddNewBoard__sub-title">Columns</p>
                    <p className='comunication'>{com}</p>   
                    <ul className="AddNewBoard__subtaskUl" id="List_ul">

                        {tasks.map(task => {
                            if(task.selected) {
                                return task.columns.map(column => 
                                    <li key={column.id} className="AddNewBoard__subtaskLi">
                                        <label className="AddNewBoard__label">
                                            <input 
                                                type='text'
                                                required
                                                name={column.id}
                                                onChangeCapture={(event) => onColumnChange(column, event)}
                                                defaultValue={column.title}
                                                className="AddNewBoard__subtask-input" 
                                            />
                                        </label>
                                        <div 
                                        onClick={() => deleteColumn(column)} 
                                        className={`AddNewBoard__subtask-delete`}>x</div>
                                    </li>
                                )
                            }
                            return null;
                        })}
                    </ul>
                    <button type="button" onClick={createNewColumn} className="Button Button--small Button--theme">+ Add New Column</button>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <button className="Button Button--small">Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditBoard;