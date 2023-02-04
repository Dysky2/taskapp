import './DeleteBoard.css'

const DeleteBoard = ({taskDelete, tasks, setTasks,showDeleteBoard , setShowDeleteBoard}) => {

    const deleteBoard = () => {
        setTasks(tasks.filter((item) => item.id !== taskDelete.id));
        setShowDeleteBoard(!showDeleteBoard);
    }
    const canelDelete = (event) => {
        event.preventDefault();
        setShowDeleteBoard(!showDeleteBoard);
    }
    
    return (
        <div className='Modal'>
            <div className="DeleteBoard">
                <div className="DeleteBoard__topWrapper">
                    <h2 className="DeleteBoard__text-title">Delete this board?</h2>
                    <p className="DeleteBoard__text-info">Are you sure you want to delete the  board? This action will remove all columns and tasks and cannot be reversed.</p>
                </div>
                <div className="DeleteBoard__btnWrapper">
                    <button type="button" className="Button  Button--small  DeleteBoard__btn--delete Button--custom " onClick={deleteBoard}>Delete</button>
                    <button type="button" className="Button  Button--small  DeleteBoard__btn--cancel Button--custom " onClick={canelDelete}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteBoard