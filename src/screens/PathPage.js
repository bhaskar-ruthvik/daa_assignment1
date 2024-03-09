import { useEffect, useRef, useState } from "react";
import Typewriter from "../components/Typewriter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import updown from '../assets/audio/updown.mp3'

export default function PathPage(props){
    const [select,setSelect] = useState(0);
    const navigate = useNavigate();
    const clickAudioRef = useRef()
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const handleNavigate = async ()=>{
        if(clickAudioRef.current) clickAudioRef.current.play();
        document.getElementById('backButton').classList.add('goback');
        await delay(500);
        navigate(-1);
    };
    
    function handleSelect(e){
        if(e.target.id == 'kps') setSelect(1)
        else setSelect(0)
      }
      useEffect(()=>{
      clickAudioRef.current = new Audio(updown)

      window.addEventListener('keydown',(event)=>{
        console.log(event.key)
       if(event.key=='Backspace'){
        handleNavigate()
       } 
       else if(event.key === 's'){
        clickAudioRef.current.play()
        setSelect(1)
       }
       else if(event.key === 'w'){
        clickAudioRef.current.play()
        setSelect(0)
       }
      })
      },[])
    return (
        <div {...props}> 
        <div className='pathPage'>
        <Typewriter text="Choose a path" />
        </div>
        <div className='canvas'>
        <Link to='/jarvis' style={{textDecoration: 'none',color:'inherit'}}>
        <h1 key="0" id="jm" className={select == 1 ? "space-mono-regular" : "space-mono-regular selected"} onMouseOver={handleSelect}>{"> Jarvis March Algorithm"}</h1>
           </Link>
           <Link to='/kirkpatrick' style={{textDecoration: 'none',color:'inherit'}}>
           <h1 key="1" id="kps" className={ select == 0 ? "space-mono-regular" : "space-mono-regular selected"} onMouseOver={handleSelect}>{"> Kirkpatrick Seidel Algorithm"}</h1>
          </Link>
       
          <h3 className="space-mono-regular back" onClick={handleNavigate} id="backButton">{"< Back"}</h3>
        </div>
       
        </div>
    );
}