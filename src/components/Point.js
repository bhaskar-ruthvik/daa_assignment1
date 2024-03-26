import { useFrame,useThree } from "@react-three/fiber";
import { Easing, Tween, update } from "@tweenjs/tween.js";
import { useRef, useState } from "react";
import { Color, MeshNormalMaterial, Vector2, Vector3 } from "three";

export const CustomPoint= (props) => {
  const pointRef = useRef(null)
  const [zoom,setZoom] = useState(false)
  const originalPosition = new Vector3(0,0,5)
  const [position,setPosition]  = useState(originalPosition)
  function lerpColor(color1, color2, alpha) {
    return new Color(
      color1.r + (color2.r - color1.r) * alpha,
      color1.g + (color2.g - color1.g) * alpha,
      color1.b + (color2.b - color1.b) * alpha
    );
  }
  const [select,setSelect] = useState(false)
  const [color, setColor] = useState(props.color); // Initial color
  const targetColor = useRef(new Color(props.color)) // Reference to base color
  const changeTime = 100000; // Time in milliseconds for color change

  let elapsedTime = useRef(0); // Track elapsed time

 
    // useFrame(({ clock }) => {
    //   elapsedTime.current += clock.getElapsedTime()/1000; // Update elapsed time in ms
    //   const cycleProgress = (elapsedTime.current % (changeTime * 2)) / changeTime; // Normalize progress (0-1)
    //   if(props.glow==true){
    //   if (Math.floor(elapsedTime.current)%2 == 0) {
    //     setColor(props.color)
    //   } else {
    //     // Lerp from alternate color back to target color
    //     setColor('pink')
    //   }
    // }
    //    // Update mesh color
    // });
  


  function toggleZoom(){
    setZoom((zoom)=>!zoom)
    setSelect(true)
  }
  return (
    <group key={props.index}>
    <mesh key={props.index} ref={pointRef} position={props.position} onClick={toggleZoom}  >
    <sphereGeometry args={[0.05,32,32]} />
    <meshStandardMaterial color={color}/>
  </mesh>
    </group>
  
  );
};