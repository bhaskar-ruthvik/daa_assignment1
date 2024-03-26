import { useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import TypewriterSmall from "./TypewriterSmall";

export default function CustomModal(props){
    let text1 = 'In the first step of the Convex hull algorithm, we identify the points with highest and the least x-coordinates and mark them as pmin and pmax. If there are 2 or more points with the same x-coordinate then we find the coordinate with the highest y and mark it as pu_min or pu_max and the coordinate with the least y coordinate out of the points with the same x-coordinate as pl_min or pl_max.'
    let text2 = 'Now we compute the median x-coordinate of all the points and draw a line through the median with the equation x = a where a is the median of the points. After plotting the median, we split the set of points T to T_left and T_right which contains points to the left of the median line and the right of the median line respectively. We are currently computing the upper hull so we will ignore the points that have a y-coordinate less than the minimum y-coordinate of pu_min/pu_max. Finally, we will add pu_min to T_left and pu_max to T_right.'
    let text3 = 'Once we have pL and pR, which are the upper bridge points given TUpper, we repeat this process iteratively by finding the bridge between pL and pumin and similarly between pR and pumax. When we join all the bridges that we get we see that it forms a connected bridge which forms the upper hull of the set of points.'
 

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
        <div className="modal" style={props.step <= 2? topright: props.step == 3 ? bottomright : bottomright}>
        <div style={props.step == 3 ? {paddingTop: "1vh",paddingLeft: "2vw",paddingRight: "2vw"} : {paddingTop: "2vh",paddingLeft: "2vw",paddingRight: "2rem"}}>
     {props.step<=2 &&   <TypewriterSmall text={text1}/>}
     {props.step==3 && <TypewriterSmall text={text2} />}
     {props.step==4 && <TypewriterSmall text={text3} />}
        </div>
        </div>
    )
}