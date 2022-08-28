import React, { useContext, useEffect } from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from './store/PostContext'
// import ProtectedRoute from "./Protectedroutes/protectedroutes";

function App() {
  const {setUser}= useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })

  })

  return (
    <div>
      
      <Routes>
      <Post>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={Create} />
        <Route path="/view" component={View } />
        </Post>
      </Routes>
      
    </div>
  );
}

export default App;
