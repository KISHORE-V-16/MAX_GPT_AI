import alanBtn from '@alan-ai/alan-sdk-web';
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
import { useEffect } from 'react';
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {Bounce,toast} from 'react-toastify';

const AlanAi = () => {
  const ALAN_KEY = '';
  const navigate1 = useNavigate();
  const [searchParams] = useSearchParams();
  const useremail = searchParams.get('email');
  const username = localStorage.getItem('token'+`${useremail}`);
  const data = JSON.parse(username).username;

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
  
  const logOut = () =>
    {
      localStorage.removeItem('token'+`${useremail}`);
      toast.success("Logged Out Successfully ...",toaststyles);
      setTimeout(() => {
        navigate1('/login');
      }, 1800);    
  };

  localStorage.setItem('alan-voice',1);
  let count =localStorage.getItem('alan-voice');

  useEffect(() => {
    const alaninstance =  alanBtn({
        key: ALAN_KEY,
        onCommand: (commandData) => {
          if(commandData.command == "signin"){
            toast.warn('all are going good',toaststyles);
            if(localStorage.getItem('token'+`${useremail}`)){
              alaninstance.playText(`If would like go to sign In page u must need to logout and u can say logout if u wanna to go sign In page  ..`);
            }
             else{
              alaninstance.playText('navigated to login Page ..!');
              navigate1(`/login`);
            }
           }
          else if(commandData.command === "Home"){
           if(localStorage.getItem('token'+`${useremail}`)){
             navigate1('/Home'+`${useremail}`);
              alaninstance.playText('navigated to login Page ..!');
           }
           else{
            alaninstance.playText('you are not authorized to go home page sorry ,if u wanna to go login with your credentials ..!');
           }
          }
          else if(commandData.command === "logout"){
           logOut();
           alaninstance.playText("Come and visit for next time see you soon ..!");
          }
          else if(commandData.command=== "intropage"){
           alaninstance.playText(`Hello ${data} I hope u enjoy the conversation with me `);
           
            alaninstance.playText(` I am an AI assistant a mini version chat bot 
            you can discuss on any thing related to the website and i guide u ...!`);
          
          }
        }
    });

    if(localStorage.getItem('token'+`${useremail}`)!=null && count==1){
    
      
      alaninstance.playText(`Hello ${data} I hope u enjoy the conversation with me`);
      count++;
      setTimeout(() => {
        alaninstance.playText(` I am an AI assistant a mini version chat bot 
        you can discuss on any thing related to the website and i guide u ...!`);
       }, 3000);
      localStorage.setItem('alan-voice',0);
    }
    else if( localStorage.getItem('token'+`${useremail}`)==null){
     count =0;
    }

  }, []);

  return (
    
      <div>

      </div>
    
  )
}

export default AlanAi



  