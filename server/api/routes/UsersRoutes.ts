import express from "express"
import * as userController from "./../controllers/UserController"

const router = express.Router()

router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers)

router.route('/:id')
    .put(userController.updateUser)
    .delete(userController.deleteUser)
    .get(userController.getUser)

export = router