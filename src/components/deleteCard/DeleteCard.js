const DeleteCard = ({ updateCard,tasks, setTasks,showDeleteCard,setShowDeleteCard,setShowCardOv}) => {

    const deleteBoard = () => {
        setTasks(tasks.map(task => {
            if(task.selected) {
                return {...task, columns: task.columns.map(column => {
                    if(column.title === updateCard.activeStatus) {
                        return {...column, cards: column.cards.filter(item => item.id !== updateCard.id)};
                    }
                    return column;
                })}
            }
            return task;
        }))
        setShowCardOv(false)
        setShowDeleteCard(!showDeleteCard)
    }

    const cancelDelete = (event) => {
        event.preventDefault();
        setShowDeleteCard(!showDeleteCard)
    }
    
    return (
        <div className='Modal'>
            <div className="DeleteBoard">
                <div className="DeleteBoard__topWrapper">
                    <h2 className="DeleteBoard__text-title">Delete this Card?</h2>
                    <p className="DeleteBoard__text-info">Are you sure you want to delete the {updateCard.title} Card?</p>
                </div>
                <div className="DeleteBoard__btnWrapper">
                    <button type="button" className="Button  Button--small  DeleteBoard__btn--delete Button--custom " onClick={deleteBoard}>Delete</button>
                    <button type="button" className="Button  Button--small  DeleteBoard__btn--cancel Button--custom " onClick={cancelDelete}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteCard;