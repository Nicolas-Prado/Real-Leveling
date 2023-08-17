import { where } from "sequelize";
import User from "../models/UserModel";

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

export async function createUser(userJSON: {username: string, password: string}){
    const newUser = User.build(userJSON)
    return newUser.save().catch(generateErrorJSON)
}

export async function getUsers(params:{limit: number, page: number}|undefined) {
    if(typeof params === 'undefined')
        return User.findAll().catch(generateErrorJSON)
    
    try{
        const userAmount = await User.count()

        const totalPages = Math.ceil(userAmount/params.limit)

        const rows = await User.findAll({
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

export function getUser(username:string, password:string) {
    return User.findOne({
        where: {
            username: username,
            password: password
        }
    }).catch(generateErrorJSON)
}

export function updateUser(id:number, userJSON:{username?:string, password?:string}){
    return User.update(userJSON, {
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}

export function deleteUser(id:number){
    return User.destroy({
        where: {
            id: id
        }
    }).catch(generateErrorJSON)
}