import { useEffect, useRef, useState } from "react";
import Typewriter from "./components/Typewriter";
import DOTS from 'vanta/src/vanta.dots';
import { Link, useNavigate } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls, Point, Points } from '@react-three/drei';
import { PointsMaterial, SphereGeometry, Vector3 } from "three";
import { CustomPoint } from "./components/Point";
import {pointArray} from './points';
export default function Visualisation(props) {
  const [points,setPoints] = useState(pointArray)
  const navigate = useNavigate();
  const pointsRef = useRef(points);
  const addPoint = (event)=>{
   console.log(event)
    let x = (event.clientX-window.innerWidth/2)/110
    let y = (window.innerHeight/2 -20 - event.clientY)/115
    pointsRef.current = [...pointsRef.current,{"point": [x,y,0]}]
    setPoints(pointsRef.current)
  }
  // useEffect(()=>{
  //   window.addEventListener('click',addPoint)
  //   return ()=>{
  //     window.removeEventListener('click',addPoint)
  //   }
  // },[])
  // useFrame(() => {
  //   // Update animation or logic here
  // });

  return (
    <div className="visualisation">
     <div className="close" onClick={()=>navigate(-1)}>
    <p className="space-mono-regular">X close</p>
  </div>
<Canvas onDoubleClick={addPoint} camera={{fov: 45,near: 1, far: 1000,position: [0,0,10]}}>
    <ambientLight intensity={1} position={[0,20,0]}/>
    <gridHelper args={[20,20]} rotation={[Math.PI/2,0,0]}/>
    
    <ambientLight  position={[0,0,0]} />
    {points.map((point,index)=>{ return <CustomPoint key={index} position={point.point}/>})}
    <mesh>
      <Line points = {[new Vector3(2,1,0),new Vector3(1,2,0)]} lineWidth={5} color={'cyan'}/>
      <Line points={[new Vector3(-10,0,),new Vector3(10,0,0)]} lineWidth={5}/>
      <Line points={[new Vector3(0,-10,0),new Vector3(0,10,0)]} lineWidth={5}/>
      <lineBasicMaterial linewidth={10} />
    </mesh>
    <OrbitControls/>
  </Canvas>
 
    </div>
    
  
  );
}

// Geometry and material definitions (outside the component for reusability)

