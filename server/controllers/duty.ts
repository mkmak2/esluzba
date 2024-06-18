import { Request, Response } from "express";
import prisma from '../prisma/client'

const addDuty = async (req: Request, res: Response) => {
    const {personId, assistantId, date} = req.body

    const duty = await prisma.duty.create({
        data: {
            personId,
            assistantId,
            date
        },
        include: {
            onDuty: true,
            assistant: true
        }
    })

    return res.status(201).json(duty)
}

const deleteDuty =  async (req: Request, res: Response) => {
    const {id} = req.params

    const duty = await prisma.duty.findUnique({where: {id}})
    if(!duty) return res.status(404).json({error: "Not found"})

    const deleteDuty = await prisma.duty.delete({
        where: {id: duty.id}
    })

    return res.status(200).json(deleteDuty)
}

const getAll = async (req: Request, res: Response) => {
    const duty = await prisma.duty.findMany({
        include: {
            onDuty: true,
            assistant: true,
        }
    })

    return res.status(200).json(duty)
}

const editDuty = async (req: Request, res: Response) => {
    const {id} = req.params
    const {personId, assistantId, date} = req.body

    const duty = await prisma.duty.findUnique({
        where: {
            id
        }
    })

    if(!duty) return res.status(404).json('Not found')

    const updatedDuty = await prisma.duty.update({
        where: {
            id: duty.id
        },
        data: {
            personId,
            assistantId,
            date
        },
        include: {
            onDuty: true,
            assistant: true
        }
    })

    return res.status(203).json(updatedDuty)
}

export default {
    addDuty,
    deleteDuty,
    getAll,
    editDuty
}