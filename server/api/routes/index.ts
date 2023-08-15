import express from "express";
import userRouter from "./UsersRoutes";

const rootRoutes = express.Router()

rootRoutes.use('/users', userRouter)

export = rootRoutes