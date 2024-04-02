import { useEffect, useState } from "react"
import { steps } from "../utils/steps"
import { useNavigate } from "react-router-dom"
import { lowerHull, returnInitStructures, returnJarvisStruct, returnUBstructures, upperHull } from "../utils/utils"
export default function AlgDesc(props){
    const navigate = useNavigate()
    const [nsKps,setNsKps] = useState(0)
    const [nsJm,setNsJm] = useState(0)
    useEffect(()=>{
        const points = JSON.parse(window.localStorage.getItem("points"))
        const pointsArr = points.map((item)=>{return {x: item.point[0],y: item.point[1]}})
        let [T,pumin,pumax,plmin,plmax,median,TUpper,TLower,TLeft,TRight] = returnInitStructures(pointsArr);
        let structs = returnUBstructures(TUpper, median);
        let sum = 7
        structs.pairs.forEach((item)=> sum+=(item.length+4))
        setNsKps(sum)
        const struct = returnJarvisStruct(pointsArr);
        setNsJm(3+struct.hullPoints.length)

    },[])
    return (
        <div className="space-mono-bold descdiv">
            <div className="desc">
                <h1 className="start alghead" >KirkPatrick-Seidel Algorithm</h1>
                {steps[props.id].map((item,index)=>{
                   return <div>
                   <p>{index+1}. {item}<br /></p>
                   {index==steps[props.id].length-1 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${nsKps}`)}}>{"> See Visualisation"}</h3>}
                   </div>
                })}
            </div>
                <div>
                <h3 className="space-mono-regular" onClick={()=>navigate(-1)}>{"< Back"}</h3>
                </div>
        </div>
    )
}