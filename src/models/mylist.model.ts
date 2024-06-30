import { Schema, model } from "mongoose"
import { MyList, MyListModel } from "../types/MyList.type"

export const MYLIST_REFERENCE = 'MyList'

const MiLista = new Schema<MyList, MyListModel>({
    titulo: {
        type: String,
        required: true,
        unique: false,
        index: true,
        trim: true
    },
    temporadas: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    plataforma: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: false
    }
})

export default model(MYLIST_REFERENCE, MiLista)