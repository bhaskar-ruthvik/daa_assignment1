import { Color } from "three";

export const CustomPoint= (props) => {
  return (
    <mesh key={props.key} position={props.position} onClick={(e)=> e.object.material.color = new Color('cyan')}>
    <sphereGeometry args={[0.05,32,32]} />
    <meshBasicMaterial color='green'/>
  </mesh>
  );
};