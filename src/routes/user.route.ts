import express from 'express';
import { User } from '../types/User.type'
import UserService from '../services/user.service'
import passport from 'passport'
import boom from '@hapi/boom'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res, next) => {
    try {
        const user: User = req.body
        if (!user.email || !user.password) {
            throw boom.badRequest('Email and password is required')
        }
        const newUser = await service.create(user)
        res.status(201).json({user: newUser.toClient()})
    } catch(error) {
        next(error)
    }
});

router.get('/all', async(req, res, next) => {
    try {
        const users = await service.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
});

router.post('/', passport.authenticate('local', { session: false}), async (req, res, next) => {
    try {
        const { email } = req.query
        const user = await service.findByEmail(email as string)
        
        res.status(200).json({user})
    } catch(error) {
        next(error)
    }
})

export default router