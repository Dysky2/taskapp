const TaskList = ({tasks, setTasks}) => {

    const selectTask = (task) => {
        setTasks(
            tasks.map( (item) => {
                if(item.id === task.id) {
                    return {...item, selected: true}
                } else {
                    return {...item, selected: false}
                }
            })
        )
    }

    return(
        tasks.map(task => 
            <div key={task.id} onClick={() => selectTask(task)} className={`SideNav_tab ${task.selected ? "SideNav_tab--active" : ""}`}>{task.title}</div>
        )
    )
}
export default TaskList;