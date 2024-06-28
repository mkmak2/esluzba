import React, { useState } from 'react'
import NewDutyForm from './NewDutyForm'
import { NewDuty, Duty, Person } from '../types'
import EditDutyForm from './EditDutyForm'

interface Props {
  editDuty: (duty: NewDuty, id?: string) => void
  people: Person[]
  display: boolean
  toggle: (context: boolean) => void
  dutyId: string
  dutyList: Duty[]
}

export const EditDuty = ({editDuty, people, display, toggle, dutyId, dutyList}: Props) => {


  if(display){
      return (
        <div className='edit-duty'>
          <EditDutyForm people={people} editDuty={editDuty} id={dutyId} dutyList={dutyList} />
          <div style={{marginTop: '20px', fontSize: 'larger', color: 'white', cursor: 'pointer'}}>
            <span onClick={() => toggle(false)}>Zamknij</span>
          </div>
        </div>
      )
  } else {
    return <></>
  }
}

