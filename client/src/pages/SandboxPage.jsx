import React, { Component } from 'react'
import LogContainerComponent from './SandboxPageComponents/LogComponent/LogContainerComponent'
import ControllerComponent from "./SandboxPageComponents/ControllerComponent/ControllerComponent";
import VisualContainerComponent from "./SandboxPageComponents/VisualComponent/VisualContainerComponent";
import '../css/SandboxPage.css';


function SandboxPage() {//className='flex-col container mx-auto px-5'
  return (
    <div className='container'>
      <h1 className='title'>Sandbox</h1>
      <hr className='yellow-line'/>
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