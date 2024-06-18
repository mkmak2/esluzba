import express from 'express'
import dutyControllers from '../controllers/duty'
const router = express.Router()

router.post('/', dutyControllers.addDuty)
router.delete('/:id', dutyControllers.deleteDuty)
router.get('/', dutyControllers.getAll)
router.patch('/:id', dutyControllers.editDuty)

export default router