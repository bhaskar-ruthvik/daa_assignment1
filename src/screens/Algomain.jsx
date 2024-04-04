import { Link, useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import { descs } from "../utils/descriptions";
import { useEffect, useRef, useState } from "react";
import updown from '../assets/audio/updown1.mp3'
import click from '../assets/audio/click1.mp3'


export default function AlgoMain(props){
    const [select,setSelect] = useState(0);
    const [start,setStart] = useState(false)
    const clickAudioRef = useRef()
    const updownAudioRef = useRef();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const handleNavigate = async ()=>{
        if(clickAudioRef.current) clickAudioRef.current.play();
        document.getElementById('back').classList.add('goback');
        await delay(500);
        navigate(-1);
    }
    async function handleStart(){
        setStart(true)
       clickAudioRef.current.play()
        document.getElementById('beg').classList.add('zoomed');
        await delay(500);
        navigate('/path')
    }
    async function handleVis(){
        setStart(true)
        clickAudioRef.current.play()
        document.getElementById('kpsh').classList.add('zoomed') 
         await delay(500);
            props.heading == "Kirkpatrick Seidel Algorithm" ?  navigate('/kirkpatrickvis') : navigate('/jarvisvis')

    }
    async function handleExplain(){
        setStart(true)
        clickAudioRef.current.play()
        document.getElementById('jmh').classList.add('zoomed')
         await delay(500);
         props.heading == "Kirkpatrick Seidel Algorithm" ?  navigate('/kpsdesc') : navigate('/jarvisdesc')
    }
    let navigate = useNavigate()
    function handleKeyDown(event){
        if(event.key=='Backspace'){
         handleNavigate()
        } 
        else if(event.key === 's'){
         updownAudioRef.current.pause()
         updownAudioRef.current.play()
         setSelect(1)
        }
        else if(event.key === 'w'){
         updownAudioRef.current.pause()
         updownAudioRef.current.play()
         setSelect(0)
        }
        else if(event.key=="Enter"){
            if(props.id==2){
                handleStart()
            } 
           else{
            if(select==1){
                handleVis()
            }
            if(select==0){
                handleExplain()
            }
           } 
        }
       }
       useEffect(()=>{
        clickAudioRef.current = new Audio(click)
        updownAudioRef.current = new Audio(updown)
        
        window.addEventListener('keydown',handleKeyDown)
        return () => {
          window.removeEventListener('keydown',handleKeyDown)
         }
        },[])
    return (
        <div key = {props.key}> 
           <div className='algHeading'>
           <Typewriter text={props.heading} />
           
           </div>
           <div className="space-mono-regular content">
           <span>
           {props.id == 2 ? descs[2] : props.heading === "Kirkpatrick Seidel Algorithm" ? descs[1] : descs[0]}
 </span>
           </div>
           <div className='canvas'>
        { props.id!=2 && <h3 id="kpsh" className={ select == 1 ? "space-mono-regular" : "space-mono-regular selected"} onClick={handleVis}>{"> See Step By Step"}</h3>}
        { props.id== 2 && <h3 id="beg" className="space-mono-regular start" onClick={handleStart}>{"> Begin Search for Convex Hull"}</h3>}
        { props.id!= 2 && <h3 id="jmh" className={ select == 0 ? "space-mono-regular" : "space-mono-regular selected"} onClick={handleExplain}>{"> See Explanation of the Algorithm"}</h3>}
           <h3 id="back" className="space-mono-regular " onClick={()=>navigate(-1)}>{"< Back"}</h3>
           </div>
          
           </div>
    );
}