import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword:""});
  let redirect = useNavigate();


//Function
const handleSignupSubmit = async (e)=>{
  e.preventDefault();
  const {name, email, password} = credentials;    //destructuring... name, email, pass taking out from credentials.
  
  //API Call
  /* Copy from header express. */
  const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}) 
  });

    const json = await response.json();
    console.log(json);

    if(json.success){
      //Save the auth token and redirect.
      localStorage.setItem('token', json.authToken);      //Saving token in local storage.
      redirect("/");                              //useNavigate used for redirect e.g. in case of meeting correct credientials redirect the user to home page.
      props.mysetAlert("Created account successfully", "success");
    
    }else{
      props.mysetAlert("Invalid Credentials", "danger");
    }
}


const onChange =(e)=>{
  setCredentials({...credentials, [e.target.name]: e.target.value});      // (...credentials) shows separate operator. It indicates that value in that 'credentials' remains same but after 'credentials', add or override those properties that has been passed in it. 
          //name equal to value.
}



  return (
    <div className='container mt-3'>
      <h2>Signup to use an iNotebook</h2>
      <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name="name" id="name" 
                value={credentials.name} onChange={onChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="email" 
                value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password"
                value={credentials.password} onChange={onChange} minLength={5} required/>
            </div>

            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpassword" id="cpassword"
                value={credentials.cpassword} onChange={onChange} minLength={5} required/>
            </div>

            <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
    </div>
  )
}

export default Signup;
