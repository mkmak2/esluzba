import React from 'react'
import { Box } from '@mui/material'
import { Person } from '../types'

interface Props {
    person: Person,
    deletePerson: (id: string) => void
}

const PersonInfo = ({person, deletePerson}: Props) => {
  return (
    <Box display='flex-col' width={600} justifyContent='space-around' sx={{borderBottom: 'solid black 1px', padding: 2}}>
        <div className='person-header'>{person.firstname} {person.lastname}</div>
        <Box display='flex' justifyContent='space-between' gap={5}>
            <div>Stopień wojskowy: {person.degree}</div>
            <div>Kompania: {person.company}</div>
            <div>Pluton: {person.section}</div>
            <div>
                <span className='person-btn' onClick={() => deletePerson(person.id)}>Usuń</span>
            </div>
        </Box>
    </Box>
  )
}

export default PersonInfo