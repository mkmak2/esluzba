export type Person = {
    id: string
    firstname: string
    lastname: string
    degree: string
    company: number
    section: number
}

export type NewPerson ={
    firstname: string
    lastname: string
    degree: string
    company: number
    section: number
}

export type Duty = {
    id: string
    onDuty: Person
    assistant: Person
    date: string
}

export type NewDuty = {
    personId: string
    assistantId: string
    date: string
}