import { Router } from "express"
import { list, create, update, remove } from "../controllers/charactersController"

const router = Router()

router.get('/:id?', list)
router.post('/', create)
router.put('/', update)
router.delete('/', remove)

export default router