import Header from "./components/Header";
import { Box, Alert } from "@mui/material";
import NewPersonForm from "./components/NewPersonForm";
import PersonInfo from "./components/PersonInfo";
import { useEffect, useState } from "react";
import { Person, NewPerson, NewDuty, Duty } from "./types";
import NewDutyForm from "./components/NewDutyForm";
import DutyInfo from "./components/DutyInfo";
import { hasPersonGotDuty } from "./utils/utils";


function App() {

  const [content, setContent] = useState<boolean>(true)
  const [personList, setPersonList] = useState<Person[]>([])
  const [dutyList, setDutyList] = useState<Duty[]>([])
  const [alert, setAlert] = useState<boolean>(false)

  console.log(process.env.REACT_APP_BACKEND_CONNECTION)

  useEffect(() => {
    const getPeople = async () => {
      const people = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/person`)
      const data: Person[] = await people.json()
      setPersonList(data)
      return data
    }
    const getDuty = async () => {
      const duty = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/duty/`)
      const data: Duty[] = await duty.json()
      setDutyList(data)
      return data
    }
    getPeople()
    getDuty()
  }, [])

  const changeContent = (content: boolean) => {
      setContent(content)
  }

  const addPerson = async (person: NewPerson) => {
    const request = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/person`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    })
    const newPerson = await request.json()
    setPersonList((prev) => [...prev, newPerson])
  }

  const deletePerson = async (id: string) => {
    if(!hasPersonGotDuty(id, dutyList)) {
      setAlert(true)
      return false
    }
    const request = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/person/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const updatedList = personList.filter(p => p.id !== id)
    setPersonList(updatedList)
  }

  const addDuty = async (duty: NewDuty) => {
    const request = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/duty`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duty)
    })
    const newDuty = await request.json()
    setDutyList((prev) => [...prev, newDuty])
  }

  const deleteDuty = async (id: string) => {
    const request = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/duty/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const updatedList = dutyList.filter(d => d.id !== id)
    setDutyList(updatedList)
  }

  const editDuty = async (duty: NewDuty, id?: string ) => {
    const request = await fetch(`${process.env.REACT_APP_BACKEND_CONNECTION}/api/duty/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duty)
    })
    const editedDuty: Duty = await request.json()
    const updatedList = dutyList.filter(d => d.id !== id)
    const newList: Duty[] = [...updatedList, editedDuty]
    setDutyList(newList)
  }


  const emptyData = <Box width={600}>Dodaj rekordy</Box>
  const peopleDisplay = personList.length ? personList.map(p => (<PersonInfo person={p} deletePerson={deletePerson}/>)) : emptyData
  const dutyDisplay = dutyList.length ? 
    dutyList.map(d => <DutyInfo people={personList} editDuty={editDuty} duty={d} deleteDuty={deleteDuty} dutyList={dutyList}/>) 
    : emptyData


  return (
    <div className="App">
        <Header change={changeContent}/>
        {content ? 
        <Box display='flex' width='full' mt={6} justifyContent='space-around'>
            <div className="forms">
                <NewPersonForm addNew={addPerson}/>
            </div>
            <Box className='scrolled' display='flex-col' sx={{maxHeight: '400px',background: '#DFD7BF', padding: 2, borderRadius: 2, overflowY: 'auto'}}>
                {peopleDisplay}
            </Box>
        </Box>
        :
        <Box display='flex' width='full' mt={6} justifyContent='space-around'>
            <div className="forms">
                <NewDutyForm people={personList} addNew={addDuty} dutyList={dutyList}/>
            </div>
            <Box className='scrolled' display='flex-col' sx={{maxHeight: '400px',background: '#DFD7BF',padding: 2, borderRadius: 2, overflowY: 'auto'}}>
                {dutyDisplay}
            </Box>
        </Box>
        }
        {alert && 
          <Alert variant="outlined" severity="error" onClick={() => setAlert(false)}
            sx={{width: '400px', 
            position: 'fixed', 
            right: '0', 
            bottom: '0',
            marginBottom: '1%',
            marginRight: '1%',
            cursor: 'pointer'}}>
            Nie można usunąć tej osoby, ponieważ ma aktywne służby
          </Alert>
        }
    </div>
  );
}

export default App;
