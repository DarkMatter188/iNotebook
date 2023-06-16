import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import noteSate from '../context/notes/NoteState'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes,addNotes} = context
  return (
    <>
    <AddNote/>
    <div className="row my-3">
    <h2>Your Notes</h2>
        {notes.map((note)=>{
            // console.log(note)
            return <Noteitem key = {note._id} note = {note}/>
        })}
    </div>
    </>
  )
}

export default Notes
