import Users from '../models/user.model'
import { User, UserModel } from '../types/User.type'
import boom from '@hapi/boom'
import bcrytp from 'bcrypt'

class UserService {
    async create(user: User) {
        const hashedPassword = await bcrytp.hash(user.password, 10);
        const newUser = await Users.create({...user, password: hashedPassword}).catch((error) => {
            console.log('Could not save user', error)
        })
        if (!newUser) {
            throw boom.badImplementation('No se pudo crear el usuario')
        }
        return newUser
    }

    async findByEmail(email: string) {
        const user = await Users.findOne({email}).catch((error) => {
            console.log('Could not rebrieve user info', error)
        })
        if (!user) {
            throw boom.notFound('Cuenta no encontrada')
        }
        return user
    }
    
    async findAll() {
        const users = await Users.find().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        
        if (!users) {
            throw boom.notFound('There are not users')
        }
        return users
    }
}

export default UserService