import { ParticleBg } from '../assets/ParticleBg';
import Sign_up_Auth from '../Auth/Sign_up_Auth';
import { Button } from '@mantine/core';
import {useNavigate,Link, useSearchParams} from 'react-router-dom';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {FaEye} from 'react-icons/fa';
import { styled } from 'styled-components';
import {Modal} from '@mantine/core'
import Otpmodel from '../Model/Otpmodel';

const Sign_Up_page = () => {
      
      const toaststyles =  {
            position: "top-center",
            autoClose: 1300, 
            hideProgressBar: false, 
            closeOnClick: true,
            pauseOnHover: true, 
            draggable: true, 
            progress: undefined,
            className: "custom-toast",
            transitions:Bounce
          }

      const navigate1 = useNavigate();
    
      const [formdata,setformdata] = useState({username:"",email:"",password:"",code:""});
      const [checkpwd,setcheckpwd] = useState(false);
      const [checkemail,setcheckemail] = useState(false);
      const [checkname,setcheckname ] = useState(false);
      const [pwdshow,setpwdshow] = useState(false);
      const [checkstatus,setcheckstatus] = useState(false);


      const check_username = () =>{
    
          if(formdata.username.length<5){
            console.log("name");
            toast.warn("User name needed a minimum length of 5 character",toaststyles);
            setcheckname(false);
          }
          else{
            setcheckname(true);
          }
      }
    
      const checkemailaddress = () =>{
      
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if(!emailRegex.test(formdata.email)){
            toast.warn("enter a valid Email Address",toaststyles);
              setcheckemail(false);      
        }
        else if(!checkstatus){
          toast.warn("Verify the Email Id ..!",toaststyles);
        }
        else{
          setcheckemail(true);
        }
    }
    
    const checkpassword = () =>{
        
      if(formdata.password.length <= 5){
        console.log("pwd");
          toast.warn("Password should be at least 6 characters",toaststyles);
          setcheckpwd(false);
         
      }else{
        setcheckpwd(true);
      }
    }
    
      const signup_control =async () =>{
    
              checkemailaddress();
              checkpassword();
              check_username();
              
               if(checkstatus && checkpwd && checkname){
                  
                  const logincred = axios.post("http://localhost:5001/auth/register",formdata);
                  logincred.then((response)=>{
                    if(!response.data.success){
                      console.log(response.data.message);
                      toast.error(`${response.data.message}`,toaststyles);
                      setTimeout(()=>{
                        setformdata({username:"",password:"",email:""});
                        setcheckstatus(false);
                      },1800);
                    }else{
                      
                      toast.success("Registered Successfully ...",toaststyles);
                      localStorage.setItem('token',response.data.token);
                      setTimeout(()=>{
                        navigate1('/Login');
                      },1800);
                    }
                    
                  })
              }
    
      }

  return (
      <Sigh_up_styles>
      <div className="container">
     <ToastContainer/>
    <div className='container flex flex-row w-[300rem] pr-[76.7rem] overflow-hidden bg-blend-multiply h-[37.34rem]'>
        
          <ParticleBg/>
          <Sign_up_Auth/>

        <div className="container">

        <div className="sub-cont-2 w-[200rem] relative h-[38.63rem] items-center justify-center">
          <div className="login-container mt-[1rem] flex absolute left-[170px] flex-col justify-center items-center">
            <header>
                <h3 className='flex flex-row items-center text-newcolor blur-[1px] h-[10rem] font-sans justify-center text-[55px] drop-shadow-sm font-bold'>Sign Up</h3>
            </header>
          <body>
                <div className="container-2 text-white font-sans flex flex-col gap-[10px] mt-[1rem] h-[20rem] justify-center items-center">
                <div className="email-sub flex flex-col text-[20px] font-bold justify-start gap-4">
                            <label htmlFor="username" className='font-sans font-extrabold'>Username :: </label>
                            <input type="text" name="username" id="username" onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value})} value={formdata.username} className='w-[20rem] h-[3rem] border-newcolor shadow-[0px_0px_40px_-0px] shadow-blue-400 bg-gray-900 text-white border-[2px] rounded-[10px]'/>
                </div>
                      <div className="email-sub flex flex-col text-[20px] font-bold justify-start gap-4">
                            <label htmlFor="email" className='font-sans font-extrabold'>Email :: </label>
                            <div className="pass-sub flex flex-row gap-[10px]">
                                <input type="email" disabled={(checkstatus) ? true :false} name="email" id="password" onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value})} value={formdata.email} className='w-[14rem] h-[3rem] border-newcolor shadow-[0px_0px_40px_-0px] shadow-blue-400 bg-gray-900 text-white  border-[2px] rounded-[10px]'/>
                                <Otpmodel email={formdata.email} setcheckstatus={setcheckstatus}/>
                            </div>
                      </div>
                  
                     <div className="password-sub flex flex-col text-[20px] font-bold justify-start gap-4">
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
                    <div className="btn mt-[10px]">
                      <Button onClick={()=>{
                            signup_control();
                      }} className='loginButton hover:scale-[1.05] hover:transition-transform hover:text-white hover:bg-second hover:border-white text-[20px] w-[8rem] border-[2px] h-[3rem]' radius="md" size='md' variant='outline' bg="white" >Register</Button>
                    </div>
                    <div className="foot-body">
                        <span className='text-[15px] text-white font-bold '>Already have an Account ?<Link to="/login" className='text-newcolor text-[19px]  hover:scale-175'>  Login</Link></span>
                    </div>
                </div>                                    
          </body>
    </div>
</div>
</div>
</div>
    
    </div>
    </Sigh_up_styles>
  )
}

const Sigh_up_styles = styled.div`
.custom-toast{
      background-color: black;
      color:white;
}
`

export default Sign_Up_page
