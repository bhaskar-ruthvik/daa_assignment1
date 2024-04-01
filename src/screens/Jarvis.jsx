import { useEffect, useRef, useState } from "react";
import Typewriter from "../components/Typewriter";
import DOTS from 'vanta/src/vanta.dots';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls, Point, Points } from '@react-three/drei';
import { Vector3 } from "three";
import Graph from "../components/Graph";
import { pointArray } from "../points";
import JarvisGraph from "../components/JarvisGraph";
import { findInitialOrigin, returnInitStructures, returnJarvisStruct, returnUBstructures } from "../utils/utils";
import CustomModal from "../components/Modal";
export default function Jarvis(props) {
  const params = useParams()
  const navigate = useNavigate();
  const step = props.step
  const [points,setPoints] = useState(pointArray)
  const [showGrid,setShowGrid] = useState(false)
  const [showAxes,setShowAxes] = useState(true)
    const pointsRef = useRef(points);
    const structRef = useRef(null);
    const addPoint = (event)=>{
     let x = (event.clientX- window.innerWidth/2)/120
     let y = (window.innerHeight/2 - event.clientY)/130
      pointsRef.current = [...pointsRef.current,{"point": [x,y,0]}]
      setPoints(pointsRef.current)
    }
    const [numSteps,setNumSteps] = useState(0)
  useEffect(()=>{
    pointsRef.current =  JSON.parse(window.localStorage.getItem("points"))
    const pointsArr = pointsRef.current.map((item)=>{return {x: item.point[0],y: item.point[1]}})
    const struct = returnJarvisStruct(pointsArr);
    setNumSteps(3+struct.hullPoints.length)
    structRef.current = {startPoint: findInitialOrigin(pointsArr),pList: struct.pList,convexHull: struct.hullPoints}
    },[])
  const [open, setOpen] = useState(true);
    const handleToggle = () => setOpen((open)=> !open);

  function handleNext(){
    navigate(`/jarvisvisu/${parseInt(params.stepid)+1}`)
  }
  function handlePrev(){
    navigate(-1)
  }

  return (

    <div className="visualisation">
     <div className="close" onClick={()=>navigate('/jarvisvis')}>
    <p className="space-mono-regular">Restart</p>
  </div>
  <div className="grid" onClick={()=>setShowGrid((val)=>!val)}>
  <p className="space-mono-regular">{showGrid? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>}  Show Grid</p>
  </div>
  <div className="axes" onClick={()=>setShowAxes((val)=>!val)}>
    <p className="space-mono-regular">{showAxes? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>} Show Axes</p>
  </div>
  <div className="skip" onClick={()=>navigate(`/jarvisvisu/${numSteps}`)}>
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
<Canvas onDoubleClick={addPoint}>
<JarvisGraph step={params.stepid} points={pointsRef} structRef={structRef} key={params.stepid} grid={showGrid} axes={showAxes}/> 

    <OrbitControls/>
  </Canvas>
  
  {open && <CustomModal step={params.stepid} key={params.stepid} id={1} structRef={structRef}/>}
    </div>
    
  
  );
}

// Geometry and material definitions (outside the component for reusability)

