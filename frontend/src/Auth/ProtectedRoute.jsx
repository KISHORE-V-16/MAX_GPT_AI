import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Loader from '../Component/Loader';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
 
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [searchParams] = useSearchParams();

  const useremail = searchParams.get('email');
  const token = searchParams.get('token');
  const username = localStorage.getItem('token'+`${useremail}`);
  const url = JSON.parse(username)?.token;

  const Authenticator = async (check) =>{
    if(check){
    const response = await axios.get('http://localhost:5001/auth/authorized',{headers:{
      "Content-Type": "application/json",
      "token": `${url}`,
    }});

    if(response.data.success==false && localStorage.getItem('token'+`${useremail}`)){
        localStorage.removeItem('token'+`${useremail}`);
        setIsAuthenticated(false);
    }
    else if(response.data.success==true){
      setIsAuthenticated(true);
    }
  }
}

useEffect(()=>{

  const intervalId = setInterval(() => {
    if (isAuthenticated==false) {
      clearInterval(intervalId);
      setIsAuthenticated(false);
    } else if(isAuthenticated==true && localStorage.getItem('token'+`${useremail}`)){
      Authenticator(localStorage.getItem('token'+`${useremail}`));
    }
  }, 900000);

},[isAuthenticated]);

const checkAuth = async () => {
  if(localStorage.getItem('token'+`${useremail}`)){
    setIsAuthenticated(true);
  }
};

  useEffect(() => {
    checkAuth();
  }, []);

if(isAuthenticated==null){
    return <Loader/>
  }

  return isAuthenticated ? children : <Navigate to="/NotAuthorized" />;
};

export default ProtectedRoute;
