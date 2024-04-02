import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls, Point, Points } from '@react-three/drei';
import { Vector3 } from "three";
import Graph from "../components/Graph";
import { pointArray } from "../points";
import JarvisGraph from "../components/JarvisGraph";
import { convertPoints, generateRandomPoints } from "../utils/utils";
export default function Visualisation(props) {
  
  const navigate = useNavigate();
  const pointsInit = window.localStorage.getItem("points") == null ? pointArray : JSON.parse(window.localStorage.getItem("points"))
  const [points,setPoints] = useState(pointsInit)
  const [numPoints,setNumPoints] = useState(window.localStorage.getItem("points") == null ? 0 : JSON.parse(window.localStorage.getItem("points")).length)
  const [hovIdx,setHovIdx] = useState(0)
    const pointsRef = useRef(points);
    const structRef = useRef(null);
    const addPoint = (event)=>{
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
  function handleRandom(){
    const points = generateRandomPoints(numPoints)
    window.localStorage.setItem("points",JSON.stringify(points));
    navigate(0)
  }
  function handleIp(e){
    if(e.target.value == "" || parseInt(e.target.value) == NaN){
      setNumPoints(0)
    } 
    else{
      setNumPoints(parseInt(e.target.value))
    }
  }
  function handleUpload(e){
    const file = e.target.files[e.target.files.length-1]
    const splits = file.name.split(".")
    const extension = splits[splits.length-1] 
    if(extension!="txt") return;
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
     window.localStorage.setItem("points",text);
    };
    reader.readAsText(file)
    navigate(0)
  }
  // useEffect(()=>{

  // })
  // useFrame((state) => {
  //   const { camera } = state;
  //   const diff = targetPosition.sub(camera.position);
  //   camera.position.lerp(targetPosition, easing); // Lerp for smooth transition
  // });

  return (
    <div className="visualisation">
     <div className="close" >
    <p className="space-mono-regular" onClick={()=>navigate('/')}>X close</p>
  <p className="space-mono-regular"  onClick={()=>setShowGrid((val)=>!val)}>{showGrid? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>}  Show Grid</p>
    <p className="space-mono-regular" onClick={()=>setShowAxes((val)=>!val)}>{showAxes? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>} Show Axes</p>
    <p className="space-mono-regular" onClick={() => {window.localStorage.setItem("points",JSON.stringify(pointArray));navigate(0)}}>Clear Points</p>
  </div>
  <div className="prev random" onClick={handleRandom}>
    <p className={hovIdx == 0 ? "space-mono-regular start" :"space-mono-bold"} onMouseOver={()=>setHovIdx(0)}>Generate Random Points</p>
  </div>
  <div className="prev label">
  <p className="space-mono-regular">Number of Points:</p>
  </div>
  <div className="prev slider">
  <input type="text" className="textip" onChange={handleIp} value={numPoints} id="ipbox"></input>
  </div>
  <div className="prev upload" >
  <label for="fileip" className={hovIdx == 1 ? "space-mono-regular start" :"space-mono-bold"} onMouseOver={()=>setHovIdx(1)}>Or Upload File (.txt)</label>
  <input type="file" className="fileip" id="fileip" onChange={handleUpload}></input>
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

