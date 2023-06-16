import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{

    const notesInitial = [
        {
          "_id": "6488a3cd7e514e4631b3de2f",
          "user": "648873c98b89b28bfb28b465",
          "title": "Hello Title",
          "description": "Hello Please do your work",
          "tag": "personalisation",
          "date": "2023-06-13T17:13:49.588Z",
          "__v": 0
        },
        {
          "_id": "6488a3cd7e514e4631b3de31",
          "user": "648873c98b89b28bfb28b465",
          "title": "Hello Title",
          "description": "Hello Please do your work",
          "tag": "personalisation",
          "date": "2023-06-13T17:13:49.907Z",
          "__v": 0
        },
        {
          "_id": "6488a3ce7e514e4631b3de33",
          "user": "648873c98b89b28bfb28b465",
          "title": "Hello Title",
          "description": "Hello Please do your work",
          "tag": "personalisation",
          "date": "2023-06-13T17:13:50.130Z",
          "__v": 0
        },
        {
          "_id": "6488b6e5a397576aa859c142b",
          "user": "648873c98b89b28bfb28b465",
          "title": "Hello Title",
          "description": "Hello Please do your work",
          "tag": "personalisation",
          "date": "2023-06-13T18:35:17.574Z",
          "__v": 0
        },
        {
            "_id": "6488b6e5a397576aa859c312b",
            "user": "648873c98b89b28bfb28b465",
            "title": "Hello Title",
            "description": "Hello Please do your work",
            "tag": "personalisation",
            "date": "2023-06-13T18:35:17.574Z",
            "__v": 0
          },
          {
            "_id": "6488b6e5a397576aa8591c12b",
            "user": "648873c98b89b28bfb28b465",
            "title": "Hello Title",
            "description": "Hello Please do your work",
            "tag": "personalisation",
            "date": "2023-06-13T18:35:17.574Z",
            "__v": 0
          }
      ]

      const[notes,setNotes] = useState(notesInitial)
    //   console.log(notes)

    //Add a note
    const addNote= (title,description,tag)=>{
        //TODO API Call
        const note =           {
            "_id": "6488b6e5a397576aa8591c12b",
            "user": "648873c98b89b28bfb28b465",
            "title": "Hello TitleAdded",
            "description": "Hello Please do your work [Added]",
            "tag": "personalisation",
            "date": "2023-06-13T18:35:17.574Z",
            "__v": 0
          }
        setNotes(notes.push(note))
    }


    //Delete a note
    const deleteNote= (id)=>{
        
    }


    //Edit a note

    const editNote= (id)=>{
        
    }
    
    return(
        // state,update
    <NoteContext.Provider value = {{notes,setNotes,addNote,deleteNote,editNote}}>    

        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState