import './cardOverlay.css';
import { BsX,BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';

const CardOverlay = ({ updateCard, setUpdateCard,setShowCardOv,showCardOv,setTasks, tasks,showDeleteCard,setShowDeleteCard,setShowEditCard,showEditCard }) => {

    const [isWrappShowed, setIsWrappShowed] = useState(false);
    const [isArrowDown, setIsArrowDown] = useState(true);
    const [isShowCardEdit, setIsShowCardEdit] = useState(false);

    const closeModal = () => {
        setShowCardOv(!showCardOv);
        setIsShowCardEdit(false);
    }

    const subTaskSelected = (subTask) => {
        
        setTasks(tasks.map(task => {
            if(task.selected) {
                return {...task, 
                    columns: task.columns.map(column => {
                        return {...column, 
                            cards: column.cards.map(card => {
                                return {...card, 
                                    subTasks: card.subTasks.map(item => {
                                        if(subTask.id === item.id) {
                                            return {...item, selected: !item.selected}
                                        }
                                        return item;
                                    })
    
                                }
                            })               
                        }
                    })
                }
            }
            return task;
        }))

        setUpdateCard(
            {...updateCard, 
                subTasks:  updateCard.subTasks.map(item => {
                    if(item.id === subTask.id) {
                        return {...item, selected: !item.selected}
                    }
                    return item;
                })
            }
        )   
    }

    const changeStatus = (column) => {

        setUpdateCard(
            {...updateCard, activeStatus: column.title}
        )

        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    return {...task, columns: task.columns.map(itemCol => {
                        if(column.title !== updateCard.activeStatus) {
                            if(itemCol.title === column.title) {
                                return {...itemCol, cards: [...itemCol.cards, {...updateCard, activeStatus: column.title}] }
                            } else {
                                return {...itemCol, cards: itemCol.cards.filter(item => item.id !== updateCard.id)
                                }
                            }
                        } else {
                            return itemCol;
                        }
                    })}
                }
                return task;
            })
        )

        // setTasks(
        //     tasks.map((task) => {
        //         if(task.id === updateTask.id) {
        //             return {...task, columns: task.columns.map((column,indexCol) => {
        //                 if(updateTask.columns[indexCol] !== undefined) {
        //                     return( {...column, title: column.title, 
        //                         cards: task.columns[indexCol].cards.map(card => {
        //                             if(card.activeStatus !== column.title) {
        //                                 return {...card, activeStatus: column.title,}
        //                             }
        //                             return card;
        //                         }
        //                     )})
        //                 } else {
        //                     return column;
        //                 }
        //             })}
        //         }
        //         return task;
        //     })
        // )
        setIsWrappShowed(false);
        setIsArrowDown(true);
    }

    const triggerDropDown = (event) => {
        event.preventDefault();

        setIsArrowDown(!isArrowDown);
        setIsWrappShowed(!isWrappShowed)
    }

    const showCardEdit = () => {
        setIsShowCardEdit(!isShowCardEdit);
    }

    const editCard = () => {
        setShowEditCard(!showEditCard);
    }

    const deleteCard = () => {
        setShowDeleteCard(!showDeleteCard);
    }

    return (
        <div className="Modal">
            <button className="Modal--close" onClick={closeModal}><BsX /></button>
            <div className="ViewTask">
                <div className="ViewTask__topWrapper">
                    <h2>{updateCard.title}</h2>
                    <div className="DropDown" onClick={showCardEdit}>
                        <BsThreeDotsVertical />
                        <div className={`DropDown__wrapper DropDown__wrapper--right ${isShowCardEdit ? "" : 'none'}`}>
                            <button type="button" className="DropDown__text" onClick={editCard}>Edit task</button>
                            <button type="button" className="DropDown__text DropDown__text--warning" onClick={deleteCard}>Delete task</button>
                        </div>
                    </div>
                </div>
                <p className="ViewTask__descWrapper">{updateCard.description === "" ? "No description" : updateCard.description}</p>
                <div className="ViewTask__subtaskWrapper">
                    <p className="ViewTask__sub-title">
                        {`Subtasks (${updateCard ===  "" ? 0 : 0 }
                        of 
                        ${updateCard ===  "" ? "" : updateCard.subTasks.length})`}
                    </p>
                    {
                        updateCard === '' ? "" :  updateCard.subTasks.map(subTask => 
                            <label key={uuidv4()} className="CheckBox ">
                                <input 
                                    type="checkbox" 
                                    className='checkbox'
                                    onChange={() => subTaskSelected(subTask) }
                                    checked= {subTask.selected}
                                />
                                {subTask.title}
                            </label>
                        )
                    }
                </div>

                <div className="ViewTask__statusWrapper">
                    <p className="ViewTask__sub-title">Current Status</p>
                    <div className="ViewTask__status-dropdown">
                        <div className="SelectDropDown">
                            <button type="button" className="SelectDropDown__trigger" onClick={triggerDropDown}>
                                <span className="SelectDropDown__trigger-text">{updateCard.activeStatus}</span>
                                <span className="SelectDropDown__trigger-icon"> {isArrowDown ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}</span>
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
                </div>
            </div>
        </div>
    )
}

export default CardOverlay;