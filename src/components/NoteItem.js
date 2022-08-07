import React, {useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {

  const {note, updateNote} = props;     //destructuring... in {} we can use variable with exact spell as same meaning in other file.
                                  //As {note} is passed as props in Notes.js file.
                           
  const context = useContext(NoteContext); 
  const {deleteNote} =context;

  return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">   
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa fa-trash mx-2" aria-hidden="true" onClick={()=>{deleteNote(note._id);
                     props.mysetAlert("Deleted Successfully", "success");  }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem;
