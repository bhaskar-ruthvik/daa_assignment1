import { Line, Text } from "@react-three/drei";
import { Vector3 } from "three";
import { CustomPoint } from "./Point";
import {pointArray} from '../points';
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function Graph(props){
    const pointsRef = props.points;
    const maxMinRef = props.step == 0? {} :props.minmax
    const xMedianRef = props.step < 2 ? -2 : props.xmedian.current 
    const structRef = props.step == 0 ? {} : props.structRef
    const kpsRef = props.step == 0 ? {} : props.kps
    const [animate,setAnimate] = useState(true)
    const [position,setPosition] = useState(5)
    const [pos2,setPos2] = useState(5)
    const textMinRef = useRef(null)
    const textMaxRef = useRef(null)
    const {camera} = useThree()
    const tRef = props.step==0 ? [] : props.tref
    const [ubiters,setUBIters] = useState(props.step == 0 ? 0 : structRef.current.candidates.length)
 
    const initDp = () => {
        const dp =[]
        if(props.step==0) return [];
        else{
            structRef.current.pairs.forEach((item,index)=>{
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
    const dp = initDp();
   const returnIndex = (dp,step) => {
    let idx = -1;
    if(dp.length==0) return 0;
    if(step<=dp[0]) return 0;
    dp.forEach((item,index)=>{
        if(step<=dp[index] && step>dp[index-1]){
            idx = index;
        }
    })
    return idx == -1 ? dp.length-1 : idx
   }

    const [iterIndex, setIterIndex]  = useState(props.step <= 4 ? 0 : returnIndex(dp,props.step))
    const [pairsLen,setPairLen] = useState(props.step ==0 ? 0 : structRef.current.pairs[iterIndex].length)
    const [target,setTarget] = useState(props.step == 0? 0 : new Vector3(tRef.current.pL.x,tRef.current.pL.y,0)) 
    const colors = ['#00aaff','#01dafa','pink','blue','green','yellow','orange','#aa00ff']
    const filterMaxMin = (point,index)=>{
        if((point.point[0] == maxMinRef.current.pumax.x && point.point[1] == maxMinRef.current.pumax.y)|| (point.point[0] == maxMinRef.current.pumin.x && point.point[1] == maxMinRef.current.pumin.y)){
            return <CustomPoint key={index} index={index} position={point.point} glow={true} color={'red'}/>
        }
            else{
            return <CustomPoint key={index} index={index} position={point.point} color={'#c467f0'}/>}
            }
    const filterMaxMinUB = (point,index)=>{
        if((point.point[0] == maxMinRef.current.pumax.x && point.point[1] == maxMinRef.current.pumax.y)|| (point.point[0] == maxMinRef.current.pumin.x && point.point[1] == maxMinRef.current.pumin.y)|| (point.point[0]===tRef.current.pL.x && point.point[1]===tRef.current.pL.y)|| (point.point[0]===tRef.current.pR.x && point.point[1] === tRef.current.pR.y)){
            return <CustomPoint key={index} index={index} position={point.point} color={'red'}/>
        }
            else{
            return <CustomPoint key={index} index={index} position={point.point} color={'#c467f0'}/>}
            }
    const findPoint = (point, arr)=>{
        const res = arr.filter((item)=>{
            return item.x == point[0] && item.y == point[1]
        })
        return res.length != 0
    }
  const findPointArray = (point,arr)=>{
    let found = false;
    let index = -1;
    arr.forEach((item,idx)=>{
        let f = findPoint(point,item);
        if(f) index = idx
        found |= f;
    })
    return [found,index];
  }
  const giveArray =(large)=>{
    let return_str = "[";
    large.forEach((item)=>{
        return_str+=`[(${Math.round(item[0].x*100)/100},${Math.round(item[0].y*100)/100}),(${Math.round(item[1].x*100)/100},${Math.round(item[1].y*100)/100})]`
    })
    return_str+="]"
    return return_str
  }
  const giveCandidates =(large)=>{
    let return_str = "[";
    large.forEach((item,index)=>{
        if(index!=0 && index%2==0) return_str+="\n\t\t\t\t\t\t\t\t\t";
        return_str+=`(${Math.round(item.x*100)/100},${Math.round(item.y*100)/100}) `
       
    })
    return_str+="]"
    return return_str
  }
  const isRightIndex = (step) =>{
    const dp = []
    let found = false
    if(props.step == 0) return false
    else{
        structRef.current.pairs.forEach((item,index)=>{
            if(index == 0) dp.push(item.length + 4)
            else dp.push(item.length+4)
        })
        dp.forEach((item,index)=>{
            if(index!=0){
                dp[index] += dp[index-1]
            }
        })
       
        dp.forEach((stepLen)=>{
            found |= step == stepLen
        })
    }
    if(props.step>=dp[-1]) return false
    return found;
  }

    const filterPairs = (point,index,pairIndex,all)=>{
        if(!all){
            // if((point.point[0] == maxMinRef.current.pumax.x && point.point[1] == maxMinRef.current.pumax.y)|| (point.point[0] == maxMinRef.current.pumin.x && point.point[1] == maxMinRef.current.pumin.y)){
            //     return <CustomPoint key={index} index={index} position={point.point} glow={true} color={'red'}/>
            // }
            if((findPoint(point.point,structRef.current.pairs[iterIndex][pairIndex]))){
                return <CustomPoint key={index} index={index} position={point.point} glow={true} color={colors[pairIndex]}/>
            }
                // else{
                // return <CustomPoint key={index} index={index} position={point.point} color={'#c467f0'}/>}
        }       
        else{
           const [found,color] =  findPointArray(point.point,structRef.current.pairs[iterIndex])
            // if((point.point[0] == maxMinRef.current.pumax.x && point.point[1] == maxMinRef.current.pumax.y)|| (point.point[0] == maxMinRef.current.pumin.x && point.point[1] == maxMinRef.current.pumin.y)){
            //     return <CustomPoint key={index} index={index} position={point.point} glow={true} color={'red'}/>
            // }
            if(found){
                return <CustomPoint key={index} index={index} position={point.point} glow={true} color={colors[color]}/>
            }
        //         else{
        //         return <CustomPoint key={index} index={index} position={point.point} color={'#c467f0'}/>}
         } 
      
            
    }
            useEffect(()=>{
                
                setAnimate(true)
        
            },[])
            useFrame(()=>{

                    if(animate){camera.position.copy(new Vector3(0,0,5)); camera.lookAt(new Vector3(0,0,0)); setAnimate(false);}
                    if(props.step==1){
                        if(textMinRef.current.rotation.y<12.5){
                            textMinRef.current.rotation.y+=0.05 
                        }
                        
                        camera.lookAt(new Vector3(maxMinRef.current.pumin.x,maxMinRef.current.pumin.y,0))
                        if(camera.position.z > 3){
                            camera.position.copy(new Vector3(maxMinRef.current.pumin.x,maxMinRef.current.pumin.y,position))
                            setPosition((pos)=>pos-0.01)
                        }
                       
                        
                        
                    }
                    else if(props.step==2){
                        if(textMaxRef.current.rotation.y<12.5){
                            textMaxRef.current.rotation.y+=0.05 
                        }
                       
                        
                        camera.lookAt(new Vector3(maxMinRef.current.pumax.x,maxMinRef.current.pumax.y,0))
                        if(camera.position.z > 3){
                            camera.position.copy(new Vector3(maxMinRef.current.pumax.x,maxMinRef.current.pumax.y,pos2))
                            setPos2((pos)=>pos-0.01)
                        }
                    }
                    else if(props.step>=3 && props.step>= dp[dp.length-1]+4){
                        const direction = (tRef.current.pL.x - maxMinRef.current.pumin.x) > 0 ? -1 : 1
                        const slope = (tRef.current.pL.y - maxMinRef.current.pumin.y) /(tRef.current.pL.x - maxMinRef.current.pumin.x)
                        const c= tRef.current.pL.y - slope* tRef.current.pL.x
                if((target.x-maxMinRef.current.pumin.x)*direction<0){
                    setTarget((value)=>new Vector3(value.x+0.01*direction,slope*(value.x+0.01*direction)+c,0))
                }
                  
                        // camera.position.copy(new Vector3((tRef.current.pL.x+maxMinRef.current.pumin.x)/2,(tRef.current.pL.y+maxMinRef.current.pumin.y)/2,3))
                        // camera.lookAt(new Vector3((tRef.current.pL.x+maxMinRef.current.pumin.x)/2,(tRef.current.pL.y+maxMinRef.current.pumin.y)/2,0))
                        camera.position.copy(new Vector3(0,0,5))
                        camera.lookAt(new Vector3(0,0,0))

                    }
                    else{
                        camera.position.copy(new Vector3(0,0,5))
                        camera.lookAt(new Vector3(0,0,0))
                    }
                
                
            })
    return (
<group>
{/* <gridHelper args={[100,100]} rotation={[Math.PI/2,0,0]}/> */}
<pointLight position={[0, 0, 20]} intensity={1000} color={'white'}/>
{props.step >= 1 && <Text ref={textMaxRef} position={[maxMinRef.current.pumax.x+0.25,maxMinRef.current.pumax.y,0.2]} fontSize={0.2}>pu_max</Text>}
{props.step >= 1 && <Text ref={textMinRef} position={[maxMinRef.current.pumin.x-0.25,maxMinRef.current.pumin.y,0.2]} fontSize={0.2}>pu_min</Text>}
{props.step == 3 && <Text position={[xMedianRef+0.6,3.5,0.2]} fontSize={0.15} >{`Median=${Math.floor(xMedianRef*100)/100}`}</Text>}
{props.step >= 3 && <Text position={[-3+xMedianRef,3,0.2]} fontSize={0.2} >TLeft</Text>}
{props.step >= 3 && <Text position={[xMedianRef+3,3,0.2]} fontSize={0.2} >TRight</Text>}
{props.step >= 3 && (isRightIndex(props.step-2) ||  isRightIndex(props.step-3) || isRightIndex(props.step-1) || isRightIndex(props.step)) && <Text position={[6.2,3.5,0.2]} fontSize={0.15} color={'yellow'}>{`Median Slope: ${Math.round(structRef.current.K[iterIndex]*100)/100}`}</Text>}
{props.step >= 3 && (isRightIndex(props.step-1) ||  isRightIndex(props.step-2) ||isRightIndex(props.step-3) ) && <Text position={[5.6,3.2,0.2]} fontSize={0.12} color={'orange'}>{`Large: ${giveArray(structRef.current.large[iterIndex])}`}</Text>}
{props.step>= 3 &&(isRightIndex(props.step-1) ||  isRightIndex(props.step-2) || isRightIndex(props.step-3)) && <Text position={[5.6,3.0,0.2]} fontSize={0.12} color={'orange'}>{`Equal: ${giveArray(structRef.current.equal[iterIndex])}`}</Text>}
{props.step>= 3 &&(isRightIndex(props.step-1) ||  isRightIndex(props.step-2) || isRightIndex(props.step-3))  && <Text position={[5.6,2.8,0.2]} fontSize={0.12} color={'orange'}>{`Small: ${giveArray(structRef.current.small[iterIndex])}`}</Text>}
{props.step >= 3 && props.step>=(dp[dp.length-1]+3) && <Text position={[tRef.current.pR.x+0.2,tRef.current.pR.y-0.1,0.2]} fontSize={0.2} >pR</Text>}
{props.step >= 3 && props.step>= (dp[dp.length-1]+3) && <Text position={[tRef.current.pL.x-0.2,tRef.current.pL.y-0.1,0.2]} fontSize={0.2} >pL</Text>}
{props.step>= 3 && isRightIndex(props.step-3) && <Text position={[structRef.current.pm[iterIndex].x+0.2,structRef.current.pm[iterIndex].y-0.2,0.2]} fontSize={0.2} color={'green'}>pM</Text>}
{props.step>= 3 && isRightIndex(props.step-3) && <Text position={[structRef.current.pk[iterIndex].x+0.2,structRef.current.pk[iterIndex].y-0.2,0.2]} fontSize={0.2} color={'yellow'} >pK</Text>}
{props.step>= 3 && isRightIndex(props.step-3) && <Text position={[6.2,2.2,0.2]} fontSize={0.12} color={'white'}>{`Candidates: ${giveCandidates(structRef.current.candidates[iterIndex])}`}</Text>}
     {((props.step<=3 && props.step>0)) && pointsRef.current.map((item,index)=>filterMaxMin(item,index))}
     {(props.step>=3 && props.step>=dp[dp.length-1]+4) && pointsRef.current.map((item,index)=>filterMaxMinUB(item,index))}
     {props.step==0 && pointsRef.current.map((point,index)=>{return <CustomPoint key={index} index={index} position={point.point} color={'#c467f0'}/>})}
     {props.step>= 3 && props.step>=dp[iterIndex]-structRef.current.pairs[iterIndex].length && props.step<dp[iterIndex] && pointsRef.current.map((item,index)=>filterPairs(item,index,structRef.current.pairs[iterIndex].length-(dp[iterIndex]-(props.step)),false))}
     {props.step>= 3 && (isRightIndex(props.step-2) ||  isRightIndex(props.step-3) || isRightIndex(props.step-1) || isRightIndex(props.step)) && pointsRef.current.map((item,index)=>filterPairs(item,index,structRef.current.pairs[iterIndex].length-(dp[iterIndex]-(props.step)),true))}
    <mesh>
      <Line points={[new Vector3(-50,0,),new Vector3(50,0,0)]} lineWidth={2} />
    <Line points={[new Vector3(0,-50,0),new Vector3(0,50,0)]} lineWidth={2} />
      {props.step >= 3 && isRightIndex(props.step) && structRef.current.pairs[iterIndex].map((item,index)=>{return <Line key={index} points={[new Vector3(item[0].x,item[0].y,0),new Vector3(item[1].x,item[1].y,0)]} lineWidth={5} color={colors[index]} />}) }
      {props.step == 3 && <Line points={[new Vector3(xMedianRef,20,0),new Vector3(xMedianRef,-20,0)]} lineWidth={3} color={'red'}/>}
      {props.step>=3 && props.step>=dp[dp.length-1]+4 && <Line points={[new Vector3(tRef.current.pL.x,tRef.current.pL.y,0),new Vector3(tRef.current.pR.x,tRef.current.pR.y)]} lineWidth={5} color={'yellow'}/> }
      {props.step>=3 &&props.step>=dp[dp.length-1]+4 && <Line points={[new Vector3(maxMinRef.current.pumax.x,maxMinRef.current.pumax.y,0),new Vector3(tRef.current.pR.x,tRef.current.pR.y)]} lineWidth={5} color={'yellow'}/> }
      {props.step>=3 && props.step>=dp[dp.length-1]+4 && <Line points={[new Vector3(tRef.current.pL.x,tRef.current.pL.y,0),target]} lineWidth={5} color={'yellow'}/> }
      {props.step>= 3 && isRightIndex(props.step-1) && <Line points={[new Vector3(-5,structRef.current.K[iterIndex]*-5,0),new Vector3(5,structRef.current.K[iterIndex]*5,0)]} lineWidth={5} />}
      {props.step>= 3 &&isRightIndex(props.step-2) && structRef.current.S[iterIndex].map((item,index)=>{if(structRef.current.S[iterIndex].length%2==1 && item.x == structRef.current.candidates[iterIndex][0].x && item.y == structRef.current.candidates[iterIndex][0].y){return null} else{ return <Line key={index} points={[new Vector3(-10,structRef.current.K[iterIndex]*-10 + (item.y - structRef.current.K[iterIndex]*item.x),0),new Vector3(10,structRef.current.K[iterIndex]*10 + (item.y - structRef.current.K[iterIndex]*item.x),0)]} lineWidth={3} color={colors[index/2]}/>}})}
      {props.step>=3 && props.step>=dp[dp.length-1]+5 && kpsRef.current.map((item,index)=><Line points={[new Vector3(item.x,item.y,0),new Vector3(kpsRef.current[(index+1)%kpsRef.current.length].x,kpsRef.current[(index+1)%kpsRef.current.length].y,0)]} lineWidth={5} color={'yellow'}/>)}
      <lineBasicMaterial/>
    </mesh>
</group>
    );
}