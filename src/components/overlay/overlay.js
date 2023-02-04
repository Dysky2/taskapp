import './overlay.css';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { BsX } from "react-icons/bs";

const Overlay = ({ inputTask, setInputTask, tasks, setTasks, stateOfOverlay, setStateOfOverlay, inputColumn,setInputColum,columns, setColumns }) => {

    const [showColumnDelete, setShowColumnDelete] = useState(false);

    const onFormSubmit = (event) => {
        event.preventDefault();

        // setTasks([...tasks, {id: uuidv4(), title: inputTask, selected: false,
        //     columns: columns.map(function(item, index) {
        //         if(item.id === (Object.keys(inputColumn))[index]) {
        //             return {...item, title: (Object.values(inputColumn))[index]}
        //         } 
        //         return item;
        //     })}]);

        setTasks([...tasks, {id: uuidv4(), title: inputTask, selected: false, columns: columns}]);

        setInputTask("");
        setInputColum('');
        setStateOfOverlay(!stateOfOverlay);
    }

    const onInputChange = (event) => {
        setInputTask(event.target.value);
    };

    const createColumn = () => {
        setColumns([...columns, {id: uuidv4(), title: '', cards: []}]);

        if(columns.length >= 1) {
            setShowColumnDelete(true);
        }
    }

    const onColumnChange = (event) => {
        const {name, value} = event.target;

        // setInputColum( (prev) => ({
        //     ...prev,
        //     [name]: value
        // }))

        setColumns(columns.map(column => {
            if(column.id === name) {
                return {...column, title: value}
            }
            return column;
        }))
    }

    const deleteColumn = (column) => {
        setColumns(columns.filter(item => item.id !== column.id));

        if(columns.length <= 2) {
            setShowColumnDelete(false);
        }
    }

    const closeModal = () => {
        setStateOfOverlay(!stateOfOverlay);
        setInputTask("");
    }

    return (
        <div className="Modal" id='modal'>
            <button className="Modal--close" onClick={closeModal}><BsX /></button>
            <form className="AddNewBoard" onSubmit={onFormSubmit} >
                <div className="AddNewBoard__topWrapper">
                    <h2>Add New Board</h2>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <p className="AddNewBoard__sub-title">Name</p>
                    <label className="AddNewBoard__label">
                        <input 
                            type='text' 
                            placeholder='Enter Task Name...'
                            value={inputTask}
                            required
                            onChange={onInputChange}
                        />
                    </label>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <p className="AddNewBoard__sub-title">Columns</p>
                    <ul className="AddNewBoard__subtaskUl" id="List_ul">
                        {columns.map(column => 
                            <li key={column.id} className="AddNewBoard__subtaskLi">
                                <label className="AddNewBoard__label">
                                    <input 
                                        type='text'
                                        required
                                        name={column.id}
                                        onChangeCapture={onColumnChange}
                                        className="AddNewBoard__subtask-input" 
                                    />
                                </label>
                                <div onClick={() => deleteColumn(column)} className={`AddNewBoard__subtask-delete ${showColumnDelete ? "": 'none'}`}>x</div>
                            </li>
                        )}
                    </ul>
                    <button onClick={createColumn} type="button" className="Button Button--small Button--theme">+ Add New Column</button>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <button className="Button Button--small">Create New Board</button>
                </div>
            </form>
        </div>
    )
}

export default Overlay