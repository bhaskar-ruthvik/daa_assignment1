import { useEffect, useRef, useState } from "react";
import Typewriter from "../components/Typewriter";
import DOTS from 'vanta/src/vanta.dots';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Line, OrbitControls, Point, Points } from '@react-three/drei';
import { Vector3 } from "three";
import Graph from "../components/Graph";
import { pointArray } from "../points";
import { findMaxX, findMinX, findPLowerX, findPUpperX, findXMedian, kirkPatrickSeidel, lowerHull, returnInitStructures, returnUBstructures, upperBridge, upperHull, x } from "../utils/utils";
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
    const [showGrid,setShowGrid] = useState(false)
    const [showAxes,setShowAxes] = useState(true)
    const [numSteps,setNumSteps] = useState(0)
    const initDp = (pairs) => {
      const dp =[]
      if(params.stepid==0) return [];
      else{
          pairs.forEach((item,index)=>{
              if(index == 0) dp.push(item.length + 4)
              else dp.push(item.length+4)
          })
          dp.forEach((item,index)=>{
              if(index!=0){
                  dp[index] += dp[index-1]
              }
          })
      }
      
      return dp;
  }
const [dp,setDp] = useState([])
    useEffect(()=>{
        pointsRef.current =  JSON.parse(window.localStorage.getItem("points"))
        const pointsArr = pointsRef.current.map((item)=>{return {x: item.point[0],y: item.point[1]}})
      let [T,pumin,pumax,plmin,plmax,median,TUpper,TLower,TLeft,TRight] = returnInitStructures(pointsArr);
      let structs = returnUBstructures(T, median);
      let [pL,pR] = [structs.pL,structs.pR]
      let upperHullPoints = upperHull(pumin,pumax,TUpper)
      let lowerHullPoints = lowerHull(plmin,plmax,TLower)
      xMedianRef.current = median
      structRef.current = structs
      maxMinRef.current = {pumax: pumax, pumin: pumin, plmin: plmin, plmax:plmax}
      let sum = 7
      structs.pairs.forEach((item)=> sum+=(item.length+4))
      setNumSteps(sum)
      tRef.current = { "TLeft": TLeft,"Tright":TRight,"pL":pL,"pR":pR,"uh": upperHullPoints,"lh":lowerHullPoints}
      const kps = kirkPatrickSeidel(pointsRef.current.map((item)=>{return {x: item.point[0],y: item.point[1]}}))
      kpsRef.current= kps
      setDp([...initDp(structs.pairs)])
      
   
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
  <div className="grid" onClick={()=>setShowGrid((val)=>!val)}>
  <p className="space-mono-regular">{showGrid? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>}  Show Grid</p>
  </div>
  <div className="axes" onClick={()=>setShowAxes((val)=>!val)}>
    <p className="space-mono-regular">{showAxes? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>} Show Axes</p>
  </div>
  <div className="skip" onClick={()=>navigate(`/kirkpatrickvisu/${numSteps}`)}>
  <p className="space-mono-regular start">{'Skip to Hull >>'}</p>
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
<Graph points={pointsRef} minmax={maxMinRef} step={params.stepid} kps={kpsRef} xmedian={xMedianRef} tref={tRef} structRef={structRef} key={params.stepid}  grid={showGrid} axes={showAxes}/> 
   
    <OrbitControls/>
  </Canvas>
{open && <CustomModal step={params.stepid} id={0} dpRef={dp}/>}
    </div>
    
  
  );
}

// Geometry and material definitions (outside the component for reusability)

