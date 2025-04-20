import { Router } from "express"
import {findUserById} from "../controllers/Users.js"
import { Login, Logout } from "../sessionMgt.js"
/* GET users listing. */
const router = Router()

router.get('/:id', findUserById )

router.post("/login", Login)

router.get("/session/logout", Logout)

export default router;
