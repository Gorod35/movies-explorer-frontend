import React from 'react';
import { Navigate } from "react-router-dom";


const ProtectedRouteElement = ({ children, loggedIn }) => {

  if ((children.type.name === 'Login') || (children.type.name === 'Register')) {
    return (
      loggedIn ? <Navigate to="/movies" /> : children
    )
  } else {
    return (
      loggedIn ? children : <Navigate to="/signin" />
    )
  }
}
export default ProtectedRouteElement; 