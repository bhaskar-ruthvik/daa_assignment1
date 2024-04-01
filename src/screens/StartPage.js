import { Link, useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import { useEffect, useRef, useState } from "react";

export default function StartPage(props){
   const [start,setStart] = useState(false)
   const navigate = useNavigate()
    const [mute,setMute]= useState(true)
    function handleMute(){
      if(!mute){
        
        // document.getElementById('bgm').src = '';
        document.getElementById('bgm').pause()
        setMute(true)
      }else{
        // document.getElementById('bgm').src = './audio/bg.mp3';
        document.getElementById('bgm').play()
        setMute(false)
      }
      

    }
    const delay = ms => new Promise(res => setTimeout(res, ms));
    async function handleStart(){
        setStart(true)
        props.clickSound.current.play()
        // document.getElementById('startButton').classList.remove('start');
        document.getElementById('startButton').classList.add('zoomed');
        await delay(500);
        navigate('/convexdef')
    }
    useEffect(()=>{
        if(!mute){
            document.getElementById('bgm').play()
        }
       
      
        
            const handleKeyDown = (event) => {
              if (event.key === 'Enter') {
                handleStart()
              }
            };
        
            window.addEventListener('keydown', handleKeyDown);

            return () => {
              window.removeEventListener('keydown', handleKeyDown);
            };
       
    },[])
    
    return (
        <div>
        <div className="mute" onClick={handleMute}>
           {!mute ?  <p className="space-mono-regular"><i className="fa-solid fa-volume-high"/> Sound On</p> : <p className="space-mono-regular"><i className="fa-solid fa-volume-off" /> Sound Off</p>}
        </div>
        <div> 
           <div className='heading'>
           <Typewriter text="Convex Hull Visualisation" />
           </div>
           <div className='canvas'>
           {/* <Link to='/path' style={{textDecoration: 'none', color:'inherit'}}> */}
           <h1 className="space-mono-regular start" onClick={handleStart} id="startButton">{!start ? "> Press Enter to Start" : "<Start>"}</h1>
           {/* </Link> */}
         
           </div>
          
           </div>
   {/* {page === 0 ? (
       <div key={page}> 
           <div className='heading'>
           <Typewriter text="Convex Hull Visualisation" />
           
           </div>
           <div className='canvas'>
           <h1 className="space-mono-regular start" onClick={handleNextPage}>{"<Start>"}</h1>
           </div>
          
           </div>
   ) : page == 1? (
       <div key={page}> 
           <div className='pathPage'>
           <Typewriter text="Choose a path" />
           
           </div>
           <div className='canvas'>
           <h1 key="0" className={select == 0 ? "space-mono-regular" : "space-mono-regular selected"} onClick={handleNextPage} onMouseOver={handleSelect}>{"> Jarvis March Algorithm"}</h1>
           <h1 key="1" className={ select == 1 ? "space-mono-regular" : "space-mono-regular selected"} onClick={handleNextPage} onMouseOver={handleSelect}>{"> Kirkpatrick Seidel Algorithm"}</h1>
           </div>
          
           </div>
   ) : 
   <div key={page}> 
           <div className='algHeading'>
           <Typewriter text="Jarvis March Algorithm" />
           
           </div>
           <div className="space-mono-regular content">
           <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in massa a ante ultricies imperdiet non luctus velit. Mauris a dictum nisi. Curabitur tempor purus arcu, non posuere enim interdum ac. Pellentesque venenatis imperdiet urna nec porta. Pellentesque auctor mauris eget quam dictum pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis at nibh mauris. Aliquam quis ipsum est. Duis efficitur, urna sit amet tempor sodales, justo augue maximus libero, in elementum orci ligula ut enim. Phasellus scelerisque tempor odio eu congue. Morbi ullamcorper eros nec vestibulum condimentum. Donec molestie elementum ipsum quis lacinia. In libero nibh, ullamcorper eu scelerisque vel, sollicitudin sit amet metus. Suspendisse ac justo dictum, dictum felis in, viverra lacus. Vestibulum gravida fermentum lacus, eget tincidunt quam finibus a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </span>
           </div>
           <div className='canvas'>
           <h3 className="space-mono-regular start" onClick={handleNextPage}>{"> See Step By Step"}</h3>
           </div>
          
           </div>
   } */}
    
      
       </div>
    );
}