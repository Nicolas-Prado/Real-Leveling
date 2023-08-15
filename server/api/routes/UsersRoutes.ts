import express from "express"
import * as usersController from "./../controllers/UserController"

const router = express.Router()

router.route('/')
    .post(usersController.createUser)
    .get(usersController.getUsers)

router.route('/:id')
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)
    .get(usersController.getUser)

export = router