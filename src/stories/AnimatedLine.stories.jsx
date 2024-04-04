import { Canvas } from "@react-three/fiber";
import AnimatedLine from "../components/AnimatedLine";
import { Vector3 } from "three";

export default {
    title: "Components/Math/AnimatedLine",
    tags: ['autodocs'],
    parameters:{ 
        componentSubtitle: "This is a Custom Line component written using Three.js which contains animation of the line being drawn",
    },
    
    component: AnimatedLine,
}
const Template = args =>{
    return <div className="visualisation">
  <Canvas>
  <pointLight position={[0,0,5]} intensity={10}/>
  <mesh>
  <AnimatedLine {...args}/>
  <lineBasicMaterial />
  </mesh>
    </Canvas>
    </div>  
  
    
} 
export const CustomLine = Template.bind({})

CustomLine.args = {
    points: [new Vector3(0,0,0),new Vector3(3,3,0)],
    color: "red",
    lineWidth: 5,
}