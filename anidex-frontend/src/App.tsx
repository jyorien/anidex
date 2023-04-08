import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mantine/core'
import { NavBar } from './NavBar'
function App() {

  return (
    <div>
    <NavBar links={
      [{link: "#", label: "Current Season", links:[]},
      {link: "#", label: "Top Anime", links:[]},
      ]}/>
    </div>
  )
}

export default App
