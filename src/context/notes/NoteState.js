import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)
  //   console.log(notes)

  //Get all notes

  const getNotes = async () => {
    //TODO API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }


  // Add a note

  const addNote = async (title, description, tag) => {
    //TODO API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json()
    // console.log(json)

    console.log("Adding a new note")
    setNotes(notes.concat(note))
  }



  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json()
    console.log(json)
    console.log("Deleting the note with id: " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }


  //Edit a note

  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    console.log(json)
    //Logic to edit in Client

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    // state,update
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>

      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState