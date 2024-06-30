import type { Model } from "mongoose"

export type Watching = {
    id?: string
    serie: string
    temporada: string
    capitulo: string
    duracion?: string
    checkpoint: string
    user: string
}

export type WatchingModel = Model<Watching>