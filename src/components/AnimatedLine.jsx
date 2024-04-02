import { Line } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState } from "react"
import { Vector3 } from "three"

export default function AnimatedLine(props){
    const start = props.points[0]
    const end = props.points[1]
    const speed = props.speed == null ? 1: props.speed
    const [target,setTarget] = useState(props.points[0])
    const [animate,setAnimate]= useState(true)
    const slope = (start.y - end.y) /(start.x - end.x) 
    const c= start.y - slope* start.x
    useFrame(()=>{
        const direction = (target.x - end.x) > 0 ? -1 : (target.x-end.x)==0 ? Math.sign((end.y-start.y)) : 1
            if(animate){
                if((start.x != end.x)){
                    setTarget((value)=>new Vector3(value.x+0.01*speed*direction,slope*(value.x+0.01*speed*direction)+c,0))
                    if( (target.x-end.x)*direction>= 0){
                        setTarget(end)
                        setAnimate(false)
                    }
                }
                else{
                    setTarget((value)=>new Vector3(value.x,value.y+0.01*direction*speed,0))
                    if((target.y-end.y)*direction>= 0){
                        setTarget(end)
                        setAnimate(false)
                    }
                }
            }
           
    
       
    })
    return(<group>
  {props.glow!=null &&  <Line points = {[props.points[0],target]} lineWidth={props.lineWidth+4} color={'magenta'}/>}
    <Line points = {[props.points[0],target]} lineWidth={props.lineWidth} color={props.color}/>
    
    </group>
    )
}