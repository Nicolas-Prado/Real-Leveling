import { Request, Response } from "express"
import * as characterService from "./../services/CharacterService"

/*Service functions
    characterService.createCharacter
    characterService.deleteCharacter
    characterService.getCharacter
    characterService.getCharacters
    characterService.updateCharacter
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


export async function createCharacter(req:Request, res:Response) {
    if(Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await characterService.createCharacter(req.body)
    
    res.status(201)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function improvedCreateCharacter(req:Request, res:Response) {
    if(Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await characterService.improvedCreateCharacter(req, res)

    res.status(201)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))
    
    res.json(data)
}

export async function getCharacters(req:Request, res:Response) {
    const params = { 
        limit: parseInt(req.query.limit as string), 
        page: parseInt(req.query.page as string), 
        userId: parseInt(req.query.userid as string)
    }
    const data = await characterService.getCharacters(params.limit && params.page ? params : undefined)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getCharactersWithTitleAndLevel(req:Request, res:Response) {
    const params = { 
        limit: parseInt(req.query.limit as string), 
        page: parseInt(req.query.page as string), 
        userId: parseInt(req.query.userid as string)
    }
    const data = await characterService.getCharactersWithTitleAndLevel(params.limit && params.page ? params : undefined)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getCharacter(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await characterService.getCharacter(parseInt(req.params.id))

    res.status(200)
    if(data !== null && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function updateCharacter(req:Request, res:Response) {
    if(typeof req.params.id === "undefined" || Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await characterService.updateCharacter(parseInt(req.params.id), req.body)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function deleteCharacter(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await characterService.deleteCharacter(parseInt(req.params.id))

    res.status(200)
    if(typeof data !== 'number' && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}