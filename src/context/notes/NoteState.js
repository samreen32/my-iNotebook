import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
const host = "http://localhost:5000";
const notesInitial = [];
const [notes, setNotes] = useState(notesInitial);


//Get all Notes Method
const getNotes = async ()=>{
   //API Call
   /* Copy from header express. */
   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    }
  });
  const json = await response.json();
  console.log(json);
  setNotes(json);
}



//Add a Note Method
const addNote = async (title, description, tag)=>{
   //API Call
   /* Copy from header express. */
   const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag}) 
  });


  //API call for adding note on front-end.
  const note = await response.json(); 
  setNotes(notes.concat(note));       //notes.push update an array wherease notes.concat returns an array.
}



//Delete Note Method
const deleteNote = async (id)=>{
    //API Call
   /* Copy from header express. */
   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    }
  });
  const json = response.json();
  console.log(json);

  //Deleting note from front-end.
  console.log("Deleting note with id" + id);
  const newNotes = notes.filter((note)=>{return note._id !== id});
  setNotes(newNotes);
}



//Edit Note Method
const editNote = async (id, title, description, tag)=>{
  //API Call
   /* Copy from header express. */
  const response = await fetch(`${host}/api/notes/uppdatenote/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag}) 
  });
  const json = await response.json();
  console.log(json);


  //logic to edit in client/front-end side.
  let newNotes = JSON.parse(JSON.stringify(notes));
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);
}


   /* const s1 ={"name": "Samreen", "class": "5b"};
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(() =>{
            setState ({"name": "Simran", "class": "10b"});
        }, 1000);
    }*/
    

  return(
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>    {/* for using above code, must have to pass value={{state, update}} */}
          {props.children}
      </NoteContext.Provider>
  )
  
} 

export default NoteState;