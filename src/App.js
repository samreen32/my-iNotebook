import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  const [myalert, setAlert] = useState(null);

  //Function
  const mysetAlert = (message, type)=>{
    setAlert({msg:message, type:type})
    setTimeout(() =>{
      setAlert(null);
    }, 3000) 
  }


  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={myalert}/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home mysetAlert={mysetAlert} />}> </Route>
          <Route exact path="/about" element={<About/>}> </Route>
          <Route exact path="/login" element={<Login mysetAlert={mysetAlert} />}> </Route>
          <Route exact path="/signup" element={<Signup mysetAlert={mysetAlert} />}> </Route>
        </Routes>
      </div>
    </Router>

    </NoteState>
    </>
  );
}

export default App;
