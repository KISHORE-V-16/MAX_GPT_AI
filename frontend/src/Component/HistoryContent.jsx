import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast,Bounce } from 'react-toastify';


const HistoryContent = ({historycnt,setcnt,setshowback,sethistorycnt}) => {

  const [searchParams] = useSearchParams();
  const useremail = searchParams.get('email');
    const valuser = localStorage.getItem('token'+`${useremail}`);
    const url = JSON.parse(valuser).token;

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

  const Remove_data = async (id) =>{

    const response = await axios.post('http://localhost:5001/request/removedata',{"id":id},{headers:{
      "Content-Type": "application/json",
      "token": `${url}`,
    }});
    if(response.data.success){
      fetchData();
     toast.success("Data as been Deleted Succesfully ..!",toaststyles);
    }
    else{
      toast.error(`${response.data.message}`,toaststyles);
    }
  }

  const checkstatus = (history) =>{

      if(localStorage.getItem('type')){
        toast.warn("query is being processing after that u can go to history wait a min ..!",toaststyles);
      }
      else{
        setshowback(true);
        setcnt(history);
      }
  }
    
    // Fetch the data from Backend
   const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5001/request/userdata',{"email":useremail},{headers:{
        "Content-Type": "application/json",
        "token": `${url}`,
      }});
      sethistorycnt(response.data.historycnt);

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className='flex flex-col gap-[10px] justify-start items-center'>
        <h3 className='text-[23px] ml-[10px] mt-[10px] font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600 '>History </h3>
        {
            (!historycnt[0]) ? (<div className="text-[14px] font-extrabold text-gray-200 ">No Content has been Saved ...</div>) : ( <div className="sub-history overflow-y-visible flex flex-col gap-[0.5rem] items-center ">
                {
                    historycnt.map((userdata)=>{
                        return (
                          <div className='flex flex-row gap-2 items-center '>
                            <button className='h-max p-[5px] w-[16rem] border-[2px]
                                hover:bg-gradient-to-r hover:from-indigo-500  hover:to-teal-400 hover:scale-[1.02] hover:transition-all border-white rounded-[10px] bg-gradient-to-r from-teal-400  to-indigo-500
                                 shadow-blue-500 shadow-[0px_0px_10px_1px] text-bold font-sans' onClick={()=>{checkstatus(userdata.history);}}>
                                  <div className="sub-hold flex flex-row justify-between">
                                      <div className="font-extrabold text-[16px] flex flex-col gap-1">
                                        {userdata.heads}
                                      </div> 
                                      
                                  </div>
                                  <div className="date text-black text-[10px] flex items-start justify-end">
                                    {userdata.date}
                                  </div>
                            </button>
                          <button className="font-extrabold hover:text-red-500 text-[25px] flex flex-col gap-1" onClick={()=>{Remove_data(userdata._id)}}>
                                      <FaTrash/>
                            </button> 
                          </div>
                        )
                    })
                }
            </div>) 
        }
        
    </div>
  )
}

export default HistoryContent
