import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button} from '@mui/material'
import React, { useState } from 'react'
import { NewDuty, Duty, Person } from '../types'
import { isValidDateFormat, compareDates }  from '../utils/utils'

interface Props {
    people: Person[]
    addNew: ( duty: NewDuty) => void
    dutyList: Duty[]
}

const NewDutyForm = ({people, addNew, dutyList}: Props) => {

  const [onDuty, setOnDuty] = useState<string>('')
  const [assistance, setAssistance] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [error, setError] = useState<string>('')

  const validate = (): boolean => {
    if(!onDuty || !assistance || !date) {
      setError('Uzupełnij wszystkie pola')
      return false
    }
    if(onDuty === assistance) {
      setError('Osoba na słuzbię i zastepca muszą byc różnymi osobami')
      return false
    }
    if(!isValidDateFormat(date)) {
      setError('Podana data jest w niewłaściwym formacie')
      return false
    }
    if(!compareDates(dutyList,onDuty,assistance,date)) {
      console.log(compareDates(dutyList,onDuty,assistance,date))
      setError('Wybrana osoba/zastępca ma już służbe/zastępstwo w przeciągu 24h od wybranej daty')
      return false
    }


    return true
  }

  const onSubmit = () => {
    if(validate()) {
      setError('')
      setOnDuty('')
      setAssistance('')
      setDate('')
      const newDuty = {
        personId: onDuty,
        assistantId: assistance,
        date
      }

      addNew(newDuty)
    }
  }

  return (
    <Box display='flex-col' width={500} sx={{borderRadius: 2, background: '#DFD7BF', padding: 2}}>
      <div className="form-line">
        <div style={{width: '200px'}}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Służba</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size='small'
              value={onDuty}
              label="Służba"
              onChange={(e) => setOnDuty(e.target.value)}
            >
              {people.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.firstname} {p.lastname}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{width: '200px'}}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Zastępca</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size='small'
            value={assistance}
            label="Zastępca"
            onChange={(e) => setAssistance(e.target.value)}
          >
            {people.map(p => (
              <MenuItem key={p.id} value={p.id}>{p.firstname} {p.lastname}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
      </div>
      <div className="form-line">
        <TextField
            id="outlined-helperText"
            label="Rozpoczęcie służby"
            size='small'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            helperText="Format DD-MM-YYYY"
          />
      </div>
      <div className="form-line">
        <Button sx={{backgroundColor: '#AF8F6F', "&:hover": {backgroundColor: '#AF8F6F'}}} variant="contained" onClick={() => onSubmit()}>Dodaj służbę</Button>
      </div>
      <div className="form-line">
        <span>{error}</span>
      </div>
    </Box>
  )
}

export default NewDutyForm