import React, { useContext} from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../store/Context";


const ProtectedRoute = ({ children }) => {
    const {user} = useContext(AuthContext)
    const Navigate = useHistory()
   

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;


// import React from 'react'
// import {Route, Redirect} from 'react-router-dom'

// function protectedroutes({auth,component :Component, ...rest}) {
//   return (
//     <>
//     <Route {...rest} render ={(props) =>{
//         if(auth) return <Component {...props} />
//         if(!auth) return <Redirect to={{path:"/", state : {from : props.location}}}
//     }}
//     />
//     </>
//   )
// }

// export default protectedroutes