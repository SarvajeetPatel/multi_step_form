import React, { useState } from 'react'
import NoteContext from './NoteContext'

function NoteState(props) {

    const [personalDetails, setPersonalDetails] = useState({})
    const [workExp, setWorkExp] = useState({})
    const [skills, setSkills] = useState({})
    const [desp, setDesp] = useState({})

    return (
        <>
            <NoteContext.Provider value={{ personalDetails, setPersonalDetails, workExp, setWorkExp, skills, setSkills, desp, setDesp }}>
                {props.children}
            </NoteContext.Provider>
        </>
    )
}

export default NoteState