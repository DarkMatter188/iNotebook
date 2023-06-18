import React,{ useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)

    const {deleteNote} = context;
    const {note,updateNote} = props

    // console.log(note)

  return (
    <div className='col-md-3'>
      {/* {note.title}
      {note.description} */}
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex">  
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id);
                props.showAlert("Deleted successfully","success")}}></i>
                <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)
                }} ></i>
                
                </div>
                <p className="card-text">{note.description}</p>

        </div>
</div>

    </div>
  )
}

export default Noteitem
