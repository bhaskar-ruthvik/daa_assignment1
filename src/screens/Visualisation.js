import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls, Point, Points } from '@react-three/drei';
import { Vector3 } from "three";
import Graph from "../components/Graph";
import { pointArray } from "../points";
import JarvisGraph from "../components/JarvisGraph";
export default function Visualisation(props) {
  
  const navigate = useNavigate();
  const pointsInit = window.localStorage.getItem("points") == null ? pointArray : JSON.parse(window.localStorage.getItem("points"))
  const [points,setPoints] = useState(pointsInit)
    const pointsRef = useRef(points);
    const structRef = useRef(null);
    const addPoint = (event)=>{
     console.log(event)
     console.log(window.innerWidth,window.innerHeight)
     let x = (event.clientX- window.innerWidth/2)/120
     let y = (window.innerHeight/2 - event.clientY)/130
      pointsRef.current = [...pointsRef.current,{"point": [x,y,0]}]
      setPoints(pointsRef.current)
    }
    const [showGrid,setShowGrid] = useState(false)
    const [showAxes,setShowAxes] = useState(true)
  function handleStart(){
    window.localStorage.setItem("points",JSON.stringify(pointsRef.current))
   if(props.id!=null && props.id==1){navigate('/jarvisvisu/1')} 
   else {navigate('/kirkpatrickvisu/1')}
  }
  // useFrame((state) => {
  //   const { camera } = state;
  //   const diff = targetPosition.sub(camera.position);
  //   camera.position.lerp(targetPosition, easing); // Lerp for smooth transition
  // });

  return (
    <div className="visualisation">
     <div className="close" onClick={()=>navigate('/')}>
    <p className="space-mono-regular">X close</p>
  </div>
  <div className="grid" onClick={()=>setShowGrid((val)=>!val)}>
  <p className="space-mono-regular">{showGrid? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>}  Show Grid</p>
  </div>
  <div className="axes" onClick={()=>setShowAxes((val)=>!val)}>
    <p className="space-mono-regular">{showAxes? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>} Show Axes</p>
  </div>
  <div className="next" onClick={() => {window.localStorage.setItem("points",JSON.stringify(pointArray));navigate(0)}}>
    <p className="space-mono-regular">Clear Points</p>
  </div>
  <div className="center">
    <h1 className="space-mono-regular start" onClick={handleStart}>Start Visualisation</h1>
    </div>
<Canvas onDoubleClick={addPoint}>

{(props.id!=null && props.id==1) ? <JarvisGraph points={pointsRef} step={0} structRef={structRef} grid={showGrid} axes={showAxes}/> : <Graph points={pointsRef} step={0} structRef={structRef} axes={showAxes} grid={showGrid}/>}

    <OrbitControls/>
  </Canvas>
  
   
    </div>
    
  
  );
}

// Geometry and material definitions (outside the component for reusability)

