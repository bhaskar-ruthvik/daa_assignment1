import { Link, useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import { useEffect, useRef, useState } from "react";
import { pointArray } from "../points";

export default function StartPage(props){
   const [start,setStart] = useState(false)
   const navigate = useNavigate()
    const [mute,setMute]= useState(true)
    function handleMute(){
      if(!mute){
        
        // document.getElementById('bgm').src = '';
        document.getElementById('bgm').pause()
        setMute(true)
      }else{
        // document.getElementById('bgm').src = './audio/bg.mp3';
        document.getElementById('bgm').play()
        setMute(false)
      }
      

    }
    const delay = ms => new Promise(res => setTimeout(res, ms));
    async function handleStart(){
        setStart(true)
        props.clickSound.current.play()
        // document.getElementById('startButton').classList.remove('start');
        document.getElementById('startButton').classList.add('zoomed');
        await delay(500);
        navigate('/convexdef')
    }
    useEffect(()=>{
      if(window.localStorage.getItem("points")==null) window.localStorage.setItem("points",JSON.stringify(pointArray))
        if(!mute){
            document.getElementById('bgm').play()
        }
       
      
        
            const handleKeyDown = (event) => {
              if (event.key === 'Enter') {
                handleStart()
              }
            };
        
            window.addEventListener('keydown', handleKeyDown);

            return () => {
              window.removeEventListener('keydown', handleKeyDown);
            };
       
    },[])
    
    return (
        <div>
        <div className="mute" onClick={handleMute}>
           {!mute ?  <p className="space-mono-regular"><i className="fa-solid fa-volume-high"/> Sound On</p> : <p className="space-mono-regular"><i className="fa-solid fa-volume-off" /> Sound Off</p>}
        </div>
        <div> 
           <div className='heading'>
           <Typewriter text="Convex Hull Visualisation" />
           </div>
           <div className='canvas'>
           {/* <Link to='/path' style={{textDecoration: 'none', color:'inherit'}}> */}
           <h1 className="space-mono-regular start" onClick={handleStart} id="startButton">{!start ? "> Press Enter to Start" : "<Start>"}</h1>
           {/* </Link> */}
         
           </div>
          <div>
            <a href="https://www.github.com/bhaskar-ruthvik" className="space-mono-regular" target="_blank" style={{color: "inherit"}}><p  style={{textAlign: "center"}}>Link to Documentation</p></a>
          </div>
           </div>
      
       </div>
    );
}