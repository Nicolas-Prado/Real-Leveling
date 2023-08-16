import { Request, Response } from "express"
import * as configurationService from "./../services/ConfigurationService"

/*Service functions
    configurationService.createConfiguration
    configurationService.deleteConfiguration
    configurationService.getConfiguration
    configurationService.getConfigurations
    configurationService.updateConfiguration
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


export async function createConfiguration(req:Request, res:Response) {
    if(Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await configurationService.createConfiguration(req.body)
    
    res.status(201)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getConfigurations(req:Request, res:Response) {
    const params = { 
        limit: parseInt(req.query.limit as string), 
        page: parseInt(req.query.page as string), 
    }
    const data = await configurationService.getConfigurations(params.limit && params.page ? params : undefined)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getConfiguration(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await configurationService.getConfiguration(parseInt(req.params.id))

    res.status(200)
    if(data !== null && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function updateConfiguration(req:Request, res:Response) {
    if(typeof req.params.id === "undefined" || Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await configurationService.updateConfiguration(parseInt(req.params.id), req.body)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function deleteConfiguration(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await configurationService.deleteConfiguration(parseInt(req.params.id))

    res.status(200)
    if(typeof data !== 'number' && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}