import { Link, useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";

export default function AlgoMain(props){
    let navigate = useNavigate()
    return (
        <div key = {props.key}> 
           <div className='algHeading'>
           <Typewriter text={props.heading} />
           
           </div>
           <div className="space-mono-regular content">
           <span>{props.content}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in massa a ante ultricies imperdiet non luctus velit. Mauris a dictum nisi. Curabitur tempor purus arcu, non posuere enim interdum ac. Pellentesque venenatis imperdiet urna nec porta. Pellentesque auctor mauris eget quam dictum pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis at nibh mauris. Aliquam quis ipsum est. Duis efficitur, urna sit amet tempor sodales, justo augue maximus libero, in elementum orci ligula ut enim. Phasellus scelerisque tempor odio eu congue. Morbi ullamcorper eros nec vestibulum condimentum. Donec molestie elementum ipsum quis lacinia. In libero nibh, ullamcorper eu scelerisque vel, sollicitudin sit amet metus. Suspendisse ac justo dictum, dictum felis in, viverra lacus. Vestibulum gravida fermentum lacus, eget tincidunt quam finibus a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </span>
           </div>
           <div className='canvas'>
           <h3 className="space-mono-regular start" onClick={()=>navigate('/vis',{replace: true})}>{"> See Step By Step"}</h3>
           <h3 className="space-mono-regular " onClick={()=>navigate(-1)}>{"< Back"}</h3>
           </div>
          
           </div>
    );
}