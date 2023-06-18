import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
// import noteSate from '../context/notes/NoteState'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

  const {showAlert} = props;
  const context = useContext(noteContext)
  let navigate = useNavigate();

  const { notes, getNotes , editNote} = context
  useEffect(() => {
    // localStorage.clear()
    if(localStorage.getItem('token')){
          console.log(localStorage.getItem('token'))
          getNotes()
    }else{
      navigate("/login")
      console.log(navigate("/login"))
    }
    //eslint-disable-next-line

  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const[note,setNote] = useState({ id:"", etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    console.log("Update called")
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }


  const handleClick = (e) => {
    console.log("Updating the note....",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully","success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert = {showAlert}/>


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' min  value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label" >Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' min value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" >Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length <5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          // console.log(note)
          return <Noteitem key={note._id} showAlert = {props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
