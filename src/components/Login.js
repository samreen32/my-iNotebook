import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let redirect = useNavigate();

//Function
const handleLoginSubmit = async (e)=>{
    e.preventDefault();

   //API Call
   /* Copy from header express. */
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}) 
      });
      const json = await response.json();
      console.log(json);

      if(json.success){
        //Save the auth token and redirect.
        localStorage.setItem('token', json.authToken);      //Saving token in local storage.
        props.mysetAlert("Logged in successfully", "success");
        redirect("/");                              //useNavigate used for redirect e.g. in case of meeting correct credientials redirect the user to home page.
      
      }else{
        props.mysetAlert("Invalid Credentials", "danger");
      }
}


const onChange =(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});      // (...credentials) shows separate operator. It indicates that value in that 'credentials' remains same but after 'credentials', add or override those properties that has been passed in it. 
          //name equal to value.
}


  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
        <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="email" 
                value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password"
                value={credentials.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div> 
  )
}

export default Login;


//onSubmit={} is used in form and onClick={} is used in buttons.