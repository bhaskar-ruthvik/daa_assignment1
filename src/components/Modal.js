import { useEffect } from "react";
import { steps } from "../utils/steps";
import TypewriterSmall from "./TypewriterSmall";

export default function CustomModal(props){
   const checkIndex = (step)=>{
    if(props.dpRef.length == 0) return false
    let found = false;
    props.dpRef.forEach((item)=>{
        found |= (item==step)
    })
    return found;
}

    const checkRange = (step)=>{
        if(props.dpRef.length == 0){
            return false
        }
        if(step>3 && step<=props.dpRef[0]){
            return true;
        }
        let found = false
       props.dpRef.forEach((item,index)=>{  
        if(index < (props.dpRef.length - 1)){
            found |= (step>item+3 && step<=(props.dpRef[index+1]))
        }
       })
       return found;
    }

    const topleft = {
        top: "2vh",
        left: "2vw"
    }
    const topright = {
        top: "2vh",
        right: "2vw"
    }
    const bottomright = {
        top: "60vh",
        right: "2vw",
    }
    return (
        <div className="modal" style={props.step <= 2? topright: bottomright}>
        <div style={props.step == 3 ? {paddingTop: "1vh",paddingLeft: "2vw",paddingRight: "2vw"} : {paddingTop: "2vh",paddingLeft: "2vw",paddingRight: "2rem"}}>
        {props.id==0 && (props.step == 1 || props.step == 2) && <TypewriterSmall text={steps[0][0]}/> }
        {props.id==0 && props.step == 3 && <TypewriterSmall text={steps[0][1]}/> }
     {props.id==0 && checkRange(props.step) == true && <TypewriterSmall text={steps[0][2]}/>}
    {props.id==0 && checkIndex(props.step-1) == true && <TypewriterSmall text={steps[0][4]}/>}
    {props.id==0 && checkIndex(props.step-2) == true && <TypewriterSmall text={steps[0][5]}/>}
    {props.id==0 && checkIndex(props.step-3) == true && <TypewriterSmall text={steps[0][6]}/>}
    {props.id==0 && props.dpRef.length !=0 && props.step == props.dpRef[props.dpRef.length -1] +4 && <TypewriterSmall text={steps[0][7]}/>}
    {props.id==0 && props.dpRef.length !=0 && props.step == props.dpRef[props.dpRef.length -1] +5 && <TypewriterSmall text={steps[0][8]}/>}
    {props.id==0 && props.dpRef.length !=0 && props.step == props.dpRef[props.dpRef.length -1] +6 && <TypewriterSmall text={steps[0][9]}/>}
    {props.id==0 && props.dpRef.length !=0 && props.step == props.dpRef[props.dpRef.length -1] +7 && <TypewriterSmall text={steps[0][10]}/>}
    {props.id==1 && props.step<=4 && <TypewriterSmall text={steps[props.id][props.step-1]}/>}
    {props.id == 1 && props.step>4 && props.structRef.current!=null && props.step < props.structRef.current.convexHull.length+3 && <TypewriterSmall text={steps[props.id][steps[props.id].length-2]}/>}
    {props.id == 1 && props.step>4 && props.structRef.current!=null &&props.step == props.structRef.current.convexHull.length+3 && <TypewriterSmall text={steps[props.id][steps[props.id].length-1]}/>}
        </div>
        </div>
    )
}