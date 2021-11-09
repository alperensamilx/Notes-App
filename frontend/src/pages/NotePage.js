import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const NotePage = ({ match }) => {

    let {noteId} = useParams()
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()

    }, [noteId])

    let getNote = async () => {
        
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }


    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                        <ArrowLeft />
                    </Link>
                </h3>
            </div>
            <textarea defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage
