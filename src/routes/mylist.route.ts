import express from 'express'
import { MyList } from '../types/MyList.type'
import MyListService from '../services/mylist.service'
import passport from 'passport'
import { User, JwtRequestType } from '../types/User.type'

const router = express.Router()
const service = new MyListService()

router.post('/', passport.authenticate('jwt', { session: false}), async(req: JwtRequestType, res) => {
    const mylist: MyList = req.body
    
    const newMyList = await service.create(mylist)
    
    res.status(201).json(newMyList)
})

router.get('/all', async(req: JwtRequestType, res, next) => {
    try {
        const { user } = req
        console.log(user)
        const milista = await service.findAll()
        res.status(200).json(milista)
    } catch (error) {
        next(error)
    }
});

router.get('/registro/:id', async (req, res, next) => {
    try {
        const mylista = await service.findById(req.params.id)
        res.status(200).json(mylista)
    } catch (error) {
        next(error)
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    try {
        const mylista = await service.deleteById(req.params.id)
        res.status(200).json(mylista)
    } catch (error) {
        next(error)
    }
});

router.post('/editar/:id', async (req, res, next) => {
    try {
        const mylist: MyList = req.body
        const newMyList = await service.editById(req.params.id, mylist)
        res.status(201).json(newMyList)
    } catch (error) {
        next(error)
    }
});

router.get('/user/:user', async (req: JwtRequestType, res) => {
    try {
        const user = req.params.user
        const milista = await service.findByUser(user)
        res.status(200).json(milista)
    } catch (error) {
        console.error('Error al buscar por user:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

export default router