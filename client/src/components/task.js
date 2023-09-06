import React, { useEffect, useState } from 'react'
import "../components/task.css"
import axios from 'axios'
function Task (props){

  const [divwidth,setdivwidth]=useState("");
  const [divheight,setdivheight]=useState("");
  const [vis,setvis]=useState("");
  const [state,setstate]=useState("");

  const [updatetask,setUpdatetask]=useState("");
  const [subject,setSubject]=useState("");


  const [newtabvis,setnewtabvis]=useState("");
  const [pad,setPad]=useState("");

  var i=0;
  useEffect(()=>{
    setdivheight("200px");
    setdivwidth("25%");
    setvis("hidden");
    setstate("expand");
    setnewtabvis("hidden")
    if(props.Subject==="") setSubject("Personal Task")
    else setSubject(props.Subject)
    setUpdatetask(props.task)
    setPad("0px")
  },[])


  const taskUpdate=()=>{
    const day=new Date();
    var date1=day.toLocaleDateString().toString();
    axios.put("http://localhost:3001/updateTask/"+props.taskid,{task:updatetask,subject:subject,date:date1})
    .then(res=>{alert(res.data.message);window.location.reload()})
    .catch(err=>{console.log(err)})
  }

  const deletetask=()=>{
    if(window.confirm("you sure want to delete")){
    axios.post("http://localhost:3001/deletetask",{userid:props.taskid})
    .then(res=>{
      alert(res.data.message);
      window.location.reload()

    })
    .catch(err=>console.log(err))
  }
  }

  // const adjust=()=>{
  //   if(i===1){
  //   setstate("expand")
  //   setdivheight("200px")
  //   setdivwidth("353px")
  //   setvis("hidden")
  //   i=0;
  //   }
  //   else{
  //   setstate("shrink")
  //   setdivheight("fit-content")
  //   setdivwidth("fit-content")
  //   setvis("visible")
  //   setPad("30px");
  //   i=1;
  //   }
  // }
  return (
    <>
    <div className='total' style={{overflow:vis}}>
    <div className='container'>
      <label className='subject'>subject : {
      props.Subject!==""?props.Subject:"personal task"
      }</label>
      <pre className='task'>{props.task}</pre>
      <label className='date'>{props.date}</label>
    </div>
    <div className='buttons'>
      <button className='btn' onClick={()=>{
        setnewtabvis("visible");
      }}>edit</button>
      <button className='btn' onClick={deletetask}>remove</button>
    </div>

    </div>

    <div className="newtab" style={{visibility:newtabvis}}>
          <textarea id='updateTask' name='updateTask' value={updatetask} onChange={e=>{setUpdatetask(e.target.value)}}/>
          <input type='text' id='subject' name='subject' value={subject} onChange={e=>{setSubject(e.target.value)}}/>
          <button onClick={taskUpdate}>update</button>
          <button onClick={()=>{setnewtabvis("hidden")}}>cancel</button>

    </div>
    </>

  )
}

export default Task;