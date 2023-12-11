import React from 'react';
import './Menu.css'; 
import {Button} from '@material-ui/core';

const ComponentWithButton = () => {
  const handleClick = () => {
    // Some button logic
    console.log("hello");
  }

  return (
    
    <Button onClick={handleClick}>Button</Button>
  )
}

export default ComponentWithButton
