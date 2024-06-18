import React, { useState } from 'react'
import { Duty, Person, NewDuty } from '../types'
import { Box } from '@mui/material'
import {EditDuty} from './EditDuty'

interface Props {
    duty: Duty
    deleteDuty: (id: string) => void
    editDuty: (duty: NewDuty, id?: string) => void
    people: Person[] 
    dutyList: Duty[]
}
const DutyInfo = ({duty, deleteDuty, people, editDuty, dutyList}: Props) => {

    const [editDisplay, setEditDisplay] = useState<boolean>(false)

    const toggleDisplay = (context: boolean) => {
        setEditDisplay(context)
    }

  return (
    <Box  mb={5} width={600}>
        <div className="duty-header">
            <div>{duty.date}</div>
            <div>
                <span onClick={() => deleteDuty(duty.id)} style={{marginRight: '10px'}}>Usuń</span>
                <span onClick={() => setEditDisplay(true)}>Edytuj</span>
            </div>
        </div>
        <Box display='flex' justifyContent={'space-between'} columnGap={5}>
            <div className="duty-person-info">
                <div style={{fontSize: 'large', fontWeight: 'bold', marginBottom: '5px'}}>
                    <span>{duty.onDuty.firstname} {duty.onDuty.lastname}</span>
                </div>
                <Box display='flex-col'>
                    <Box sx={{wordSpacing: '10px'}}>
                        <span> <b style={{wordSpacing:'normal'}}>Stopień wojskowy:</b> {duty.onDuty.degree}</span>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} sx={{wordSpacing: '10px'}}>
                        <span><b>Kompania:</b> {duty.onDuty.company}</span>
                        <span><b>Pluton:</b> {duty.onDuty.section}</span>
                    </Box>
                </Box>
            </div>
            <div className="duty-person-info">
                <div style={{fontSize: 'large', fontWeight: 'bold', marginBottom: '5px'}}>
                    <span>{duty.assistant.firstname} {duty.assistant.lastname}</span>
                </div>
                <Box display='flex-col'>
                    <Box sx={{wordSpacing: '10px'}}>
                        <span> <b style={{wordSpacing:'normal'}}>Stopień wojskowy:</b> {duty.assistant.degree}</span>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} sx={{wordSpacing: '10px'}}>
                        <span><b>Kompania:</b> {duty.assistant.company}</span>
                        <span><b>Pluton:</b> {duty.assistant.section}</span>
                    </Box>
                </Box>
            </div>
        </Box>
        <EditDuty people={people} editDuty={editDuty} display={editDisplay} toggle={toggleDisplay} dutyId={duty.id} dutyList={dutyList}/>
    </Box>
  )
}

export default DutyInfo