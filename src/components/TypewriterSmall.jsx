import React, { useState, useEffect, useRef } from 'react';
import typing from '../assets/audio/type.mp3'

export default function TypewriterSmall(props){
  const [text, setText] = useState('');
  const [audio,setAudio] = useState();
  const [cursorVisible, setCursorVisible] = useState(true);
  const typingSpeed = 10; // Adjust typing speed in milliseconds

  const completeText = props.text;
  const textRef = useRef(null);
  const audioRef = useRef(null);
  useEffect(() => {
    // setAudio(new Audio(typing))
    const audio = audioRef.current = new Audio(typing);

    const handleType = () => {
      if (audio) {
        audio.play();
      }
    };

    let i = 0;
    const intervalId = setInterval(() => {
      if (i < completeText.length) {
        setText(completeText.substring(0, i + 1));
        handleType();
        i++;
      } else {
        clearInterval(intervalId);
        setCursorVisible(false);
      }
    }, typingSpeed);
  

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='text'>
      <p ref={textRef} className='space-mono-regular typewriter'>{text}</p>
      <p className="cursor typewriter" style={{ visibility: cursorVisible ? 'visible' : 'hidden' }}>|</p>
    </div>
  );
};
