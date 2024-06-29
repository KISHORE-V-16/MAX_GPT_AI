import React from 'react'
import { useEffect, useState,useRef } from 'react'
import logo from '../assets/logo.jpg';
import {FaMicrophone, FaArrowLeft, FaStickyNote} from 'react-icons/fa'
import PacmanLoader from 'react-spinners/DotLoader';
import Hashloader from 'react-spinners/PulseLoader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "react-circular-progressbar/dist/styles.css";
import { Button} from '@mantine/core';
import { useNavigate, useSearchParams} from 'react-router-dom';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import {styled} from 'styled-components';
import { ParticleBgnew } from '../assets/ParticleBgnew';
import Scoreprogressimage from '../Component/Scoreprogressimage';
import Scoreprogress from '../Component/Scoreprogress';
import FeedBackModel from '../Model/FeedBackModel';
import Imagedetection from '../Component/Imagedetection';
import { MultiSelect } from '@mantine/core';
import AlanAi from '../Component/AlanAi';
import axios from 'axios';
import HistoryContent from '../Component/HistoryContent';
import TextScramble from '../Component/TextScramble';

const Home_Page = () => {

    const SERVER_IP = "http://localhost:5001";

    const [selectedValues, setSelectedValues] = useState(['Text-Search']);
    const [text_msg,settxt_msg] = useState('');
    const [img_result,setimg_result ] = useState('');
    const [text_result,settext_result] = useState('');
    const [Code_txt,setcode_txt] = useState('');
    const [aicontent,setaicontent] = useState(0);
    const [video_url,setvideourl] = useState('');
    const [object_result,setobject_result] = useState([]);
    const [content,set_content] = useState([]);
    const [apply,setapply] = useState(true);
    const [imgurl,setimgurl] = useState('');
    const [historycnt,sethistorycnt] = useState(["null"]);
    const [showback,setshowback] = useState(false);
    const [tempcontent,settempcontent] = useState([]);
  
    const [searchParams] = useSearchParams();
    const useremail = searchParams.get('email');
    const username = localStorage.getItem('token'+`${useremail}`);
    const data = JSON.parse(username);
    const url = JSON.parse(username)?.token;
    

    const getCurrentDateTime = () => {
      const now = new Date();
    
      // Get the individual components of the date and time
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
      const date = String(now.getDate()).padStart(2, '0');
    
      // Format the date and time in "YYYY-MM-DD HH:mm:ss"
      return `${year}-${month}-${date}`;
    };
  
    const currenttime = () =>{
  
      const now = new Date();
  
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
  
      return `${hours}:${minutes}:${seconds}`;
    }

   
    const copyUrl = (data) => {
    navigator.clipboard.writeText(data);
    };
 
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition =new SpeechRecognition();
    recognition.interimResults=true;
    
 
    recognition.addEventListener('result',(e)=>{
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result=> result.transcript)
        settxt_msg(transcript);
  
    })
  
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
  
    const togglePlay = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
  
    const handleSeek = (e) => {
      const seekTime = e.target.value;
      setCurrentTime(seekTime);
      audioRef.current.currentTime = seekTime;
    };
  
  const Image_Generator = async (searchdata) =>{
   
    if(searchdata){
  
    await fetch(SERVER_IP+'/request/image_generator',{
  
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"extract_data":`${searchdata}`})
      }).then(response => response.json())
      .then((res_data)=>{
        if(res_data)
        {
          toast.success(" Image Query generated Successfully ...",toaststyles);
          setimg_result(res_data.replicate.items[0].image_resource_url);
        }
        else{
          toast.error("THERE IS SOME ERROR HAVE BEEN GENERATED TRY TO DO LATER.",toaststyles);
        }
      })
  
  }
  }
  

  const Text_Generator = async (searchdata) =>{
  
    if(searchdata){
  
    await fetch(SERVER_IP+'/request/text_generator',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"extract_data":`${searchdata}`})
      }).then(response => response.json())
      .then((res_data)=>{
        if(res_data)
        {
          console.log(res_data);
          toast.success("Text Query generated Successfully ...",toaststyles);
          settext_result(res_data.cohere.generated_text);
        }
        else{
          toast.error("THERE IS SOME ERROR HAVE BEEN GENERATED TRY TO DO LATER.",toaststyles);
        }
      })
  
  }
  
  }

  const Video_generator = async(searchdata) =>{
  
    if(searchdata){
  
    await fetch(SERVER_IP+'/request/audio_generator',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"extract_data":`${searchdata}`})
      }).then(response => response.json())
      .then((res_data)=>{
        if(res_data)
        {
          setvideourl(res_data.google.audio_resource_url);
          toast.success("Audio Query generated Successfully ...",toaststyles); 
        }
        else{
          toast.error("THERE IS SOME ERROR HAVE BEEN GENERATED TRY TO DO LATER.",toaststyles);
        }
      })
  
    }
  }
  
  const AI_Content_Detector = async (searchdata) =>{
  
    if(searchdata){
  
    await fetch(SERVER_IP+'/request/Ai_content_detector',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"extract_data":`${searchdata}`})
      }).then(response => response.json())
      .then((res_data)=>{
        if(res_data)
        {
          toast.success("AI Content Detector Query generated Successfully ...",toaststyles);
          console.log(res_data.sapling.ai_score);
          setaicontent(100*(res_data.sapling.ai_score));
        }
        else{
          toast.error("THERE IS SOME ERROR HAVE BEEN GENERATED TRY TO DO LATER.",toaststyles);
        }
      })
  
  }
  }

  const store_content = () =>{
      if(content.length==0 ){
        toast.warning('There is no content to save in history ... !',toaststyles);
      }
      else if(localStorage.getItem('valtxt') || localStorage.getItem('valimg')){
        toast.warning("Requested query has not fetched the result wait a minute ...!",toaststyles);
      }
      else{
        const modelhistory = {
          username:`${data.username}`,
          email:`${useremail}`,
          data:content,
          heading:content[0].msg,
          date:getCurrentDateTime(),
          time:currenttime(),
          check:showback,
        };
        const contentdata = axios.post("http://localhost:5001/request/history-save",modelhistory,{headers:{
          
            "Content-Type": "application/json",
            "token": `${url}`,
          
        }});
        contentdata.then((response)=>{
          if(!response.data.success){
            toast.error(`${response.data.message}`,toaststyles);
            
          }else{
            fetchData();
            toast.success(`${response.data.message}`,toaststyles);
          }
        })
      
      }
  }

  const search_content = () =>{
    if(text_msg && !localStorage.getItem('type') && selectedValues[0]){
        const temp = {
          _id:`${Math.floor(Math.random()*10000)}`,
            msg:text_msg,
            answer:[],
            type:selectedValues,
        };
        console.log(temp);
      localStorage.setItem('type',selectedValues.length);
        selectedValues.map((val)=>{
          if(val== "Text-Search"){
            console.log("done t");
            Text_Generator(text_msg);
          }
          else if(val== "Image-Search"){
          console.log("done i");
            Image_Generator(text_msg);
          }
          else if(val == "Text-to-Voice"){
          console.log("done text");
            Video_generator(text_msg);
          }
          else if(val== "Plagarism-Detector"){
            console.log("done p");
            AI_Content_Detector(text_msg);
          }
        })
        localStorage.setItem('valtxt',temp._id);
        set_content([...content,temp]);
    }
    else if(imgurl && !localStorage.getItem('type')){
      localStorage.setItem('type',1);
      const temp = {
        _id:`${Math.floor(Math.random()*10000)}`,
        msg:`${imgurl}`,
        answer:[],
        type:[`${selectedValues[0]}`],
    };
    localStorage.setItem('valimg',temp._id);
    set_content([...content,temp]);
    }
    else if(localStorage.getItem('type')){
      toast.warn("Other request are processing wait a minute ...",toaststyles);
    }
    else if(!selectedValues[0] && !text_msg){
      toast.warn('No options has choosen from Search Engine and no Text Message ...',toaststyles);
    }
    else if(!selectedValues[0]){
      toast.warn("No options has choosen from Search Engine ...",toaststyles);
    }
    else if(!text_msg && selectedValues[0] != "Image-Detector"){
      toast.warn("There is no text message to search ...",toaststyles);
    }
    else if(!imgurl && selectedValues[0] == "Image-Detector" )
      toast.warn("There is no image has been selected ..!",toaststyles);
  }

   // Fetch the data from Backend
   const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5001/request/userdata',{"email":useremail},{headers:{
        "Content-Type": "application/json",
        "token": `${url}`,
      }});
      console.log(response.data.success);
     if(response.data.success == false){
      sethistorycnt(["null"]);
      }else{
        sethistorycnt(response.data.historycnt);
      }
      console.log(response.data.success);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

useEffect(() => {
    fetchData();
  }, []);

  
  //TEXT-SEARCH

  useEffect(() => {
    const op = localStorage.getItem('valtxt');
  
    content.map((data)=> {
      
      if(text_msg==data.msg && op==data._id){
        data.type.map((val)=>{
          if(val=="Text-Search"  && text_result!=''){
            console.log("going good");
            data.answer.push({ty:val,result:text_result});
          }
        })
        if(data.answer?.length==data.type.length){
          localStorage.removeItem('type');
          localStorage.removeItem('valtxt');
          settxt_msg("");
        }
      }
    });
    set_content([...content]);
    settempcontent([...content]);
   
  }, [text_result]);


  //IMAGE-SEARCH

  useEffect(() => {
    const op = localStorage.getItem('valtxt');
    content.map((data)=> {
 
      if(text_msg==data.msg && op == data._id){
        console.log("image");
        data.type.map((val)=>{
          if(val=="Image-Search" && img_result!='' ){
            
            data.answer.push({ty:val,result:img_result}); 
          }
        })
        if(data.answer?.length==data.type.length){
          localStorage.removeItem('type');
          localStorage.removeItem('valtxt');
          settxt_msg("");
        }
      }
    });

    set_content([...content]);
    settempcontent([...content]);
   
  }, [img_result]);

  //TEXT-TO-VOICE

  useEffect(() => {
    const op = localStorage.getItem('valtxt');
    content.map((data)=> {
      
      if(text_msg==data.msg && op==data._id){
        data.type.map((val)=>{
          if(val=="Text-to-Voice" && video_url!=''){
            console.log(data.answer);
            data.answer.push({ty:val,result:video_url});
          }
        })
        if(data.answer?.length==data.type.length){
          localStorage.removeItem('type');
          localStorage.removeItem('valtxt');
          settxt_msg("");
        }
      }
    });
    set_content([...content]);
   settempcontent([...content]);
  }, [video_url]);

 
  //PLAGARISM-DETECTOR

  useEffect(() => {

    const op = localStorage.getItem('valtxt');
    content.map((data)=> {
     
      if(text_msg==data.msg && op==data._id){
        data.type.map((val)=>{
          if(val=="Plagarism-Detector" && aicontent!=''){
            console.log(data.answer);
            data.answer.push({ty:val,result:aicontent});
          }
        })
        if(data.answer?.length==data.type.length){
          settxt_msg("");
          localStorage.removeItem('type');
          localStorage.removeItem('valtxt');
        }
      }
    });

    set_content([...content]);
    settempcontent([...content]);
  }, [aicontent]);

  //IMAGE-DETECTOR

  useEffect(() => {
    content.map((data)=> {
     const op = localStorage.getItem('valimg');
     
      if(op==data._id){

        data.type.map((val)=>{
            console.log(val);
            if(val=="Image-Detector" && object_result?.[0]){
            console.log(object_result);
            toast.success("Query generated Successfully ...",toaststyles);
            data.answer.push({ty:val,result:object_result?.[0]});
            }
        })
      if(data.answer?.length==data.type.length){
        settxt_msg("");
        localStorage.removeItem('type');
        localStorage.removeItem('valimg');
      }
    }
    });
    set_content([...content]);
    settempcontent([...content]);
  
  }, [object_result]);
 
  const navigate1 = useNavigate();
  
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

    return (
      <>
      
      { 
        (<Home_styles>
          <AlanAi/>
      <div className="container flex flex-row h-[37.36rem] overflow-hidden">
            <ToastContainer/>
            <ParticleBgnew/>
        <div className="sub-container-1 w-[19rem] bg-black text-white border-r-[1.5px] rounded-r-[20px] shadow-[0px_0px_40px_-0px] shadow-blue-500  ">
            <header className='w-max h-max'>
              <div className="body flex w-[19rem] border-b-[1.5px] rounded-b-[20px] border-white p-[10px] justify-around items-center shadow-[0px_0px_40px_-0px] shadow-blue-500 ">
                    <div className="logo">
                        <img src={logo} alt="logo" width={"60px"} height={"50px"} className='loginButton hover:scale-[1.05] hover:transition-transform rounded-[70px]  shadow-[0px_0px_40px_-0px] shadow-blue-500 '/>
                    </div>
                    <div className="Logo-name text-[25px] font-extrabold text-blue-400" >
                        Max Gpt Ai
                    </div>
                </div>
            </header>
          <body>
           <div className="history-content w-[19rem] h-[25rem] overflow-y-auto flex flex-col gap-[10px]">
              <HistoryContent historycnt={historycnt} setcnt={set_content} setshowback={setshowback} sethistorycnt={sethistorycnt}/>
            </div>
        <div className="sub-body w-[16rem] h-[5rem]" style={{marginTop:`${3-((0.5)*selectedValues.length)}rem`}}>
        <MultiSelect
              checkIconPosition="right"
              data={[
                { value: 'Text-to-Voice', label: 'Text-to-Voice',disabled:(selectedValues.find((data)=>(data=="Image-Detector"))?.[0]) ? true : false  },
                { value: 'Plagarism-Detector', label: 'Plagarism-Detector' ,disabled:(selectedValues.find((data)=>(data=="Image-Detector"))?.[0]) ? true : false },
                { value: 'Image-Search', label: 'Image-Search',disabled:(selectedValues.find((data)=>(data=="Image-Detector"))?.[0]) ? true : false  },
                { value: 'Text-Search', label: 'Text-Search' ,disabled:(selectedValues.find((data)=>(data=="Image-Detector"))?.[0]) ? true : false },
                { value: 'Image-Detector', label: 'Image-Detector',disabled:(selectedValues.find((data)=>(data=="Text-to-Voice" || data=="Plagarism-Detector" || data=="Image-Search" || data == "Text-Search"))?.[0]) ? true : false }
              ]}
              pb={150}
              className="w-[18rem] ml-[5px] h-[5rem] font-extrabold text-[20px] rounded-3xl"
              label="Choose Your Search Engine"
              placeholder="Pick Your search Engine ..."
              value={selectedValues}
              onChange={setSelectedValues}
              styles={{
                label: {
                  color: 'lightblue',
                  fontSize: '18px',
                  fontFamily:'sans-serif',
                  fontWeight: 'bold',
                },
                input: {
                  color:'#fff',
                  fontSize:'30px',
                  backgroundColor:'#219ebc',
                  padding:'3px',
                  boxShadow:'2px 2px 40px gray',
                  borderRadius:'10px',
                  border:'2px solid white'
                },
                dropdown: {
                  color:'#fff',
                  backgroundColor:'#219ebc',
                  padding:'3px',
                  boxShadow:'2px 2px 40px gray',
                  borderRadius:'10px',
                  border:'2px solid white'
                },
              }}
              transitionProps={{ transition: 'slide-right', duration: 600 }}
            />
          </div>      
        </body>
        </div>      
            
        <div className="sub-container-2 flex flex-col backdrop-blur-3xl w-[62rem] h-50 ">
          <div className="sub-cont-2 flex flex-row justify-between mt-[1rem] mr-[1.5rem]">
           <div className="cont-1">
            {
               (showback) && <button className='w-[3rem] h-[1.5rem] bo p-4 bg-gradient-to-r from-blue-400 to-teal-400 flex ml-[10px] items-center hover:scale-[1.05] hover:transition-transform  hover:bg-gradient-to-r hover:from-teal-500  hover:to-blue-500 bg-blue-600 shadow-[0px_0px_10px_1px] shadow-blue-500 
                rounded-lg text-white text-[20px]' onClick={()=>{
                  setshowback(false);
                  set_content(tempcontent);
                }}>
                   <FaArrowLeft/>
                </button>
            }
           </div>
           <div className="cont-2">
           <header className='flex flex-row gap-[15px] items-center'>
                <button className='hover:scale-[1.05] hover:transition-transform  hover:bg-gradient-to-r hover:from-teal-500  hover:to-blue-500  bg-gradient-to-r from-blue-400 to-teal-400 w-[5rem] h-[35px] flex flex-row items-center justify-center gap-4 bg-blue-600 shadow-[0px_0px_10px_1px] shadow-blue-500 text-white font-medium rounded-xl text-[19px]' onClick={()=>{store_content();}}>
                   Save
                </button> 
                <h4 className='text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-600'>{"Hi  , "+data.username}</h4>
                <Button className='hover:text-white hover:bg-second hover:border-white text-[16px] w-[7rem] border-[2px] h-[3rem] shadow-[0px_0px_40px_-10px] shadow-blue-500 hover:scale-[1.05] hover:transition-transform' radius="md" size='md' variant='outline' bg="white" onClick={()=>logOut()}>Log Out</Button>
              </header>
           </div>
          </div>

              
           { (!content[0]) &&( <div className="sub-body h-[40rem] flex flex-col items-center justify-evenly">
                    <header>
                    <div className="logo">
                            <img src={logo} alt="logo" width={"100px"} height={"90px"} className='loginButton hover:scale-[1.05] hover:transition-transform rounded-[70px]  shadow-[0px_0px_40px_-0px] shadow-blue-500 '/>
                        </div>
                    </header>    
                    <body>
      
                        <div className="sub-content w-[40rem] h-[10rem] flex flex-row items-center gap-7">
                          
                            <div className="content-1 w-max h-[10rem] flex flex-col justify-evenly">

                            <div className="hover:scale-[1.05] hover:transition-transform bg-gray-900 flex w-[19rem] border-[1.5px]  rounded-[20px] border-white p-[18px] justify-around items-center shadow-[0px_0px_40px_-0px] shadow-blue-500 ">
                                 <div className="content text-white text-[19px]">
                                     Content Translation AI ..
                                </div>
                            </div>

                            <div className="hover:scale-[1.05] hover:transition-transform bg-gray-900 flex w-[19rem] border-[1.5px]  rounded-[20px] border-white p-[18px] justify-around items-center shadow-[0px_0px_40px_-0px] shadow-blue-500 ">
                                 <div className="content text-white text-[19px]">
                                     Prompt Image Generator ..
                                </div>
                            </div>

                            </div>
                            <div className="content-2 w-max h-[10rem] flex flex-col justify-evenly">
                              <div className="hover:scale-[1.05] hover:transition-transform bg-gray-900 flex w-[19rem] hover:translate-x-2 hover:transistion-all border-[1.5px]  rounded-[20px] border-white p-[18px] justify-around items-center shadow-[0px_0px_40px_-0px] shadow-blue-500 ">
                                 <div className="content text-white text-[19px]">
                                     Plagarism Detector ..
                                </div>
                            </div>

                            <div className="hover:scale-[1.05] hover:transition-transform bg-gray-900 flex w-[19rem] border-[1.5px]  rounded-[20px] border-white p-[18px] justify-around items-center shadow-[0px_0px_40px_-0px] shadow-blue-500 ">
                                 <div className="content text-white text-[19px]">
                                     Text to Speech conversion AI ..
                                </div>
                            </div>

                            </div>
                        </div>
                    
                    </body>
             </div>
             )
}

{
    (content[0]) && (
        <>
        <div className="sub-body hide-scrollbar w-[62rem] mb-4 mr-[2rem] p-2 h-[40rem] flex flex-col items-center justify-evenly overflow-auto ">
            <div className="content flex flex-col ">
                    {
                        ( content.map((data,index)=>{
                            return (
                                <>
                                <div className="mt-[20px] all_content flex flex-col gap-[20px] ">
                            <div className="data bg-black p-3 rounded-2xl hover:scale-[1.05] shadow-[0px_0px_10px_-0px] shadow-blue-500 hover:transition-transform flex flex-row gap-10 border-blue-800 border-[1px] w-[45rem] items-center h-max">
                            <div className="logo">
                                <img src={logo} alt="logo" width={"50px"} height={"50px"} className='rounded-[70px] shadow-[0px_0px_40px_0px] shadow-blue-500 '/>
                            </div>
                            <div className="msg text-white text-[16px] h-max w-[40rem] font-extrabold">
                                {( data.type!="Image-Detector" )&&(data.msg+" ?")}
                                {(data.type == "Image-Detector") && (<div className='flex flex-row gap-[3rem] w-max h-max items-center justify-evenly'>
                                
                                      <img src={data.msg} width={"100px"} height={"100px"} className='rounded-[20px] hover:scale-[1.05] hover:transition-transform'/>
                                  
                                  <h5 className='text-[25px] text-white font-extrabold' >Object detection ? </h5>
                                  </div>)
                                }
                            </div>
                   </div>
                   {
                    (data.answer.length != data.type.length)  &&
                      <div className='flex flex-col gap-4 items-center justify-center'>
                         <PacmanLoader className='w-[100px] h-[100px]' color="#2176c0" /> 
                         <TextScramble/>
                      </div>
                    }
                    {
                    (data.answer.length == data.type.length) && data.answer.map((val)=>(

                        <div style={{width:`${("45rem")}`,backgroundColor:`${("black")}`,borderColor: "blue" ,borderBlockWidth: ("1px")}} className="data p-3 rounded-2xl flex flex-row justify-around text-[16px] w-[45rem] font-medium items-center h-max hover:scale-[1.05] hover:transition-transform">
                        <div className="ans-content text-white ">
                          <div>
                             
                              {
                                ( val.ty =="Image-Search" ) && (<div className='w-[20rem]'><img src={val.result} width={"500px"} height={"250px"} alt="new_img" /></div>)
                              }
                              {
                                ( val.ty == "Text-Search" ) && (<div className=' md-[10px] '>{val.result}</div> )
                              }
                              {
                               ( val.ty == "Plagarism-Detector") && (<div className='md-[10px]'><Scoreprogress percentage={val.result}/></div> ) 
                              }
                              {
                                ( val.ty == "Image-Detector") && (<div className='md-[10px]'><div className='flex flex-row w-max h-max gap-[3rem]'>
                                 <Scoreprogressimage percentage={(val.result.score) * 100} result={val.result.label}/>
                                  </div></div>)
                              }
                              {
                                ( val.ty =="Text-to-Voice" ) && (<div className="all-content flex flex-row items-center gap-[50px] md-[10px] "> <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <audio
                                  ref={audioRef}
                                  src={`${val.result}`}
                                  onTimeUpdate={handleTimeUpdate}
                                />
                                <div className="flex  items-center">
                                  <button
                                    className="px-4 py-2 rounded-lg bg-blue-500 text-white mr-4"
                                    onClick={togglePlay}
                                  >
                                    {isPlaying ? 'Pause' : 'Play'}
                                  </button>
                                  <input
                                    type="range"
                                    value={currentTime}
                                    max={audioRef.current && audioRef.current.duration}
                                    onChange={handleSeek}
                                    className="flex-grow"
                                  />
                                </div>
                              </div>
                              <CopyToClipboard text={val.result}>
                              <button className='w-[8rem] h-[40px] flex flex-row items-center justify-center gap-4 border-[2px] border-white bg-blue-600 shadow-[0px_0px_40px_-10px] shadow-blue-500 hover:bg-gray-900 hover:shadow-white hover:shadow-[0px_0px_40px_-10px] text-white font-medium rounded-xl text-[19px]' onClick={()=>copyUrl(val.result)}>
                                   Copy Url
                                </button> 
                              </CopyToClipboard>  
                              </div>
                              )
                              }
                          </div>
                        </div>     
                 </div>
                      )
                      )
                    }             
                   </div>
                   </>
                      )
                      })
                       )
                    }
                   
            </div>
        </div>
        </>

    )
}   
  <div className="footer flex flex-row items-center gap-[20px]">
        <div className="card w-[50rem] h-[6rem] ml-[5rem] gap-[0.5rem] flex flex-row items-center justify-center" style={{display:"flex",flexFlow:"row",gap:"1rem"}}>
          {
            <button className='w-[3rem] h-[1.5rem] bo p-4 bg-gradient-to-r from-blue-400 to-teal-400 flex ml-[10px] items-center hover:scale-[1.05] hover:transition-transform  hover:bg-gradient-to-r hover:from-teal-500  hover:to-blue-500 bg-blue-600 shadow-[0px_0px_10px_1px] shadow-blue-500 
            rounded-lg text-white text-[20px]' onClick={()=>{set_content([]);settempcontent([]);localStorage.removeItem('type');settxt_msg("");}}>
              <FaStickyNote/>
            </button>
          }
          {
            (selectedValues[0] == "Image-Detector") ? (<div className=''><Imagedetection setobject_result={setobject_result} 
           setimgurl={setimgurl} /></div>) :( <input type='text' placeholder='     Enter Your Prompt Message .....' className=' placeholder:text-[18px] w-[40rem] rounded-2xl text-justify text-white placeholder-white bg-black h-[4rem]' value={text_msg} onChange={(e)=>{settxt_msg(e.target.value)}}></input>)
          }
         <div className="container flex flex-row justify-end gap-[2rem] w-[15rem]">
             {
              (selectedValues[0] == "Image-Detector") ? (<></>) : (<><button className='hover:scale-[1.05] hover:transition-transform w-[50px] h-[50px] flex flex-row items-center justify-center gap-4 bg-blue-600 shadow-[0px_0px_40px_-10px] shadow-blue-500 hover:bg-blue-800 hover:shadow-black hover:shadow-[0px_0px_40px_-10px] text-white font-medium rounded-xl text-[19px]' onClick={()=>{recognition.start();setTimeout(() => {recognition.stop();}, 4000);}}>
              <FaMicrophone/>
              </button></>) 
             } 
             {(localStorage.getItem('type')) ? (<button className='hover:scale-[1.05] hover:transition-transform w-[8rem] h-[50px] flex flex-row items-center justify-center gap-4 bg-blue-800 shadow-[0px_0px_40px_-10px] shadow-blue-500 hover:bg-blue-800 hover:shadow-black hover:shadow-[0px_0px_40px_-10px] text-white font-medium rounded-xl text-[19px]' onClick={()=>{search_content();}}>
                <Hashloader color="#2176c0" />
              </button> ) 
             : (<button className='hover:scale-[1.05] hover:transition-transform w-[8rem] h-[50px] flex flex-row items-center justify-center gap-4 bg-blue-600 shadow-[0px_0px_40px_-10px] shadow-blue-500 hover:bg-blue-800 hover:shadow-black hover:shadow-[0px_0px_40px_-10px] text-white font-medium rounded-xl text-[19px]' onClick={()=>{search_content();}}>
               Search
           </button> )
             }
              
         </div>
          </div>
          <div className="feedback">
        <FeedBackModel/>
          </div>
      </div>
      </div>
      </div>
  </Home_styles> ) 
} 
      </>
    )
}

const Home_styles = styled.div`
.custom-toast{
      background-color: black;
      color:white;
}
`

export default Home_Page