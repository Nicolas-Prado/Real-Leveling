import { NextFunction, Request, Response } from "express"
import * as userService from "./../services/UserService"

/*Service functions
    userService.createUser
    userService.deleteUser
    userService.getUser
    userService.getUsers
    userService.updateUser
*/


function getHttpErrorStatusCode(data: {error:{type:string, field:any[], message:string|any[]}}){
    const { error: {type} } = data
    const databaseErrors = ["Error", "ValidationError", "UniqueConstraintError"]

    if(databaseErrors.includes(type)){
        return 400
    } else {
        return 500
    }
}

function invalidRequest(res:Response){
    res.status(400)
    res.json({error: "Invalid request"})
}


export async function createUser(req:Request, res:Response) {
    if(Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await userService.createUser(req.body)
    
    res.status(201)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getUsers(req:Request, res:Response) {
    const params = { 
        limit: parseInt(req.query.limit as string), 
        page: parseInt(req.query.page as string), 
    }
    const data = await userService.getUsers(params.limit && params.page ? params : undefined)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getUser(req:Request, res:Response, next:NextFunction) {
    if(typeof req.query.username !== "string" || typeof req.query.password !== "string"){
        next()
        return
    }

    const data = await userService.getUser(req.query.username, req.query.password)

    res.status(200)
    if(data !== null && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function updateUser(req:Request, res:Response) {
    if(typeof req.params.id === "undefined" || Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await userService.updateUser(parseInt(req.params.id), req.body)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function deleteUser(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await userService.deleteUser(parseInt(req.params.id))

    res.status(200)
    if(typeof data !== 'number' && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}