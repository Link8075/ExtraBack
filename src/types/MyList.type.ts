import type { Model } from "mongoose"

export type MyList = {
    id?: string
    titulo: string
    temporadas: string
    descripcion: string
    plataforma: string
    user: string
}

export type MyListModel = Model<MyList>