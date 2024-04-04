import { Vector3 } from "three";
import CustomPoint from "../components/Point";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


export default {
    title: "Components/Math/Point",
    component: CustomPoint,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This component uses Three JS and provides the user with a custom point that can be used in coordinate systems "
    }
}
const Template = args => {
    return  <div className="visualisation">
    <Canvas>
   <pointLight position={[0,0,4]} intensity={10}/>
        <CustomPoint {...args} index={1}/>
        <OrbitControls />
    </Canvas>
   </div>
    
}
export const Origin = Template.bind({})

Origin.args = {
    color: "pink",
    position: new Vector3(0,0,0)

}