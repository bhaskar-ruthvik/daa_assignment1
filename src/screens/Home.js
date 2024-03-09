import { useEffect, useRef, useState } from "react";
import Typewriter from "../components/Typewriter";
import { Link, Outlet, useNavigate } from "react-router-dom";
import click from '../assets/audio/click.mp3'
import DOTS from 'vanta/src/vanta.dots';
import bg from '../assets/audio/bg.mp3'
import StartPage from "./StartPage";
export default function Home(props) {
    const [page,setPage] = useState(0)
    const [select,setSelect] = useState(0)
    const clickAudioRef = useRef()


  useEffect(()=>{
 clickAudioRef.current = new Audio(click);
    DOTS({
      el: "#body",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xB954D8,
      backgroundColor: 0x0,
      size: 5.50,
      showLines: false
    })
  },[])

  return (
    <StartPage clickSound={clickAudioRef}/>
  )
}
