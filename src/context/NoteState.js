import React from 'react'
import NoteContext from './NoteContext'

function NoteState() {
    const FORM_STEPS = [
        { label: `Personal Details` },
        { label: `Work Experience` },
        { label: `Your Skills` },
        { label: `Self Description` }
    ]

    const FORM_STATE = {
        selectedIndex: 0,
        steps: {
            details: {
                valid: true,
                dirty: true,
                value: {
                    name: '',
                    email: '',
                    contact: '',
                    address: '',
                    gender: '',
                    birthDate: ''
                }
            },
            work: {
                valid: true,
                dirty: true,
                value: {
                    name: '',
                    startDate: '',
                    endDate: '',
                    job: ''
                }
            },
            skills: {
                valid: true,
                dirty: true,
                value: {
                    industry: '',
                    skills: [],
                }
            },
            details: {
                valid: false,
                dirty: true,
                value: {
                    description: ''
                }
            }
        }
    }

    return (
        <>
            <NoteContext.Provider value={{ FORM_STATE, FORM_STEPS }}>
                {props.children}
            </NoteContext.Provider>
        </>
    )
}

export default NoteState