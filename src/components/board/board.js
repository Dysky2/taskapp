import './boards.css';
import {v4 as uuidv4} from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Board = ({tasks,setTasks,stateOfColumnsOverlay, setStateOfColumnsOverlay, setUpdateTask, setShowColumnDelete, showCardOv,setShowCardOv ,setUpdateCard}) => {

    const changeColumns = (task) => {
        setStateOfColumnsOverlay(!stateOfColumnsOverlay);
        
        setUpdateTask(task);

        if(task.columns.length >= 1) {
            setShowColumnDelete(true);
        }
    }

    const changeValueCard = (card) => {
        setShowCardOv(!showCardOv);
        setUpdateCard(card);
    }
    
    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (!result.source.droppableId) return;
        if (!result.draggableId) return;
        if(result.reason === "DROP") {

        const myMap = new Map();
        
        tasks.map(task => {
            if(task.selected) {
                task.columns.map(column => 
                    column.cards.map(card => {
                        if(card.id === result.draggableId) {
                            myMap.set(card)
                        }
                        return null;
                    })
                )
            }
            return null;
        })

        setTasks(
            tasks.map(task => {
                if(task.selected) {
                    return {...task, columns: task.columns.map((column) => {
                        if(result.destination.droppableId !== result.source.droppableId) {
                            if(column.id === result.destination.droppableId) {
                                const items = Array.from(column.cards);
                                const newItem = {...myMap.keys().next().value , activeStatus: column.title};
                                items.splice(result.destination.index, 0, newItem);

                                return {...column, cards: items};
                            } else {
                                return {...column, cards: column.cards.filter(item => item.id !== result.draggableId) }
                            }
                        } else {
                            if(column.id === result.destination.droppableId) {
                                
                                if(result.source.index !== result.destination.index) {  
                                    const items = Array.from(column.cards);
                                    const [reorderedItem] = items.splice(result.source.index, 1);
                                        items.splice(result.destination.index, 0, reorderedItem);
                                    return {...column, cards: items};
                                } else {
                                    return column; 
                                }

                            } else {
                                return column;
                            }
                        }
                    })}
                }
                return task;
            })
        )
        }
    };

    return (
        <div className="Board-container">
                {tasks.map( (task) => {
                    if(task.selected && task.columns.length > 0) {
                        return (
                            <div className='Boards' key={uuidv4()}>
                                <DragDropContext onDragEnd={onDragEnd} key={uuidv4()} >
                                    {task.columns.map((column,indexCol) =>
                                        <Droppable droppableId={column.id} key={column.id} index={indexCol}>
                                            {(provided) => {
                                                return(
                                                    <div 
                                                        className="column"
                                                    >
                                                        <div className="column_titile">
                                                            <div className="column_title-circle"></div>
                                                            <div className="column_title-text">{column.title} {`(${column.cards.length})`}</div>
                                                        </div>
                                                        <div 
                                                            key={column.id}
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}  
                                                            className={`column_container ${column.cards.length >= 1 ? "" : "column_container-empty" }`}
                                                        >
                                                            {column.cards.map((card,index) => {
                                                                if(card.activeStatus === column.title) {
                                                                    return (
                                                                        <Draggable key={card.id} draggableId={card.id} index={index}>
                                                                            {(provided) => {
                                                                                if (typeof provided.draggableProps.onTransitionEnd === 'function') {
                                                                                    queueMicrotask(() =>
                                                                                        provided.draggableProps.onTransitionEnd?.({
                                                                                            propertyName: 'transform',
                                                                                        })
                                                                                    );
                                                                                }
                                                                                return (
                                                                                    <div 
                                                                                        {...provided.draggableProps} 
                                                                                        {...provided.dragHandleProps} 
                                                                                        ref={provided.innerRef} 
                                                                                        className='Card' 
                                                                                        onClick={() => changeValueCard(card)}
                                                                                    >
                                                                                        <div className='Card__title'>{card.title}</div>
                                                                                        <div className='Card__count'>{`0 Of ${card.subTasks.length}`}</div>
                                                                                    </div>
                                                                                )
                                                                            }}
                                                                        </Draggable>
                                                                    )
                                                                } 
                                                                return null;
                                                            })}
                                                            {provided.placeholder}
                                                        </div> 
                                                    </div>
                                                )
                                            }}
                                        </Droppable>
                                    )}
                                </DragDropContext>
                                <div key={uuidv4()} className="column">
                                    <div className="column_titile">&nbsp;</div>
                                    <button className='Column__addNewButton' onClick={() => changeColumns(task)}>+ New Column</button>
                                </div>
                            </div>
                        )
                    } else if(task.selected) {
                        return (
                            <div key={uuidv4()} className="column">
                                <div className="column_titile">&nbsp;</div>
                                <button className='Column__addNewButton' onClick={() => changeColumns(task)}>+ New Column</button>
                            </div>
                        )
                    }
                    return null;
                })}
        </div>
    )
}

export default Board;