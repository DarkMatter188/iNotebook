import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react'

const About = () =>  {
  // const a = useContext(noteContext)
  //Creating useEffect to run after running sync tasks

  return (
    <div>
      {/* This is About {a.state.name} and he is in class {a.state.class} */}
    </div>
  )
}

export default About
