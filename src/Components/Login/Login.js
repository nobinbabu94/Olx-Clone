import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context'
import { useHistory } from 'react-router-dom'
import { display, textAlign } from '@mui/system';
function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)
  const [error, setError] = useState(false);
  const [message, setMessages] = useState("");
  const [psd, setPsd] = useState("");
  const [UserError, setUserError] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()

    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(email)) {
      setMessages("Email is valid");
    }
    if (email.length === 0) {
      setError("true");
    } else if (!regEx.test(email)) {
      setMessages("Email is not valid ");
    } else {
      setMessages("");
    }
    if (password.length === 0 && password < 6) {
      setPsd("password is not valid")
    }


    firebase.auth().signInWithEmailAndPassword(email, password)

      .then((credential) => {
        localStorage.setItem('token', credential.user.Aa)
        history.push('/')
        console.log(credential.user.Aa);
      })
      
    
    
  }
  useEffect(() => {
    const token = localStorage.getItem('token');


    if (token) {
      history.push('/')
    }
  }, [])

  return (
    <div>
      <div className="loginParentDiv">
        <img onClick={() => { history.push("/") }} width="200px" height="200px" src={Logo} alt='Olx'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname" required>Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"

          />
          <br />
          {message ? <label style={{ color: "red" }}>{message}</label> : ""}
          {error && email.length <= 0 ?
            <label style={{ color: "red" }} >email cannot be empty </label> : ""}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"

          />
          <br />
          {psd && password.length < 6 ? (
            <label style={{ color: "red" }}>password cannot be empty </label>
          ) : (
            ""
          )}
          <br />
          <button>Login</button>
        </form>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} onClick={() => { history.push('/signup') }}>
          <span>Signup</span>
        
        </div>
        <br />
 
      </div>
    </div>
  );
}

export default Login;
