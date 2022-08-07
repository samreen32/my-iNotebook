import React from 'react';
import Notes from './Notes';

const Home = (props) => {

 const {mysetAlert} = props;
  return (
    <div>
      <Notes mysetAlert={mysetAlert}/>
    </div>
  )
}

export default Home;
