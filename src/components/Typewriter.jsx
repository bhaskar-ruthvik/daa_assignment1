import React, { useState, useEffect, useRef } from 'react';
import typing from '../assets/audio/type.mp3'
import PropTypes from 'prop-types'

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small','large'])
}

export default function Typewriter(props){
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const typingSpeed = 80; // Adjust typing speed in milliseconds
  const completeText = props.text;
  const textRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
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
      <h1 ref={textRef} className='space-mono-regular typewriter'>{text}</h1>
      <h1 className="cursor typewriter" style={{ visibility: cursorVisible ? 'visible' : 'hidden' }}>|</h1>
    </div>
  );
};


