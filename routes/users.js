import { Router } from "express"
import {findUserById} from "../controllers/Users.js"
/* GET users listing. */
const router = Router()

router.get('/:id', findUserById ) 

export default router;
