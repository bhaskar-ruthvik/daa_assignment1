import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Graph from "../components/Graph";
import {  kirkPatrickSeidel, lowerHull, returnInitStructures, returnUBstructures, upperHull } from "../utils/utils";
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
      let structs = returnUBstructures(TUpper, median);
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
  return (
    <div className="visualisation">
     <div className="close" >
    <p className="space-mono-regular" onClick={()=>navigate('/kirkpatrickvis')}>Restart</p>
  <p className="space-mono-regular"  onClick={()=>setShowGrid((val)=>!val)}>{showGrid? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>}  Show Grid</p>
    <p className="space-mono-regular" onClick={()=>setShowAxes((val)=>!val)}>{showAxes? <i class="fas fa-check-square"></i> : <i class="fa-solid fa-square-xmark"></i>} Show Axes</p>
  <p className="space-mono-regular start" onClick={()=>navigate(`/kirkpatrickvisu/${numSteps}`)}>{'Skip to Hull >>'}</p>
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
<Canvas>
<Graph points={pointsRef} minmax={maxMinRef} step={params.stepid} kps={kpsRef} xmedian={xMedianRef} tref={tRef} structRef={structRef} key={params.stepid}  grid={showGrid} axes={showAxes}/> 
   
    <OrbitControls/>
  </Canvas>
{open && <CustomModal step={params.stepid} id={0} dpRef={dp}/>}
    </div>
    
  
  );
}

// Geometry and material definitions (outside the component for reusability)

