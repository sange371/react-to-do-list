import {useState} from 'react';
import './List.css';



export default function List(){

    let [tasks, setTasks]=useState([]);   /* creates an empty array to store the tasks the user will input */
    let [inputValue,setInputValue]=useState(""); /* creates a state variable to store the current value of the input value */

    function addTask(){
        if(inputValue ==="")return; /*this prevents adding empty tasks */
        let newTask={
            id: Date.now(),  /* creates a unique id based on the current timestamp */
            text: inputValue,  /* sets the text of the task to the current input value */
            completed: false,  /* sets the first value of completed to false */
        };
        setTasks([...tasks,newTask]); /* adds the new task to the existing list of the tasks */
        setInputValue(""); /* clears the input field after adding the task */
    }


    function toggleTask(id){
        setTasks(tasks.map(tasks => tasks.id === id ? {...tasks,completed: !tasks.completed}: tasks));  /* this function toggles the completed status of a task based on its id */
    }

    function deleteTask(id){
        setTasks(tasks.filter(task => task.id !==id));  /* this function deletes a task based on its id */
    }



    return(
        <div>
            <h1>My To-Do List</h1>
            <input type="text" value={inputValue} placeholder="Add a task..." onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={addTask}>Add</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? "completed" :""}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                        <span>{task.text}</span>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}