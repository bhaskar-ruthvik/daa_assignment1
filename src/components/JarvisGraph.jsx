import { Box, Line, Sphere, Text, TorusKnot, shaderMaterial } from "@react-three/drei";
import { BoxGeometry, Vector3 } from "three";
import CustomPoint from "./Point";
import {pointArray} from '../points';
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import AnimatedLine from "./AnimatedLine";
import SmallPoint from "./SmallPoint";

export default function JarvisGraph(props){
    const pointsRef = props.points;
    const [animate,setAnimate] = useState(true)
    const structRef = props.step == 0 ? {} : props.structRef 
    const [angle,setAngle] = useState(0)
    const [start,setStart] = useState(props.step<2 ? new Vector3(0,0,0) :( props.step==2 ? new Vector3(structRef.current.startPoint.x,structRef.current.startPoint.y,0) : (props.step<3+structRef.current.convexHull.length ? new Vector3(structRef.current.convexHull[props.step-3].x,structRef.current.convexHull[props.step-3].y,0): new Vector3(0,0,0))))
    const [end,setEnd] =useState((props.step<2 ||(props.step>=2 && structRef.current!=null && props.step >= 2+structRef.current.convexHull.length)) ? new Vector3(0,0,0) : new Vector3(structRef.current.convexHull[props.step-2].x,structRef.current.convexHull[props.step-2].y,0))
    const dir = end.sub(start)
    const [ang,setAng] = useState(dir.y < 0 ? 2* Math.PI - dir.angleTo(new Vector3(1,0,0)) : dir.angleTo(new Vector3(1,0,0)))
    const showGrid = props.grid == null ? false : props.grid
    const showAxes = props.axes == null ? true : props.axes
    const [flag,setFlag]= useState(true)
   
    const findIndex = (point)=>{
        if(props.step<3) return -1;
        
        let idx = -1;
        structRef.current.convexHull.forEach((item,index)=>{
            if(point[0]==item.x && point[1] == item.y) idx = index
        })
        return idx== -1 ? 10000 : idx
    }
    const filterPoints = (point,index)=>{
        if(props.step>2 && props.step<=3+structRef.current.convexHull.length){
            const idx = findIndex(point.point)
            if(idx<=props.step-3){
                return <CustomPoint key={index} index={index} position={point.point} color={'red'}/>
            }
        }
        
            return  <CustomPoint key={index} index={index} position={point.point} color={'#c467f0'}/>
    
         
    }
   useEffect(()=>{
                setAnimate(true)

            },[])
            useFrame(()=>{
                if(flag && props.step>=2 && props.step==structRef.current.convexHull.length+2){
                    const tempStart = new Vector3(structRef.current.convexHull[structRef.current.convexHull.length-1].x,structRef.current.convexHull[structRef.current.convexHull.length-1].y,0)
                    const tempEnd= new Vector3(structRef.current.convexHull[0].x,structRef.current.convexHull[0].y,0)
                    const tempDir = tempEnd.sub(tempStart)
                    tempDir.y < 0 ? setAng(2* Math.PI - tempDir.angleTo(new Vector3(1,0,0))): setAng(tempDir.angleTo(new Vector3(1,0,0)))
                    setFlag(false)
                }
        
                if(props.step>=2 && props.step<structRef.current.convexHull.length+3 && angle<=ang){
                    setAngle((angle)=>angle+0.005)
                    
                }
                
            
     
            })
    return (
<group>
{showGrid && <gridHelper args={[100,100]} rotation={[Math.PI/2,0,0]}/>}
<pointLight position={[0, 0, 20]} intensity={1000} color={'white'}/>
     {(props.step<=20211345 && pointsRef.current.length<=1000) && pointsRef.current.map((point,index)=>filterPoints(point,index))}
     {((props.step==0 && pointsRef.current.length>1000) || props.step>20211345) && pointsRef.current.map((point,index)=>{return <SmallPoint key={index} index={index} position={point.point} color={'#c467f0'}/>})}
   {props.step>0 && props.step<=2 &&  <CustomPoint key={202} index={202} position={new Vector3(structRef.current.startPoint.x,structRef.current.startPoint.y,0)} color={'yellow'} /> }
   {props.step==1 || props.step==2 && <Text position={[structRef.current.startPoint.x-0.2,structRef.current.startPoint.y-0.2,0.1]} fontSize={0.2}>O_init</Text> }
   <mesh>

     {props.step == 2 && <Line points={[new Vector3(structRef.current.startPoint.x,structRef.current.startPoint.y,0), new Vector3(structRef.current.startPoint.x+20*Math.cos(angle),structRef.current.startPoint.y+20*Math.sin(angle),0)]} lineWidth={5} color={'white'} /> }
     {props.step >= 3 && props.step<3+structRef.current.convexHull.length && <Line points={[new Vector3(structRef.current.convexHull[props.step-3].x,structRef.current.convexHull[props.step-3].y,0), new Vector3(structRef.current.convexHull[props.step-3].x+20*Math.cos(angle),structRef.current.convexHull[props.step-3].y+20*Math.sin(angle),0)]} lineWidth={5} color={'white'} /> }
      {props.step>=2 && props.step>=3+structRef.current.convexHull.length && props.step<=20211345 && structRef.current.convexHull.map((item,index)=>{return (pointsRef.current.length <= 10 ? <AnimatedLine key={index} points={[new Vector3(item.x,item.y,0),new Vector3(structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].x,structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].y,0)]} lineWidth={5} glow={true}/> : <group><Line key={index} points={[new Vector3(item.x,item.y,0),new Vector3(structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].x,structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].y,0)]} lineWidth={9} color={'magenta'} /><Line key={index} points={[new Vector3(item.x,item.y,0),new Vector3(structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].x,structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].y,0)]} lineWidth={5} /></group>)})}
        {props.step>20211345 && structRef.current.convexHull.map((item,index)=>{return <group><Line key={index} points={[new Vector3(item.x,item.y,0),new Vector3(structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].x,structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].y,0)]} lineWidth={6} color={'magenta'} /><Line key={index} points={[new Vector3(item.x,item.y,0),new Vector3(structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].x,structRef.current.convexHull[(index+1)%structRef.current.convexHull.length].y,0)]} lineWidth={2} /></group>})}    
        {showAxes && <Line points={[new Vector3(-50,0,0),new Vector3(50,0,0)]} lineWidth={2} />}
   {showAxes && <Line points={[new Vector3(0,-50,0),new Vector3(0,50,0)]} lineWidth={2} />}
  <lineBasicMaterial/>
  </mesh>
</group>
    );
}