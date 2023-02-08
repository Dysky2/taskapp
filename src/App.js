import { useEffect, useState } from 'react';
import './App.css'
import './index.css';
import Header from './components/header/header';
import SideNav from './components/sideNav/sideNav';
import Overlay from './components/overlay/overlay';
import Board from './components/board/board';
import ColumnOverlay from './components/columnOverlay/ColumnOverlay';
import CreatorTasks from './components/creatorTasks/CreatorTasks';
import CardOverlay from './components/cardOverlay/cardOverlay';
import DeleteBoard from './components/deleteBoard/DeleteBoard';
import EditBoard from  './components/editBoard/EditBoard';
import DeleteCard from './components/deleteCard/DeleteCard';
import EditCard from './components/editCard/EditCard';

export default function App() {
  const initialState = (JSON.parse(localStorage.getItem("tasks")) || []);

  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState(initialState);

  useEffect(() =>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [updateTask, setUpdateTask] = useState('');
  const [taskDelete, setTaskDelete] = useState('');
  const [editedTask, setEditedTask] = useState('');

  const [stateOfOverlay, setStateOfOverlay] = useState(false);
  const [stateOfColumnsOverlay, setStateOfColumnsOverlay] = useState(false);
  const [stateAddTask, setStateAddTask] = useState(false);
  const [showColumnDelete, setShowColumnDelete] = useState(false);
  const [showDeleteBoard, setShowDeleteBoard] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  

  const [inputColumn, setInputColumn] = useState('');
  const [columns, setColumns] = useState([]);
  const [columnsToUpdate, setColumnsToUpdate] = useState('');

  const [cards, setCards] = useState([]);
  const [updateCard, setUpdateCard] = useState('');
  const [showCardOv, setShowCardOv] = useState(false);

  return (
    <div className="App">
      <div className='header'>
        <Header 
          tasks = {tasks}
          setTasks = {setTasks}
          taskDelete = {taskDelete}
          setTaskDelete = {setTaskDelete}
          stateAddTask = {stateAddTask}
          setStateAddTask = {setStateAddTask}
          showDeleteBoard = {showDeleteBoard}
          setShowDeleteBoard = {setShowDeleteBoard}
          editedTask= {editedTask}
          setEditedTask = {setEditedTask}
          showEditBoard = {showEditBoard}
          setShowEditBoard = {setShowEditBoard}
          columnsToUpdate = {columnsToUpdate}
          setColumnsToUpdate = {setColumnsToUpdate}
        />
      </div>
      <div className='main'>
        <SideNav 
          tasks = {tasks}
          setTasks = {setTasks}
          stateOfOverlay = {stateOfOverlay}
          setStateOfOverlay = {setStateOfOverlay}
          setColumns = {setColumns}
        />
      </div>
      <div className='board'>
        <Board 
          tasks = {tasks}
          setTasks = {setTasks}
          stateOfColumnsOverlay = {stateOfColumnsOverlay}
          setStateOfColumnsOverlay = {setStateOfColumnsOverlay}
          setUpdateTask = {setUpdateTask}
          setShowColumnDelete = {setShowColumnDelete}
          showCardOv = {showCardOv}
          setShowCardOv = {setShowCardOv}
          setUpdateCard = {setUpdateCard}
        />
      </div>
      <div className={`Overlay ${stateOfOverlay ? '': 'none'}`}>
        <Overlay 
          inputTask={inputTask}
          setInputTask={setInputTask}
          tasks = {tasks}
          setTasks = {setTasks}
          stateOfOverlay = {stateOfOverlay}
          setStateOfOverlay = {setStateOfOverlay}
          setInputColum = {setInputColumn}
          columns = {columns}
          setColumns = {setColumns}
        />
      </div>
      <div className={`column_Overlay ${stateOfColumnsOverlay ? '': "none"}`}>
        <ColumnOverlay 
          tasks = {tasks}
          setTasks = {setTasks}
          setInputColum = {setInputColumn}
          stateOfColumnsOverlay = {stateOfColumnsOverlay}
          setStateOfColumnsOverlay = {setStateOfColumnsOverlay}
          updateTask = {updateTask}
          showColumnDelete = {showColumnDelete}
          setShowColumnDelete = {setShowColumnDelete}
        />
      </div>
      <div className={`Overlay ${stateAddTask ? '' : 'none'}`}>
        <CreatorTasks 
          tasks={tasks}
          setTasks = {setTasks}
          stateAddTask = {stateAddTask}
          setStateAddTask = {setStateAddTask}
          cards = {cards}
          setCards = {setCards}
        />
      </div>
      <div className={`cardOverlay ${showCardOv ? '' : 'none'}`}>
        <CardOverlay 
          updateCard = {updateCard}
          setUpdateCard = {setUpdateCard}
          showCardOv = {showCardOv}
          setShowCardOv = {setShowCardOv}
          tasks = {tasks}
          setTasks = {setTasks}
          showDeleteCard = {showDeleteCard}
          setShowDeleteCard = {setShowDeleteCard}
          setShowEditCard = {setShowEditCard}
          showEditCard = {showEditCard}
        />
      </div>
      <div className={`Overlay  ${showDeleteBoard ? '' : 'none'}`}>
        <DeleteBoard 
          taskDelete = {taskDelete}
          setTaskDelete = {setTaskDelete}
          showDeleteBoard = {showDeleteBoard}
          setShowDeleteBoard = {setShowDeleteBoard}
          tasks = {tasks}
          setTasks = {setTasks}
        />
      </div>
      <div className={`Overlay  ${showEditBoard ? '' : 'none'}`}>
        <EditBoard 
          editedTask= {editedTask}
          setEditedTask = {setEditedTask}
          showEditBoard = {showEditBoard}
          setShowEditBoard = {setShowEditBoard}
          tasks= {tasks}
          setTasks = {setTasks}
          columnsToUpdate = {columnsToUpdate}
          setColumnsToUpdate = {setColumnsToUpdate}
        />
      </div>
      <div className={`Overlay  ${showDeleteCard ? '' : 'none'}`}>
        <DeleteCard 
          updateCard = {updateCard}
          tasks={tasks}
          setTasks={setTasks}
          showDeleteCard = {showDeleteCard}
          setShowDeleteCard = {setShowDeleteCard}
          setShowCardOv = {setShowCardOv}
        />
      </div>
      <div className={`Overlay  ${showEditCard ? '' : 'none'}`}>
        <EditCard 
          tasks={tasks}
          setTasks={setTasks}
          showEditCard = {showEditCard}
          setShowEditCard= {setShowEditCard}
          updateCard = {updateCard}
          setUpdateCard = {setUpdateCard}
        />
      </div>
    </div>
  );
}
