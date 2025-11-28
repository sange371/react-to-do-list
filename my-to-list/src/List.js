import {useState} from 'react';
import {useEffect} from 'react';
import './List.css';



export default function List(){

    let [tasks, setTasks]=useState([]);                                     /* creates an empty array to store the tasks the user will input */
    let [inputValue,setInputValue]=useState("");                           /* creates a state variable to store the current value of the input value */

    function addTask(){
        if(inputValue ==="")return; /*this prevents adding empty tasks */
        let newTask={
            id: Date.now(),            /* creates a unique id based on the current timestamp */
            text: inputValue,          /* sets the text of the task to the current input value */
            completed: false,           /* sets the first value of completed to false */
        };
        setTasks([...tasks,newTask]);        /* adds the new task to the existing list of the tasks */
        setInputValue("");                   /* clears the input field after adding the task */
    }
    
    useEffect(() => {
        let savedTasks=localStorage.getItem("task");
        if (savedTasks){
            setTasks(JSON.parse(savedTasks))
        }
    },[]);       /* this effect loads saved tasks if there are any */

    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks]);      /* this effect saves task to the local storage */ 

    function toggleTask(id){
        setTasks(tasks.map(tasks => tasks.id === id ? {...tasks,completed: !tasks.completed}: tasks));         /* this function toggles the completed status of a task based on its id */
    }

    function deleteTask(id){
            if (window.confirm("Are you sure you want to delete this task?")){
                setTasks(tasks.filter(task => task.id !== id))
            }           /* this function  deletes a task based on its id */
    }



    return(
        <div className="list-container">
            <h1>My To-Do List</h1>
            <input type="text" value={inputValue} placeholder="Add a task..." className="input" onChange={(e) => setInputValue(e.target.value)}/>
            <button className="button" onClick={addTask}>Add</button>
            <br/>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? "completed" :""}>
                        <input type="checkbox" checked={task.completed} className="checkbox" onChange={() => toggleTask(task.id)} />
                        <span>{task.text}</span>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}