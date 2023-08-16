import { where } from "sequelize";
import HistoryLin from "../models/HistoryLinModel";

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

export function createHistoryLin(historyLinJSON: {arc:string, periody:string, desc:string}){
    const newHistoryLin = HistoryLin.build(historyLinJSON)
    return newHistoryLin.save().catch(generateErrorJSON)
}

export async function getHistoriesLin(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return HistoryLin.findAll().catch(generateErrorJSON)
    
    try{
        const historyLinAmount = await HistoryLin.count()

        const totalPages = Math.ceil(historyLinAmount/params.limit)

        const rows = await HistoryLin.findAll({
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

export function getHistoryLin(id:number) {
    return HistoryLin.findByPk(id).catch(generateErrorJSON)
}

export function updateHistoryLin(id:number, historyLinJSON:{arc?:string, periody?:string, desc?:string}){
    return HistoryLin.update(historyLinJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteHistoryLin(id:number){
    return HistoryLin.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}