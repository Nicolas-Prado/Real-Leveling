import { where } from "sequelize";
import Configuration from "../models/ConfigurationModel";

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

export function createConfiguration(configurationJSON: {}){
    const newConfiguration = Configuration.build(configurationJSON)
    return newConfiguration.save().catch(generateErrorJSON)
}

export async function getConfigurations(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return Configuration.findAll().catch(generateErrorJSON)
    
    try{
        const configurationAmount = await Configuration.count()

        const totalPages = Math.ceil(configurationAmount/params.limit)

        const rows = await Configuration.findAll({
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

export function getConfiguration(id:number) {
    return Configuration.findByPk(id).catch(generateErrorJSON)
}

export function updateConfiguration(id:number, configurationJSON:{}){
    return Configuration.update(configurationJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteConfiguration(id:number){
    return Configuration.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}