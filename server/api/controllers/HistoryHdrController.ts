import { Request, Response } from "express"
import * as historyHdrService from "../services/HistoryHdrService"

/*Service functions
    historyHdrService.createHistoryHdr
    historyHdrService.deleteHistoryHdr
    historyHdrService.getHistoryHdr
    historyHdrService.getHistoriesHdr
    historyHdrService.updateHistoryHdr
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


export async function createHistoryHdr(req:Request, res:Response) {
    if(Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await historyHdrService.createHistoryHdr(req.body)
    
    res.status(201)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getHistoriesHdr(req:Request, res:Response) {
    const params = { 
        limit: parseInt(req.query.limit as string), 
        page: parseInt(req.query.page as string), 
    }
    const data = await historyHdrService.getHistoriesHdr(params.limit && params.page ? params : undefined)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function getHistoryHdr(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await historyHdrService.getHistoryHdr(parseInt(req.params.id))

    res.status(200)
    if(data !== null && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function updateHistoryHdr(req:Request, res:Response) {
    if(typeof req.params.id === "undefined" || Object.entries(req.body).length === 0){
        invalidRequest(res)
        return
    }

    const data = await historyHdrService.updateHistoryHdr(parseInt(req.params.id), req.body)

    res.status(200)
    if('error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

export async function deleteHistoryHdr(req:Request, res:Response) {
    if(typeof req.params.id === "undefined"){
        invalidRequest(res)
        return
    }

    const data = await historyHdrService.deleteHistoryHdr(parseInt(req.params.id))

    res.status(200)
    if(typeof data !== 'number' && 'error' in data)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}