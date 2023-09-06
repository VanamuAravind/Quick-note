import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Task from '../components/task';
import { useRef } from 'react';
function App() {
  const ref = useRef(null);

  const [tasks,setTasks]= useState([]);
  const [inputTask,setInputTask]=useState("");
  const [subject,setSubject]=useState("");
  const [divvisibility,setDivvisibility]=useState("");
  const [divpos,setDivpos]=useState("");
  const [maindivpos,setMaindivpos]=useState("");

  useEffect(()=>{
    axios.get('http://localhost:3001/displaytask')
    .then(task=>{
      setTasks(task.data)
    })
    .catch(err=>console.log(err))

    setDivvisibility("hidden");
    setDivpos("absolute");
    setMaindivpos("absolute");
  },[])

  return (
    <div className="tasks-container">
      {
        
        tasks.map(task=>{
          return(
            <Task task={task.task} taskid={task._id} Subject={task.subject} date={task.date}/>
          )
          
        })
        
      }
      
      
      
      <div className='edit-container' style={{position:maindivpos}}>
        <a id="a" onClick={()=>{ref.current?.scrollIntoView({behavior: 'smooth'});}} >
          <div className='addtask' onClick={()=>{
          setDivvisibility("visible");
          setDivpos("relative");
          setMaindivpos("relative");
          
        }}>
          <button className='plus' >+</button>
        <label>Add task</label>
        </div>
        </a>
        <div id='input'  ref={ref} className='input' style={{visibility:divvisibility,position:divpos}}>
        <textarea placeholder='Enter your task' type='text' id='inputtask' name='inputtask' value={inputTask} onChange={event=>{setInputTask(event.target.value); }}/>
        <input placeholder='Subject' type='text' id='subject' name="subject" value={subject} onChange={event=>{setSubject(event.target.value)}}/>
        
        <button onClick={async()=>{
          try {
          axios.post("http://localhost:3001/addtask",{task:inputTask,subject:subject})
            .then(res=>{
              console.log(res.data.message)
              window.location.reload()
            })
          } catch (error) {
            console.log(error)
          }
        }
        
        } id='btn'>save</button>
        <button onClick={()=>{
          setDivvisibility("hidden");
          setDivpos("absolute");
          setMaindivpos("absolute");
        }} id='btn'>cancel</button>
        </div>
      </div>


    </div>
  );
}

export default App;
