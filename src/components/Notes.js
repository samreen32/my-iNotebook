import React, {useContext, useEffect, useRef, useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    
  const context = useContext(NoteContext);
  const {notes, getNotes, editNote} = context;      //exporting notes using context from NoteState.
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""});
  let redirect = useNavigate();
  
  useEffect(()=>{
    //First login then can see notes.
    if(localStorage.getItem('token')){      //if this statement is not null then show notes otherwise redirect to login page.
      getNotes();
    }
    else{
      redirect("/login");
    }
  
    // eslint-disable-next-line
  }, [])


//Method 
const updateNote =(currentNote)=>{
  ref.current.click();    //it indicates where ref is pointing. It is manidatory for using useRef() to write it as ref.current.yourFunction().
  setNote({id: currentNote._id, etitle: currentNote.title, 
    edescription: currentNote.description, etag: currentNote.tag});
}

//Method
const handleEditNote =(e)=>{
  console.log("Updating or editing note", note);
  editNote(note.id, note.etitle, note.edescription, note.etag);   //passing parameters as in editNote function in NoteState.js file.
  refClose.current.click();     //while click on updateNote button modal will automatically close.
  
  props.mysetAlert("Updated Successfully", "success");  
}


const onChange =(e)=>{
  setNote({...note, [e.target.name]: e.target.value});      // (...note) shows separate operator. It indicates that value in that 'note' remains same but after 'note', add or override those properties that has been passed in it. 
        //name equal to value.
}



  return (
    <>
    <AddNote mysetAlert={props.mysetAlert}/>

    {/* Modal for updatating note */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form  className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"
                  value={note.etitle} minLength={5} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" 
                  value={note.edescription} minLength={5} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag}
                  minLength={5} onChange={onChange} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" 
              ref={refClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleEditNote}
              disabled={note.etitle.length<5 || note.edescription.length<5} >Update Note</button>
            </div>
          </div>
        </div>
      </div>



      {/*Viewing Notes */}
      <div className="row my-3">
          <h1>Your Notes</h1>
          <div className="container mx-2"> 
            {notes.length===0 && 'No Notes to display'}
          </div>
          {notes.map((note)=>{
              return <NoteItem key={note._id} updateNote={updateNote} note={note} mysetAlert={props.mysetAlert}/>   //passing note and updateNote as props.
          })}
      </div>
    </>
  )
}

export default Notes;