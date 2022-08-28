import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [message, setMessages] = useState("");
  const [ph, setPh] = useState('');
  const [phError, setPhError] = useState(false)
  const [psd, setPsd] = useState("");
  const [auth, setAuth] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
   



    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PhoneReg = /^\d{10}$/;
    if (regEx.test(email)) {
      setMessages("Email is valid");
    }
    if (username.length === 0 && email.length === 0 ) {
      setError("true");
    } else if (!regEx.test(email)) {
      setMessages("Email is not valid ");
    } else {
      setMessages("");
    }


    if (phone=== '') {
      setPh("Phone is not valid ");
    } 
     
    if (password.length === 0 || password < 6) {
      setPsd("password is not valid");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>{result.user.updateProfile({displayName:username })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .add({
                id: result.user.uid,
                email: email,
                username: username,
                phone: phone,
              })
            //     if(username && email && phone && password && regEx.test(email)){
                history.push("/login");
            // }
    
          }).catch((e) =>
          setAuth('password in already in use')
        );
          
      })


  };

  useEffect(() => {
    const token = localStorage.getItem('token');
 

    if (token) {
        history.push('/')
    }
},[])

  return (
    <div>
      <div className="signupParentDiv">
        <img
          onClick={() => {
            history.push("/");
          }}
          width="200px"
          height="200px"
          src={Logo}
          alt="usrnme"
        ></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="fname"
            name="name"
          />
          <br />
          {error && username.length <= 0 ? (
            <label style={{ color: "red" }}>name cannot be empty </label>
          ) : (
            ""
          )}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="fname"
            name="email"
          />
          <br />
          {message ? <label style={{ color: "red" }}>{message}</label> : ""}
          {error && email.length <= 0 ? (
            <label style={{ color: "red" }}>email cannot be empty </label>
          ) : (
            ""
          )}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          // onKeyUp={()=>{handleMobile  }}
            className="input"
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            id="lname"
            name="phone"
          />
          <br />
   
  
          {ph && phone.length !== 10 ? (
            <label style={{ color: "red" }}>phone cannot be empty </label>
          ) : (
            ""
          )}
           
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="lname"
          />
          <br />
          {psd && password.length < 6 ? (
            <label style={{ color: "red" }}>password cannot be empty </label>
          ) : (
            ""
          )}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <div>
          <p
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </p>
          <br />
          <span>{auth}</span>
        </div>
      </div>
    </div>
  );
}
