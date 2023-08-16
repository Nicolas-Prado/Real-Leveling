import express from "express"
import * as taskController from "./../controllers/TaskController"

const router = express.Router()

router.route('/')
    .post(taskController.createTask)
    .get(taskController.getTasks)

router.route('/:id')
    .put(taskController.updateTask)
    .delete(taskController.deleteTask)
    .get(taskController.getTask)

export = router