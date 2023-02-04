import './columnOverlay.css';
import {v4 as uuidv4} from 'uuid';
import { BsX } from "react-icons/bs";

const ColumnOverlay = ( {tasks, setTasks, columns, cards,setCards, setColumns, inputColumn,setInputColum,
    stateOfColumnsOverlay,setStateOfColumnsOverlay, updateTask, showColumnDelete, setShowColumnDelete
} ) => {

    const onFormSubmit = (event) => {
        event.preventDefault();

        // setTasks(
        //     tasks.map( (task) => {
        //         if(task.id === updateTask.id) {
        //             return {...task, columns: columns}
        //         }
        //         return task;
        //     })
        // )

        setTasks(
            tasks.map((task) => {
                if(task.id === updateTask.id) {
                    return {...task, columns: task.columns.map((column,indexCol) => {
                        if(updateTask.columns[indexCol] !== undefined) {
                            return( {...column, title: column.title, 
                                cards: task.columns[indexCol].cards.map(card => {
                                    if(card.activeStatus !== column.title) {
                                        return {...card, activeStatus: column.title,}
                                    }
                                    return card;
                                }
                            )})
                        } else {
                            return column;
                        }
                    })}
                }
                return task;
            })
        )

        setInputColum('');
        setStateOfColumnsOverlay(!stateOfColumnsOverlay);
    }

    const createColumn = () => {

        setTasks(
            tasks.map(task => {
                if(task.columns.length >= 1) {
                    setShowColumnDelete(true);
                }
                if(task.selected) {
                    task.columns.push({id: uuidv4(), title: "", cards: []})
                }
                return task;
            })
        )

        // setColumns([...columns, {id: uuidv4(), title: '', cards: []}]);
    }

    const onColumnChange = (column,event) => {

        // setInputColum( (prev) => ({
        //     ...prev,
        //     [name]: value
        // }))

        // setColumns(columns.map(column => {
        //     if(column.id === name) {
        //         return {...column, title: value}
        //     }
        //     return column;
        // }))

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
        // setColumns(columns.filter(item => item.id !== column.id));

        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    if(task.columns.length <= 2) {
                        setShowColumnDelete(false);
                    }
                    return {...task, columns: task.columns.filter(item => item.id !== column.id)}
                }
                return task;
            })
        )
    }

    const closeModal = () => {
        // setStateOfColumnsOverlay(!stateOfColumnsOverlay);
    }

    return (
        <div className="Modal">
            <button className="Modal--close"onClick={closeModal}><BsX /></button>
            <form className="AddNewBoard"  onSubmit={onFormSubmit} >
                <div className="AddNewBoard__topWrapper">
                    <h2>Add New Column</h2>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <p className="AddNewBoard__sub-title">Name</p>
                    <label className="AddNewBoard__label">
                        <input 
                            disabled
                            className='not_update'
                            type='text'
                            placeholder={`${updateTask.title}`}
                        />
                    </label>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <p className="AddNewBoard__sub-title">Columns</p>
                    <ul className="AddNewBoard__subtaskUl" id="List_ul">
                        {tasks.map(task => {
                            if(task.selected) {
                                return (task.columns.map(column => {
                                    return (
                                        <li key={column.id} className="AddNewBoard__subtaskLi">
                                        <label className="AddNewBoard__label">
                                            <input 
                                                type='text'
                                                required
                                                name = {column.id}
                                                onChangeCapture = {(event) => onColumnChange(column,event)}
                                                className = "AddNewBoard__subtask-input" 
                                                defaultValue={column.title === "" ? "": column.title}
                                            />
                                        </label>
                                        <div onClick={() => deleteColumn(column)} className={`AddNewBoard__subtask-delete ${showColumnDelete ? "": 'none'}`}>x</div>
                                    </li>
                                    )
                                }))
                            }
                            return null;
                        })}

                    </ul>
                    <button  onClick={createColumn}  type="button" className="Button Button--small Button--theme">+ Add New Column</button>
                </div>
                <div className="AddNewBoard__boxWrapper">
                    <button className="Button Button--small">Create New Column</button>
                </div>
            </form>
        </div>
    )
}

export default ColumnOverlay;