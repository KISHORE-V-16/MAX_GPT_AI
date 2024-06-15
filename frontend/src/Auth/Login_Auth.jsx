import React from 'react'
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import {  ToastContainer, toast ,Bounce} from 'react-toastify';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

const Login_Auth = () => {

  const toaststyles =  {
    position: "top-center",
    autoClose: 1300, 
    hideProgressBar: false, 
    closeOnClick: true,
    pauseOnHover: false, 
    draggable: true, 
    progress: undefined,
    className: "custom-toast",
    transitions:Bounce
  }

  const navigate1 = useNavigate();

  const userdata=[];

  const [formdata,setformdata] = useState({email:"",password:""});

  const [pwdshow,setpwdshow] = useState(false);

  const login_control = () =>{

              const logincred = axios.post("http://localhost:5001/auth/login",formdata);
              
              logincred.then((response)=>{
                if(!response.data.success){
                  console.log(response.data.message);
                  toast.error(`${response.data.message}`,toaststyles);
                  setTimeout(()=>{
                    setformdata({password:"",email:""});
                  },1800);
                }else{
                  toast.success("Login Successful ...",toaststyles);
                  localStorage.setItem('token'+`${formdata.email}`,JSON.stringify({token:response.data.token,username:response.data.username}));
                  setformdata({password:"",email:""});
                  setTimeout(()=>{
                    navigate1('/Home'+`?email=${formdata.email}&token=${response.data.token}`);
                  },1800);
                }
                
              })
  }

  return (
    <LogIn_styles>
      <div className="container">
    <ToastContainer/>
    <div className="sub-cont-2 w-[200rem] relative h-[38.63rem] items-center justify-center">
    <div className="login-container mt-[2rem] flex absolute left-[170px] flex-col justify-center items-center">
          <header>
                <h3 className='flex flex-row items-center text-newcolor blur-[1px] h-[10rem] font-sans justify-center text-[55px] drop-shadow-sm font-bold'>Sign In</h3>
          </header>
          <body>
                <div className="container-2 text-white font-sans flex flex-col gap-[30px] h-[20rem] justify-center items-center">
                      <div className="email-sub flex flex-col text-[20px] font-bold justify-start gap-4">
                            <label htmlFor="email" className='font-sans font-extrabold'>Email :: </label>
                            <input type="email" name="email" id="email" onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value})} value={formdata.email} className='w-[20rem] h-[3rem] border-newcolor shadow-[0px_0px_40px_-0px] shadow-blue-400 bg-gray-900 text-white border-[2px] rounded-[10px]'/>
                      </div>
                     <div className="password-sub flex flex-col text-[20px]  font-bold justify-start gap-4">
                            <label htmlFor="password" className='font-sans font-extrabold'>Password ::</label>
                            <div className="pass-sub flex flex-row gap-[10px]">
                              {
                                (pwdshow) ? (<input type="text" name="password" id="password" onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value})} value={formdata.password} className='w-[16rem] h-[3rem] border-newcolor shadow-[0px_0px_40px_-0px] shadow-blue-400 bg-gray-900 text-white  border-[2px] rounded-[10px]'/>) 
                                :
                                (<input type="password" name="password" id="password" onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value})} value={formdata.password} className='w-[16rem] h-[3rem] border-newcolor shadow-[0px_0px_40px_-0px] shadow-blue-400 bg-gray-900 text-white  border-[2px] rounded-[10px]'/>)
                              } 
                                <button className='loginButton hover:scale-[1.05] hover:transition-transform hover:text-white hover:bg-second hover:border-white bg-white text-[20px] text-newcolor w-[3rem] border-[2px] h-[3rem] font-extrabold flex flex-row justify-center items-center rounded-[10px]' onClick={()=>{setpwdshow(!pwdshow);}}><FaEye/></button>
                            </div>
                     </div>
                    <div className="btn">
                      <Button onClick={()=>{
                            login_control();
                      }} className='loginButton hover:scale-[1.05] hover:transition-transform hover:text-white hover:bg-second hover:border-white text-[20px] w-[8rem] border-[2px] h-[3rem]' radius="md" size='md' variant='outline' bg="white" >Log In</Button>
                    </div>
                    <div className="foot-body">
                        <span className='text-[15px] text-white font-bold '>Don't have an Account ?    <Link to="/signup" className='text-newcolor text-[19px]'>SignUp</Link></span>
                    </div>
                </div>                                    
          </body>
    </div>
</div>
</div>
</LogIn_styles>
  )
}

const LogIn_styles = styled.div`
.custom-toast{

      background-color: black;
      color:white;
}
`

export default Login_Auth
