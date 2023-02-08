import './sideNav.css';
import { BsFillMoonFill, BsFillSunFill, BsFillEyeSlashFill, BsBox } from "react-icons/bs";
import TaskList from '../taskList/TaskList';

const SideNav = ({ stateOfOverlay, setStateOfOverlay, tasks, setTasks, setColumns  }) => {

    const changeStateOv = () => {
        setStateOfOverlay(!stateOfOverlay);
        setColumns([]);
    }

    return (
        <div className={`SideNav`}>
            <div className="SideNav_top">
                <div className="SideNav_head">{`All Boards (${tasks.length})`}</div>
                <div className="project_list" id="list-pr">
                    <TaskList 
                        tasks ={tasks}
                        setTasks = {setTasks}
                    />
                </div>
                <button className="SideNav_new_board" onClick={changeStateOv}>
                    <div className="icon">
                        <BsBox />
                    </div>
                    + Create New Board</button>
            </div>
            <div className="SideNav_bottom">
                {/* <div className="SideNav_theme-mode">
                    <div className="night-icon">
                        <BsFillMoonFill />
                    </div>
                    <input className='SideNav_theme-toggle' type='range' min={0} max={1}/>
                    <div className="sun-icon">
                        <BsFillSunFill />
                    </div>
                </div>
                <div className="SideNav_hideButton">
                    <BsFillEyeSlashFill />
                    <p className="SideNav_hideButton-title">Hide SideBar</p>
                </div> */}
            </div>
        </div>
    )
}

export default SideNav;