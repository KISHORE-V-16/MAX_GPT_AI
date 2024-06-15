import React from 'react'
import {
    Button,
    Rating,
    Textarea,
  } from "@mantine/core";
  import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay,  Box } from '@mantine/core';
import { toast,Bounce } from 'react-toastify';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const FeedBackform = ({close}) => {
    
    const [searchParams] = useSearchParams();
    const useremail = searchParams.get('email');
    const username = localStorage.getItem('token'+`${useremail}`);
    const url = JSON.parse(username)?.token;
    
    const [visible, { toggle }] = useDisclosure(false);

    const [desc, setDesc] = useState("");
    const [rating, setRating] = useState(5);
    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");


    const toaststyles =  {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      };
  
  
    const handleSubmit = async (e) => {
      let flag = 0;
      toggle();
      if (desc == "") {
        setDescError("Give a valid feeedback");
        flag++;
      }
      if (flag == 0) {
        try {
        const response = await fetch(`http://localhost:5001/request/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": `${url}`,
          },
          body: JSON.stringify({"name":userdata, desc, rating }),
        })
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((json) => {
              throw new Error(json.message);
            });
          }
        })
        .then((data) => {
            toast.success("Feedback sent to " + userdata + " successfully!",toaststyles);
            close();
            setDesc("");
            setDescError("");
            setRating(5);   
        })
        } catch (error) {

          console.log(error.message);
          toast.error(error.message,toaststyles);
        }
      }
    };

  return (
    <div>
    <Box >
    <LoadingOverlay
      visible={visible}
      zIndex={1000}
      overlayProps={{ backgroundOpacity: 0.95, blur: 7 }}
    />
  </Box>
    <div className="flex flex-col justify-center content-center align-middle w-full h-fit p-3">
    <div className="flex justify-start content-center align-middle w-full h-auto mb-2">
      Enter your feedback :
    </div>
    <div>
     
      <Textarea
        label="Feeedback"
        description="Enter your feedback (max 15 words) "
        placeholder="Awesome website ..!"
        className="my-3"
        onChange={(e) => setDesc(e.target.value)}
        withAsterisk
        styles={{
          input: {
            backgroundColor: "black",
            color: "white",
            borderBottomColor: "blue",
            borderBottomWidth: "3.5px",
            borderTopColor: "black",
            borderLeftColor: "black",
            borderRightColor: "black",
          },
        }}
        error={descError}
      />
      <div className="my-3">
        <div className="flex justify-start content-center align-middle w-full text-sm font-medium">
          Rating
        </div>
        <div className="flex justify-start content-center align-middle w-full text-xs font-extralightlight my-1 text-stone-600">
          Give your rating{" "}
        </div>
        <Rating
          fractions={2}
          defaultValue={5}
          size="lg"
          onChange={(value) => setRating(Number(value))}
        />
      </div>
      
      <Button className="flex justify-center ml-[6rem] hover:scale-[1.05] hover:transition-transform align-middle content-center text-[20px] font-bold w-[50%] h-[2.5rem]"
        onClick={(e)=>handleSubmit(e)}>
        Submit
      </Button>
     
    </div>
  </div>
  </div>
  )
}

export default FeedBackform
