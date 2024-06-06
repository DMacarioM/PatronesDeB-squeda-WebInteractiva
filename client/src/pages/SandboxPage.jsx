import React, { Component } from 'react'
import LogContainerComponent from './SandboxPageComponents/LogComponent/LogContainerComponent'
import ControllerComponent from "./SandboxPageComponents/ControllerComponent/ControllerComponent";
import VisualContainerComponent from "./SandboxPageComponents/VisualComponent/VisualContainerComponent";



function SandboxPage() {
  return (
    <div className='flex-col'>
      <b>SandboxPage</b> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='flex gap-x-11'>
      <ControllerComponent />
      <LogContainerComponent/>
      </div>
      <br></br>
      <VisualContainerComponent />
      <br></br>
      <br></br>
      <br></br>
    

    </div>
  )
} 

export default SandboxPage