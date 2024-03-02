import express from 'express';
import passport from 'passport';
import UserService from '../services/user.service';
import { UserRequestType as RequestType } from '../types/User.type';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const router = express.Router();
const service = new UserService();

router.post('/login', passport.authenticate('local', { session: false}), async (req: RequestType, res, next) => {
    try {
        const { user } = req;
        //sub is the id of the subscribed user
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret);
        
        res.status(200).json({user, token})
    } catch(error) {
        next(error)
    }
})

export default router