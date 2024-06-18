import express from 'express'
import personController from '../controllers/person'

const router = express.Router()

router.get('/', personController.getAll)
router.post('/', personController.addPerson)
router.delete('/:id', personController.deletePerson)

export default router