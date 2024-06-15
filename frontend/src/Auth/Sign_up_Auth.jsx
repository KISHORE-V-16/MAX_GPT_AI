import React from 'react'
import logo from '../assets/logo.jpg';
import Typed from '../Component/Typed';

const Sign_up_Auth = () => {

 

  return (
    <div className="sub-cont-1 backdrop-blur-3xl bg-gradient-to-r from-teal-400  to-indigo-500 w-[50rem] h-[37.50rem] shadow-[0px_0px_40px_-0px] shadow-blue-800 rounded-r-[30px]">
    <header>

    <div className="head-cont w-max h-[15rem] flex flex-row items-center justify-start pl-[20px] gap-5 ">
        <div className="logo">
              <img src={logo} alt="logo" width={"120px"} height={"120px"} className='rounded-[70px] hover:scale-[1.05] hover:transition-transform shadow-[0px_0px_40px_-0px] shadow-blue-500 '/>
        </div>
        <span className="Logo-name text-[40px] text-gray-800 font-extrabold" >
              Max Gpt Ai
        </span>
    </div>
    </header>
        <body className='w-[35rem] font-bold h-[10rem] pl-[20px] items-center  justify-center'>
              <Typed/>
        </body>
     <footer>
        <div className="circle-cont-1 mt-[200px] ml-[-50px] ">
              <span className='w-10rem h-5rem rounded-[150px] relative bg-gradient-to-r  from-blue-700  to-gray-950  text-gray-950 p-[100px] bg-slate-950 shadow-slate-300 shadow-[0 0 -40 10]'>
                  dds
              </span>
              <span className='w-[10rem] h-[3rem] rounded-[150px] relative bg-gradient-to-r  from-blue-700  to-gray-950  text-gray-950 p-[40px] bg-slate-950 shadow-slate-300 shadow-[0 0 -40 10]'>
                  dds
              </span>
        </div>
     </footer>
</div>
  )
}

export default Sign_up_Auth;
