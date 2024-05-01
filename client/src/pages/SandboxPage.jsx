import React, { Component } from 'react'
import LogContainerComponent from './SandboxPageComponents/LogComponent/LogContainerComponent'
import ControllerComponent from "./SandboxPageComponents/ControllerComponent/ControllerComponent";
import VisualContainerComponent from "./SandboxPageComponents/VisualComponent/VisualContainerComponent";



function SandboxPage() {
  return (
    /**<!-- In dark theme, background will be dark and text will be light. 
      In light theme, background will be light and text will be dark --> Los cojones*/
    <div className='flex-col'>
      <b>SandboxPage</b> 
      {/*<div className="dark dark:bg-gray-800 dark:text-white bg-white text-black">
        <div>Text color changes based on theme</div>
      </div>

      <div className="light light:bg-gray-100 light:text-black bg-black text-white">
        <div>Text color changes based on theme</div>
      </div>*/}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ControllerComponent />
      <br></br>
      <br></br>
      <VisualContainerComponent />
      <br></br>
      <br></br>
      <LogContainerComponent/>
      <br></br>
      <br></br>
    </div>
  )
} 

export default SandboxPage