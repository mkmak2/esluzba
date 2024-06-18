import { Request, Response } from "express";
import prisma from '../prisma/client'


const addPerson = async (req: Request, res: Response) => {
    const {firstname,lastname,degree,company,section} = req.body

    const person = await prisma.person.create({
        data: {
            firstname,
            lastname,
            degree,
            company,
            section
        }
    })

    return res.status(201).json(person)
}

const deletePerson =  async (req: Request, res: Response) => {
    const {id} = req.params

    const person = await prisma.person.findUnique({where: {id}})
    if(!person) return res.status(404).json({error: "Not found"})

    const deletePerson = await prisma.person.delete({
        where: {id: person.id}
    })

    return res.status(200).json(deletePerson)
}

const getAll = async (req: Request, res: Response) => {
    const people = await prisma.person.findMany()

    return res.status(200).json(people)
}

export default {
    addPerson,
    deletePerson,
    getAll
}