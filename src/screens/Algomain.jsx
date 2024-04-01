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
           <span>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at dui est. Integer laoreet massa sit amet velit pretium tempor. Nam odio dolor, ultricies vitae porttitor ut, feugiat at nibh. Praesent ipsum quam, vulputate ut fringilla at, luctus eget risus. Morbi mollis sed massa a tempor. Fusce ac augue massa. Ut nunc nibh, dignissim eu erat vel, vestibulum ullamcorper est. Integer euismod mi mi. Ut fringilla, augue at mollis venenatis, eros metus congue neque, at hendrerit lectus libero a tortor. Cras enim orci, elementum nec dictum eget, mollis sed nunc. Ut sed interdum neque. Nullam fringilla pharetra lacus. Sed gravida hendrerit lectus, id eleifend sapien molestie id. Suspendisse mi nibh, egestas a sollicitudin ut, aliquet ut arcu.

Integer scelerisque ut ligula euismod lobortis. Integer hendrerit, tellus in eleifend feugiat, tortor nisl consectetur magna, id laoreet tellus est ac ex. In purus eros, facilisis ut fringilla id, viverra sit amet elit. Sed pretium hendrerit est. Pellentesque varius diam diam, ac gravida neque rhoncus non. Praesent in tristique enim. Fusce bibendum egestas nulla eget iaculis. Nullam vehicula urna vel lacinia pharetra. Duis et arcu et metus convallis lacinia. Proin ac sem volutpat, tempus magna eu, imperdiet orci. Donec lacus tellus, volutpat nec nisi ultrices, convallis maximus nisi. Vivamus sollicitudin, enim pretium molestie lobortis, eros arcu dictum est, vitae ornare diam turpis non mi. Sed eu risus non erat pulvinar elementum ac auctor lectus.

Sed accumsan eros sit amet lectus tristique, et accumsan dolor pellentesque. Nam varius sem ut mi convallis, a imperdiet urna bibendum. Phasellus imperdiet dolor ut libero iaculis viverra. Nullam sit amet gravida massa, vitae malesuada elit. Nulla ac turpis congue, aliquet ipsum sit amet, mattis odio. Vestibulum risus felis, dictum vel facilisis a, ultrices id felis. Proin gravida odio dictum gravida aliquam. Donec quis metus dui.

Quisque dignissim facilisis mauris vel ultrices. Aliquam vitae est in mi volutpat sollicitudin. Duis imperdiet mauris eu diam vehicula facilisis. Maecenas vehicula ligula in rutrum tincidunt. Maecenas laoreet malesuada dolor. Ut eu tincidunt ex. Morbi blandit arcu eu nibh dictum, hendrerit elementum felis pulvinar. Nulla facilisis, est in lacinia convallis, est orci feugiat enim, id sagittis nulla lectus et turpis. Nam lectus est, cursus eu malesuada eu, porta sit amet sem. Proin dapibus porttitor ipsum, sed posuere justo. Donec id turpis imperdiet sapien euismod volutpat. Integer a justo fermentum justo mattis efficitur in eu nulla. Vivamus at dignissim leo. Donec condimentum sit amet magna sed congue. Proin scelerisque dui metus, sit amet sagittis erat sagittis vitae.

Ut cursus, ante quis maximus maximus, odio orci elementum metus, eu pharetra turpis arcu vulputate augue. In hac habitasse platea dictumst. Maecenas at venenatis arcu. Nunc pulvinar metus mi, et tristique quam aliquam condimentum. Phasellus rhoncus lacinia nunc a sagittis. Aenean condimentum aliquet eros a tempus. Ut nunc massa, vehicula sed laoreet quis, tincidunt ut tellus. In auctor, ipsum ut venenatis eleifend, turpis nisl dapibus magna, eget venenatis arcu eros ac tellus. Mauris in ligula quam. Nulla id imperdiet lectus. Etiam sapien ex, dignissim ut nisi a, convallis pharetra ante.  </span>
           </div>
           <div className='canvas'>
        { props.id>-1 && props.id<2 && <h3 className="space-mono-regular start" onClick={()=>{props.heading === "Kirkpatrick Seidel Algorithm"? navigate('/kirkpatrickvis'): navigate('/jarvisvis')}}>{"> See Step By Step"}</h3>}
        { props.id== 2 && <h3 className="space-mono-regular start" onClick={()=>navigate('/path')}>{"> Begin Search for Convex Hull"}</h3>}
           <h3 className="space-mono-regular " onClick={()=>navigate(-1)}>{"< Back"}</h3>
           </div>
          
           </div>
    );
}