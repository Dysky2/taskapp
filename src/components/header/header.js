import './header.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';

const Header = ({ tasks, setTasks,taskDelete,setTaskDelete, stateAddTask, setStateAddTask,showDeleteBoard,
    setShowDeleteBoard, setEditedTask,showEditBoard, setShowEditBoard, columnsToUpdate,setColumnsToUpdate}) => {

    const [showEditedTask, setShowEditedTask] = useState(false);

    const createNewTask = () => {
        if(tasks.length > 0) {
            tasks.map((task) => {
                if(task.selected && task.columns.length > 0) {
                    setStateAddTask(!stateAddTask);
                }
                return null;
            })
            return null;
        }
    }

    const showOverlay = (event) => {
        setShowEditedTask(false);
        event.preventDefault();
        tasks.map(task => {
            if(task.selected) {
                setShowEditedTask(!showEditedTask);
            }
            return null;
        })
    }

    const changeBoard = (task) => {
        setEditedTask(task);
        setColumnsToUpdate(task.columns)
        setShowEditBoard(!showEditBoard);
        setShowEditedTask(!showEditedTask);
    }


    const deleteBoard = (task) => {
        setTaskDelete(task);
        setShowEditedTask(!showEditedTask);
        setShowDeleteBoard(!showDeleteBoard);
    }

    return (
        <nav>
        <div className='logo-container'>
            <div className='logo'>Dysky</div>
        </div>
        <div className='baner-container'>
            <div className='project-name-container'>
                <div className='project-name'>
                    {tasks.map((item) => {
                        if(item.selected) {
                            return item.title;
                        }
                        return null;
                    })}
                </div>
            </div>
            <div className='create-task-container'>
                <button className='create-task' onClick={createNewTask}>+ Add New Task</button>
                <div className='DropDown'>
                    <button className='DropDown__button-ellipsis' onClick={showOverlay}><BsThreeDotsVertical /></button>
                    {tasks.map(task => {
                        if(task.selected) {
                            return (
                                <div key={uuidv4()} className={`DropDown__wrapper ${showEditedTask ? "" : "none"}`}>
                                    <button type="button" className="DropDown__text" onClick={() => changeBoard(task)}>Edit Board</button>
                                    <button type="button" className="DropDown__text DropDown__text--warning" onClick={() => deleteBoard(task)}>Delete Board</button>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Header;