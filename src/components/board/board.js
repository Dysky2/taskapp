import './boards.css';
import {v4 as uuidv4} from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Board = ({tasks ,stateOfColumnsOverlay, columns, setStateOfColumnsOverlay, setUpdateTask, cards, showColumnDelete, setShowColumnDelete, showCardOv,setShowCardOv ,setUpdateCard}) => {

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
        // if (!result.destination) return;

        // const items = Array.from(drag);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        //    items.splice(result.destination.index, 0, reorderedItem);
        // setDrag(items);

        (
            tasks.map(task => {
                if(task.selected) {
                    return {...task, columns: task.columns.map(itemCol => {
                        if(itemCol.id === result.source.droppableId) {
                            return {...itemCol, cards: [...itemCol.cards, ]}
                        } else {
                            return {...itemCol, cards: itemCol.cards.filter(item => item.id !== result.draggableId) }
                        }
                        // if(itemCol.title === column.title) {
                        //     return {...itemCol, cards: [...itemCol.cards, {...updateCard, activeStatus: column.title}] }
                        // } else {
                        //     return {...itemCol, cards: itemCol.cards.filter(item => item.id !== updateCard.id)
                        //     }
                        // }
                    })}
                }
                return task;
            })
        )
    };

    return (
        <div className="Board-container">
                {tasks.map( (task) => {
                    if(task.selected && task.columns.length > 0) {
                        return (
                            <div className='Boards' key={uuidv4()}>
                                {task.columns.map((column,indexCol) =>
                                
                                    <DragDropContext onDragEnd={onDragEnd} key={column.id} >
                                        <Droppable droppableId={column.id}>
                                            {(provided) => {
                                                return(
                                                    <div 
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps} 
                                                        className="column"
                                                    >
                                                        <div className="column_titile">
                                                            <div className="column_title-circle"></div>
                                                            <div className="column_title-text">{column.title}</div>
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
                                                                        <Draggable key={card.id} draggableId={card.id} index={indexCol}>
                                                                            {(provided) => {
                                                                                return (
                                                                                    <div 
                                                                                        {...provided.draggableProps} 
                                                                                        {...provided.dragHandleProps} 
                                                                                        ref={provided.innerRef} 
                                                                                        className='Card' onClick={() =>changeValueCard(card)}
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
                                    </DragDropContext>
                                )}
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