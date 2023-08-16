import { Request, Response } from "express"
import * as titleService from "./../services/TitleService"

/*Service functions
    titleService.createTitle
    titleService.deleteTitle
    titleService.getTitle
    titleService.getTitles
    titleService.updateTitle
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


export async function createTitle(req:Request, res:Response) {
    if(Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await titleService.createTitle(req.body)
    
    res.status(201)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getTitles(req:Request, res:Response) {
    const params = { 
        limit: parseInt(req.query.limit as string), 
        page: parseInt(req.query.page as string), 
    }
    const data = await titleService.getTitles(params.limit && params.page ? params : undefined)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getTitle(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await titleService.getTitle(parseInt(req.params.id))

    res.status(200)
    if(data !== null && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function updateTitle(req:Request, res:Response) {
    if(typeof req.params.id === "undefined" || Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await titleService.updateTitle(parseInt(req.params.id), req.body)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function deleteTitle(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await titleService.deleteTitle(parseInt(req.params.id))

    res.status(200)
    if(typeof data !== 'number' && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}