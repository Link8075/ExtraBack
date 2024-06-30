import MiLista from '../models/mylist.model'
import { MyList } from '../types/MyList.type';
import boom from '@hapi/boom';

class MyListService {
    async create(mylist: MyList) {
        const newMyList = await MiLista.create({...mylist}).catch((error) => {
            console.log('Could not save watches', error)
        })
        return newMyList
    }
    
    async findAll() {
        const milista = await MiLista.find().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        
        if (!milista) {
            throw boom.notFound('There are not watches')
        }
        
        return milista
    }
    
    async findById(id: string) {
        const mylist = await MiLista.findById(id).catch((error) => {
            console.log('Error while connecting to the BD', error)
        })
        
        if (!mylist) {
            throw boom.notFound('Watching not found')
        }
        
        return mylist
    }
    
    async deleteById(id: string) {
        const mylist = await MiLista.findByIdAndDelete(id).catch((error) => {
            console.log('Error while connecting to the BD', error)
        })
        if (!mylist) {
            throw boom.notFound('Watching not found')
        }
        return mylist;
    }
    
    async editById(id: string, mylist: MyList) {
        const newMyList = await MiLista.findByIdAndUpdate(id, { $set: mylist }, { new: true }).catch((error) => {
            console.log('Error while connecting to the BD', error)
        })
        if (!newMyList) {
            throw boom.notFound('Watching not found')
        }
        return newMyList
    }
    
    async findByUser(user: string) {
        try {
            const milista = await MiLista.find({ user: user })
            return milista
        } catch (error) {
            console.error('Error al buscar por user:', error)
            throw error;
        }
    }
}

export default MyListService