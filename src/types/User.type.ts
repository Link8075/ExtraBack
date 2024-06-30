import type { Model, ObjectId } from 'mongoose'
import type { Request } from 'express'

export type User = ToClientUser & {
    password: string
    createdAt?: Date
    lastModified?: Date
}

export type UserRequestType = Request & {
    user: User
}

export type JwtRequestType = Request & {
    user: {
        sub: ObjectId
    }
}

export type ToClientUser = {
    id?: string
    name: string
    email: string
    phoneNumber?: string
}

export type UserMethods = {
    toClient: () => ToClientUser
}

export type UserModel = Model<User, {}, UserMethods>