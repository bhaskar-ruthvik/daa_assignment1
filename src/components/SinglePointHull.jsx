import { Line } from "@react-three/drei";
import CustomPoint from "./Point";
import { Vector3 } from "three";
import AnimatedLine from "./AnimatedLine";


export default function SinglePointHull(props){
    const showGrid = props.grid
    const showAxes = props.axes
    const pointsRef = props.points;
    return (
<group>
{console.log(props.hull.current)}
{showGrid && <gridHelper args={[100,100]} rotation={[Math.PI/2,0,0]}/>}
<pointLight position={[0, 0, 20]} intensity={1000} color={'white'}/>
   { pointsRef.current.map((point,index)=><CustomPoint key={-1} index={-1} color={'red'} position={point.point}/>)}
   <mesh>
   {showAxes && <Line points={[new Vector3(-50,0,0),new Vector3(50,0,0)]} lineWidth={2} />}
{showAxes && <Line points={[new Vector3(0,-50,0),new Vector3(0,50,0)]} lineWidth={2} />}
{props.id == 1 && props.hull!=null && props.hull.current.length!=0 && <AnimatedLine points={[props.hull.current[0],props.hull.current[1]]} lineWidth={5} color={'white'}/>}
<lineBasicMaterial/>
</mesh>
</group>
    );
}