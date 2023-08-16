import { where } from "sequelize";
import HistoryHdr from "../models/HistoryHdrModel";

function generateErrorJSON(err:any){
    const errorJSON = {
        error: {
            type: err.constructor.name,
            field: err.errors?.map((error:any) => error.path),
            message: err.parent?.sqlMessage || err.errors?.map((error:any) => error.message)
        }
    }

    return errorJSON
}

export function createHistoryHdr(historyHdrJSON: {synopsis:string}){
    const newHistoryHdr = HistoryHdr.build(historyHdrJSON)
    return newHistoryHdr.save().catch(generateErrorJSON)
}

export async function getHistoriesHdr(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return HistoryHdr.findAll().catch(generateErrorJSON)
    
    try{
        const historyHdrAmount = await HistoryHdr.count()

        const totalPages = Math.ceil(historyHdrAmount/params.limit)

        const rows = await HistoryHdr.findAll({
            limit: params.limit,
            offset: (params.page-1) * params.limit,
        })

        const responseBody = {
            results: rows,
            totalPages: totalPages,
            currentPage: params.page
        }

        return responseBody

    } catch (err:any) {
        return generateErrorJSON(err)
    }
}

export function getHistoryHdr(id:number) {
    return HistoryHdr.findByPk(id).catch(generateErrorJSON)
}

export function updateHistoryHdr(id:number, historyHdrJSON:{synopsis?:string}){
    return HistoryHdr.update(historyHdrJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteHistoryHdr(id:number){
    return HistoryHdr.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}