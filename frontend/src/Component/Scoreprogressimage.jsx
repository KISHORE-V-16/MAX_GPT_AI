import React, { useEffect, useState } from 'react'
import {RingProgress, Text, SimpleGrid, Paper, Center, Group, rem ,Button} from  '@mantine/core';
import {FaAngry, FaRegMeh, FaRegSmileBeam} from 'react-icons/fa'

const Scoreprogressimage = ({percentage,result}) => {
   
    const [progress, setProgress] = useState(0);
    const [icon,seticon] = useState("smile");

    useEffect(() => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);
        if (currentProgress >= percentage) {
          clearInterval(interval);
        }
      }, 5); // Update every 30ms for smoother animation
      return () => clearInterval(interval);
    }, []);

    return (
        <Group className='w-max h-max items-center gap-[5rem]'>
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
          <div fw={700} size="xl" className='text-newcolor flex flex-col w-max h-max gap-[20px] items-center text-[25px] font-extrabold '>
                <FaRegSmileBeam className='w-[5rem] text-green-600 h-[5rem]'/>
                <div className="sub-cont text-[30px] text-green-700">
                    {result}
                </div>
          </div>
        </div>
      </Group>   
    )
}

export default Scoreprogressimage;
