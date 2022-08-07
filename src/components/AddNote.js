import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;    //destructuring. As {addNote} is passed as props in NoteState.js file.
    const [note, setNote] = useState({title: "", description: "", tag: ""});


    const handleAddNote =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.mysetAlert("Added Successfully", "success");  
    }

    
    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value});      // (...note) shows separate operator. It indicates that value in that 'note' remains same but after 'note', add or override those properties that has been passed in it. 
            //name equal to value.
    }


  return (
    <div>
      <div className="container my-5">
        <h1>Add a Note</h1>
        <form  className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" 
            aria-describedby="emailHelp" value={note.title} minLength={5} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" 
            value={note.description} minLength={5} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" 
            value={note.tag} minLength={5} onChange={onChange} required/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleAddNote}
          disabled={note.title.length<5 || note.description.length<5} >Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote;
