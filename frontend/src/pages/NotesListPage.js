import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'



const NotesListPage = () => {


    let [note, setNote] = useState([]) 

    useEffect(()=> {
        getNotes()
    }, [])

    let getNotes = async () => {

        let response = await fetch('/api/notes/')
        let data = await response.json()
        setNote(data)
    }


    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{note.length}</p>
            </div>
            <div className="notes-list">
               {note.map((note, index) => (
                   <ListItem key={index} note={note} />
               ))}
            </div>
        </div>
    )
}

export default NotesListPage
