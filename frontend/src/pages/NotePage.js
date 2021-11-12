import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const NotePage = ({match}) => {

    let noteId = match.params.id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if (noteId === 'new') return 
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    
    }


    let createNote = async () => {
        fetch(`/api/notes/${noteId}/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify(note)
        })
    }


    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify(note)
        })
    }


    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')

        
    }



    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === ''){
                deleteNote()
        }else if (noteId !== 'new'){
            updateNote()
        }else if (noteId === 'new' && note !== null){
            createNote()
        }
        history.push('/')
    
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}></ArrowLeft>
                </h3>
                {noteId !== 'new' ? ( 
                    <button onClick={deleteNote}>Delete</button>       
                ) : (
                    <button onClick={handleSubmit}>Done</button> 
                )}
                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value }) }} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage
