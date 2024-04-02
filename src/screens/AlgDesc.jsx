import { useEffect, useRef, useState } from "react"
import { steps } from "../utils/steps"
import { useNavigate } from "react-router-dom"
import { lowerHull, returnInitStructures, returnJarvisStruct, returnUBstructures, upperHull } from "../utils/utils"
export default function AlgDesc(props){
    const navigate = useNavigate()
    const [nsKps,setNsKps] = useState(0)
    const [nsJm,setNsJm] = useState(0)
    const [pairingStep,setPairingStep] = useState(0)
    const paths = ['kirkpatrickvisu','jarvisvisu']
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
        setPairingStep(structs.pairs[0].length+4)

    },[])
    return (
        <div className="space-mono-bold ">
        <h1 className="start alghead" >KirkPatrick-Seidel Algorithm</h1>
            <div className="desc descdiv">
                {steps[parseInt(props.id)].map((item,index)=>{
                   return <div>
                   <p>{index+1}. {item}<br /></p>
                   {props.id == 1 && index==1 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/jarvisvisu/${2}`)}}>{"> See Sweep Visualisation"}</h3>}
                   {props.id == 1 && index==steps[props.id].length-3 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/jarvisvisu/${3}`)}}>{"> See Visualisation"}</h3>}
                   {props.id == 1 && index==steps[props.id].length-1 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/jarvisvisu/${nsJm}`)}}>{"> See Convex Hull"}</h3>}
                   {props.id == 0 && index==steps[props.id].length-2 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${nsKps-1}`)}}>{"> See Lower Hull"}</h3>}
                   {props.id == 0 && index==0 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${1}`)}}>{"> See Visualisation"}</h3>}
                   {props.id == 0 && index==1 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${3}`)}}>{"> See Median"}</h3>}
                   {props.id == 0 && index==2 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${pairingStep}`)}}>{"> See Pairings"}</h3>}
                   {props.id == 0 && index==3 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${pairingStep}`)}}>{"> See Slopes"}</h3>}
                   {props.id == 0 && index==4 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${pairingStep+1}`)}}>{"> See Median Slope"}</h3>}
                   {props.id == 0 && index==5 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${pairingStep+2}`)}}>{"> See Intercepts"}</h3>}
                   {props.id == 0 && index==6 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${pairingStep+3}`)}}>{"> See pK/pM"}</h3>}
                   {props.id == 0 && index==steps[props.id].length-4 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${nsKps-3}`)}}>{"> See Upper Bridge"}</h3>}
                   {props.id == 0 && index==steps[props.id].length-3 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${nsKps-2}`)}}>{"> See Upper Hull"}</h3>}
                   {props.id == 0 && index==steps[props.id].length-1 && <h3 className="space-mono-regular start seevis" onClick={()=>{navigate(`/kirkpatrickvisu/${nsKps}`)}}>{"> See Convex Hull"}</h3>}
                   </div>
                })}
              
            </div>
                <h3 className="space-mono-regular" onClick={()=>navigate(-1)} style={{textAlign: "center"}}>{"< Back"}</h3>
        </div>
    )
}