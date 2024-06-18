import { Box, TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material'
import React, { useState } from 'react'
import { NewPerson } from '../types'

interface Props {
    addNew: (person: NewPerson) => void
}

const NewPersonForm = ({addNew}: Props) => {

    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [degree, setDegree] = useState<string>('')
    const [company, setCompany] = useState<string>('')
    const [section, setSection] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onSubmit = (e: any) => {
        e.preventDefault()

        if(!firstname ||
            !lastname ||
            !degree ||
            !company ||
            !section
        ) {

            setError('Uzupełnij wszytskie pola')
            return 
        }

        const newPerson = {
            firstname,
            lastname,
            degree,
            company: parseInt(company),
            section: parseInt(section)
        }

        setFirstname('')
        setLastname('')
        setDegree('')
        setCompany('')
        setSection('')
        setError('')

        addNew(newPerson)
    }

  return (
    <Box display='flex-col' sx={{borderRadius: 2, background: '#DFD7BF', padding: 2}}>
        <div className='form-line'>
            <TextField value={firstname} onChange={(e) => setFirstname(e.target.value)} id="outlined-basic" label="Imie" variant="outlined" size='small' sx={{marginRight: 5}} />
            <TextField value={lastname} onChange={(e) => setLastname(e.target.value)} id="outlined-basic" label="Nazwisko" variant="outlined" size='small' />
        </div>
        <div className='form-line'>
            <div style={{width: '100px'}}>
                <FormControl fullWidth>
                <InputLabel id="demo-select-small">Stopień</InputLabel>
                    <Select
                    sx={{minWidth: 20}}
                    id="demo-select-small"
                    value={degree}
                    label="Stopień"
                    size='small'
                    onChange={(e) => setDegree(e.target.value) }
                >
                        <MenuItem value={'szer.pchor'}>szer.pchor</MenuItem>
                        <MenuItem value={'st.szer.pchor'}>st.szer.pchor</MenuItem>
                        <MenuItem value={'kpr.pchor'}>kpr.pchor</MenuItem>
                        <MenuItem value={'st.kpr.pchor'}>st.kpr.pchor</MenuItem>
                        <MenuItem value={'plut.pchor'}>plut.pchor</MenuItem>
                        <MenuItem value={'sierz.pchor'}>sierz.pchor</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-select-small">Kompania</InputLabel>
                    <Select
                    id="demo-select-small"
                    value={company}
                    label="Kompania"
                    size='small'
                    onChange={(e) => setCompany(e.target.value) }
                >
                        <MenuItem value={4}>4</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{width: '100px'}}>
                <FormControl fullWidth >
                    <InputLabel id="demo-select-small">Pluton</InputLabel>
                    <Select
                    id="demo-select-small"
                    value={section}
                    label="Pluton"
                    size='small'
                    onChange={(e) => setSection(e.target.value) }
                >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div >
        <div className='form-line'>
            <Button sx={{backgroundColor: '#AF8F6F', "&:hover": {backgroundColor: '#AF8F6F'}}} variant="contained" onClick={(e) => onSubmit(e)}>Dodaj</Button>
        </div>
        <div className="form-line">
            <span>{error}</span>
        </div>
    </Box>
  )
}

export default NewPersonForm