import React, { useState } from 'react'
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import FeedBackform from './FeedBackform';
import {FaCommentAlt} from 'react-icons/fa';

const FeedBackModel = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
   
<Modal
          opened={opened}
          onClose={close}
          title="FeedBack About UI & UX .."
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 7,
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
        
       <FeedBackform close={close}/> 
        
      </Modal>
      <div className="relative">
      {isHovered && (
        <div className="absolute  bottom-5 w-60 p-2 bg-gradient-to-r from-teal-300  to-indigo-500 left-[-172px] bg-gray-100 border-[2px] border-blue-500 rounded-xl shadow-lg">
           <p className="text-white font-extrabold font-sans">Would you like to give a FeedBack to our website ...</p>
        </div>
      )}
      </div>

      <Button onClick={open}  onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}  className='loginButton hover:scale-[1.05] hover:transition-transform w-[4rem] hover:text-white hover:bg-second hover:border-white rounded-3xl h-[4rem] flex flex-row items-center justify-center gap-4 bg-white border-blue-500 border-[2px] shadow-[0px_0px_40px_-10px] shadow-blue-500 hover:shadow-[0px_0px_40px_-10px] text-newcolor font-medium text-[35px]'>
        <FaCommentAlt/>           
      </Button>
    </div>
  )
}

export default FeedBackModel
