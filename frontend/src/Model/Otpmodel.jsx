import React, { useEffect } from 'react'
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, Tooltip } from "@mantine/core";
import {} from '@mantine/hooks'
import { useState } from 'react';
import Otpform from './Otpform';
import {styled} from 'styled-components';
import { ToastContainer ,toast} from 'react-toastify';

const Otpmodel = ({email,setcheckstatus}) => {

  
  const toaststyles =  {
    position: "top-center",
    autoClose: 1300, 
    hideProgressBar: false, 
    closeOnClick: true,
    pauseOnHover: true, 
    draggable: true, 
    progress: undefined,
    className: "custom-toast",
  }

  const [checksuccess,setchecksuccess] = useState(false);

  const sendotp = async () =>{
        
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailRegex.test(email)){
        await fetch('http://localhost:5001/request/emailcode',{
            method: 'POST',
            headers: {
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify({ "Emailid":email})
            })
            .then(response => {
      
            if(response.ok === true) {
      
              toast.success("Verification code sent successfully",toaststyles);
            }
            else{   
                toast.error("Oh no we have an error",toaststyles);
          }})
    }else{
        toast.error('Enter a Valid Email Address',toaststyles);
    }

}

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(()=>{
    if(checksuccess){
      toast.success("Verified Successfully ...",toaststyles);
      setchecksuccess(false);
    }
  },[checksuccess]);

  return (
    <Otp_styles>
    <div>
     
     <Modal
        opened={opened}
        onClose={close}
        title="OTP verification"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          body: {
            backgroundColor: 'powderblue',
          },
          header : {
            backgroundColor : "#318CE7",
            color : 'white',
            
          }
        }}
      >
        <Otpform close={close} setcheckstatus={setcheckstatus} setchecksuccess={setchecksuccess}/>
      </Modal>
      
      <Button className='loginButton hover:scale-[1.05] hover:transition-transform hover:text-white hover:bg-second hover:border-white bg-white text-[20px] text-newcolor w-[5rem] border-[2px] h-[3rem] font-extrabold flex flex-row justify-center items-center rounded-[10px]' onClick={()=>{open();sendotp();}}>
        Verify
      </Button>
    </div>
</Otp_styles>
  )
}

const Otp_styles = styled.div`
.custom-toast{
      background-color: black;
      color:white;
}
`

export default Otpmodel;
