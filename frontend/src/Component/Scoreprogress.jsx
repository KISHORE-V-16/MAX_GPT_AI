import React, { useEffect, useState } from 'react'
import {RingProgress, Text, SimpleGrid, Paper, Center, Group, rem ,Button} from  '@mantine/core';
import {FaAngry, FaRegMeh, FaRegSmileBeam} from 'react-icons/fa'

const Scoreprogress = ({percentage}) => {
    const [progress, setProgress] = useState(0);
    const [text,settext] = useState("you are likely needed to change the content ");
    const [icon,seticon] = useState("");
   
    useEffect(()=>{
        if(percentage>50){
            settext("Mostly written by Ai and probably You must need to change the content  ...");
            seticon("angry");
        }
        else if(percentage==50){
          seticon("neutral");
            settext("Mostly written by Human and Ai ....");
        }
        else{
          seticon("smile");
            settext("Mostly written by Human ....");
        }
        console.log(icon,"GOOOD ");
    },[percentage]);

    useEffect(() => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress%100);
        if (currentProgress >= percentage) {
          clearInterval(interval);
        }
      }, 5); // Update every 30ms for smoother animation
  
      return () => clearInterval(interval);
    }, []);

    return (
        <Group className='w-max h-max items-center'>
        <RingProgress
          size={180}
          roundCaps
          thickness={15}
          sections={[{ value: progress, color: 'blue' }]}
          label={
            <Center>
        <Text fw={700} size="xl" className='text-newcolor text-[29px] font-extrabold '>
            {progress+'%'}
          </Text>
              
            </Center>
          }
        />

        <div>
          <Text c="dimmed" size="xl" tt="uppercase" className='text-[25px] ml-[20px] pb-[15px]' fw={700}>
            Ai Content Detector
          </Text>
          <div fw={700} size="xl" className='text-newcolor flex flex-row gap-5 items-center text-[19px] w-[30rem] h-[5rem] font-extrabold '>
          {
            (icon== "angry") && (<FaAngry className='w-[5rem] text-red-600 h-[5rem]'/>)
          }
          {
            (icon== "neutral") && (<FaRegMeh className='w-[5rem] text-yellow-600 h-[5rem]'/>)
          }
          {
            (icon== "smile") && (<FaRegSmileBeam className='w-[5rem] text-green-600 h-[5rem]'/>)
          }
          {text}
          </div>
        </div>
      </Group>   
    )
}

export default Scoreprogress
