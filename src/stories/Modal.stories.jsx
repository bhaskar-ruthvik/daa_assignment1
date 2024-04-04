import { useRef } from "react";
import CustomModal from "../components/Modal";


export default {
    title: "Components/CustomModal",
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This component displays an overlay on the screen and is used in the website to display the current step of the convex hull visualisation"
    },
    component: CustomModal,
}

export const Modal = () =>{
    const dpRef = useRef([])
    return <div className="visualisation">
      <CustomModal id={1} step={1} dpRef={dpRef}/>
    </div>
   
} 

