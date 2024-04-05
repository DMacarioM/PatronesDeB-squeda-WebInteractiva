import React, { Component } from 'react'
import LogContainerComponent from '../components/LogContainerComponent'


function SandboxPage() {
  return (
    /**<!-- In dark theme, background will be dark and text will be light. 
      In light theme, background will be light and text will be dark -->*/
    <div>
      <b>SandboxPage</b>
      <div className="dark dark:bg-gray-800 dark:text-white bg-white text-black">
        <div>Text color changes based on theme</div>
      </div>

      <div className="light light:bg-gray-100 light:text-black bg-black text-white">
        <div>Text color changes based on theme</div>
      </div>
      <LogContainerComponent/>

    </div>
  )
}

export default SandboxPage