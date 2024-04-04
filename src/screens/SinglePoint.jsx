import { useEffect, useRef, useState } from "react";
import SinglePointHull from "../components/SinglePointHull";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { isStraightX, isStraightY } from "../utils/utils";
import { Vector3 } from "three";

export default function SinglePoint(props){
    const navigate= useNavigate()
    const [showGrid,setShowGrid] = useState(false)
    const [showAxes,setShowAxes] = useState(true)
    const pointsRef = useRef(null)
    const hullRef = useRef(null)
    useEffect(()=>{
        pointsRef.current = JSON.parse(window.localStorage.getItem("points"))
        if(props.id==1){
            if(pointsRef.current.length==2){
                hullRef.current = [new Vector3(pointsRef.current[0].point[0],pointsRef.current[0].point[1],0),new Vector3(pointsRef.current[1].point[0],pointsRef.current[1].point[1],0)]
            }else{  
                const res = isStraightX(pointsRef.current.map((item)=>{return {x: item.point[0],y: item.point[1]}}))
                hullRef.current = [new Vector3(res.ymin.x,res.ymin.y,0),new Vector3(res.ymax.x,res.ymax.y,0)]
            }
        
        }
        else{
            hullRef.current= []
        }
    },[])
   return ( <div className="visualisation">
    <div className="close" >
   <p className="space-mono-regular" onClick={()=>navigate(-1)}>Restart</p>
 <p className="space-mono-regular"  onClick={()=>setShowGrid((val)=>!val)}>{showGrid? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>}  Show Grid</p>
   <p className="space-mono-regular" onClick={()=>setShowAxes((val)=>!val)}>{showAxes? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>} Show Axes</p>
 </div>
<Canvas>
<SinglePointHull id={props.id} axes={showAxes} grid={showGrid} points={pointsRef} hull={hullRef}/>
  
   <OrbitControls/>
 </Canvas>
   </div>
   
 
 );
}
