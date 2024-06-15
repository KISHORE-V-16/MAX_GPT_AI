import React from 'react'
import { Button, NumberInput } from "@mantine/core";
import { useState } from 'react';
import {styled} from 'styled-components';
import {toast } from 'react-toastify';

const Otpform = ({close,setcheckstatus,setchecksuccess}) => {

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

    const [emailcode, setemailcode] = useState("");
    const [quantityError, setQuantityError] = useState("");

    const SERVER_IP = "http://localhost:5001/request";

    async function verifyemailcode(emailcode){
        await fetch(SERVER_IP+'/verifycode',{
            method: 'POST',
            headers: {
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify({ "emailcode":emailcode})
            })
            .then(response => {
      
            if(response.ok === true) {
                setTimeout(() => {
                    close();
                }, 2000);
                setcheckstatus(true);
             setchecksuccess(true);
            }
            else{   
                setcheckstatus(false);
                setchecksuccess(false);
           toast.error('Enter a Valid Otp',toaststyles);
          }})
    }

  return (
    <Otp_styles>
        
    <div className="flex flex-col w-full h-fit justify-center content-center align-middle p-3">
    <div className="flex w-full h-auto justify-start content-center  my-3">
      OTP Code :
    </div>
    <div className="sub-cont flex flex-col">
        <div>
        <NumberInput
        label="OTP"
        description="Enter the 6-digit verification code ::"
        placeholder="* * * * * *"
        className="my-3"
        onChange={(value) => setemailcode(Number(value))}
        withAsterisk
        styles={{
          input: {
            backgroundColor: 'black', 
            color : 'white',
            borderBottomColor : 'blue',
            borderBottomWidth : '3.5px',
            borderTopColor : 'black',
            borderLeftColor : 'black',
            borderRightColor : 'black',
          },
          control: {
            color: "blue",
            borderLeft: "black",
          },
          controls: {
            borderLeft: "black",
          },
        }}
        error={quantityError}
      />
        </div>
      
      
      <Button
        className="flex w-full justify-center items-center mt-7 h-[2rem]"
        onClick={() => verifyemailcode(emailcode)}
      >
        Submit
      </Button>
    </div>
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

export default Otpform
