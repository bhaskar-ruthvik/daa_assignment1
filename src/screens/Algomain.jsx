import { Link, useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import { descs } from "../utils/descriptions";

export default function AlgoMain(props){
    let navigate = useNavigate()
    return (
        <div key = {props.key}> 
           <div className='algHeading'>
           <Typewriter text={props.heading} />
           
           </div>
           <div className="space-mono-regular content">
           <span>
           {props.id == 2 ? descs[2] : props.heading === "Kirkpatrick Seidel Algorithm" ? descs[1] : descs[0]}
 </span>
           </div>
           <div className='canvas'>
        { props.id!=2 && <h3 className="space-mono-regular start" onClick={()=>{props.heading === "Kirkpatrick Seidel Algorithm"? navigate('/kirkpatrickvis'): navigate('/jarvisvis')}}>{"> See Step By Step"}</h3>}
        { props.id== 2 && <h3 className="space-mono-regular start" onClick={()=>navigate('/path')}>{"> Begin Search for Convex Hull"}</h3>}
        { props.id!= 2 && <h3 className="space-mono-regular start" onClick={()=>{props.heading === "Kirkpatrick Seidel Algorithm"? navigate('/kpsdesc'): navigate('/jarvisdesc')}}>{"> See Explanation of the Algorithm"}</h3>}
           <h3 className="space-mono-regular " onClick={()=>navigate(-1)}>{"< Back"}</h3>
           </div>
          
           </div>
    );
}