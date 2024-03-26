import { useEffect, useRef, useState } from "react";
import Typewriter from "../components/Typewriter";
import DOTS from 'vanta/src/vanta.dots';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Line, OrbitControls, Point, Points } from '@react-three/drei';
import { Vector3 } from "three";
import Graph from "../components/Graph";
import { pointArray } from "../points";
import { findMaxX, findMinX, findPLowerX, findPUpperX, findXMedian, kirkPatrickSeidel, returnInitStructures, returnUBstructures, upperBridge, x } from "../utils/utils";
import CustomModal from "../components/Modal";
export default function Kirkpatrick(props) {
  const params = useParams();
  const navigate = useNavigate();
  const maxMinRef = useRef({max: -2000,min:-2000})
  const xMedianRef = useRef(null)
  const structRef = useRef(null);
  const kpsRef = useRef(null);
    const pointsRef = useRef(null);
    const tRef = useRef(null);
    // const addPoint = (event)=>{
    //  console.log(event)
    //  console.log(window.innerWidth,window.innerHeight)
    //  let x = (event.clientX- window.innerWidth/2)/120
    //  let y = (window.innerHeight/2 - event.clientY)/130
    //   pointsRef.current = [...pointsRef.current,{"point": [x,y,0]}]
    //   setPoints(pointsRef.current)
    // }
    useEffect(()=>{
        pointsRef.current =  JSON.parse(window.localStorage.getItem("points"))
        const pointsArr = pointsRef.current.map((item)=>{return {x: item.point[0],y: item.point[1]}})
      let [T,pumin,pumax,plmin,plmax,median,TUpper,TLower,TLeft,TRight] = returnInitStructures(pointsArr);
      let structs = returnUBstructures(T, median);
      let [pL,pR] = [structs.pL,structs.pR]
      xMedianRef.current = median
      structRef.current = structs
      maxMinRef.current = {pumax: pumax, pumin: pumin, plmin: plmin, plmax:plmax}
      tRef.current = { "TLeft": TLeft,"Tright":TRight,"pL":pL,"pR":pR}
      const kps = kirkPatrickSeidel(pointsRef.current.map((item)=>{return {x: item.point[0],y: item.point[1]}}))
      kpsRef.current= kps
      
   
    },[])

    const [open, setOpen] = useState(true);
    const handleToggle = () => setOpen((open)=> !open);

  function handleNext(){
    navigate(`/kirkpatrickvisu/${parseInt(params.stepid)+1}`)
  }
  function handlePrev(){
    navigate(-1)
  }
  // useFrame((state) => {
  //   const { camera } = state;
  //   const diff = targetPosition.sub(camera.position);
  //   camera.position.lerp(targetPosition, easing); // Lerp for smooth transition
  // });

  return (
    <div className="visualisation">
     <div className="close" onClick={()=>navigate('/kirkpatrickvis')}>
    <p className="space-mono-regular">Restart</p>
  </div>
  <div className="next">
    <h1 className="space-mono-regular start" onClick={handleNext}>{'Next >'}</h1>
    </div>
    <div className="prev">
    <h1 className="space-mono-regular start" onClick={handlePrev}>{'< Previous'}</h1>
    </div>
    <div className="center step">
    <h1 className="space-mono-regular" onClick={handleToggle}>{open ? 'Hide Step' : 'Show Step'}</h1>
    </div>
<Canvas >
<Graph points={pointsRef} minmax={maxMinRef} step={params.stepid} kps={kpsRef} xmedian={xMedianRef} tref={tRef} structRef={structRef} key={params.stepid}/> 
   
    <OrbitControls/>
  </Canvas>
{open && <CustomModal step={params.stepid} id={0}/>}
    </div>
    
  
  );
}

// Geometry and material definitions (outside the component for reusability)

