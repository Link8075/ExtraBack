import express from 'express'
import UserService from '../services/user.service'
import { UserRequestType as RequestType, User } from '../types/User.type'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const router = express.Router()
const service = new UserService()

router.post('/login', async (req: RequestType, res, next) => {
    try {
        const user: User = req.body
        if (!user) {
            return res.status(400).json({ message: 'Usuario no válido' })
        }
        const payload = { sub: user.id }
        const dbUser = await service.findByEmail(user.email)
        const token = jwt.sign(payload, config.jwtSecret)
        res.status(200).json({ user: dbUser.toClient(), token })
    } catch (error) { 
        console.log(error)
        next(error)
    }
})

export default router