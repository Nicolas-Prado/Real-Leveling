import express from "express"
import * as titleController from "./../controllers/TitleController"

const router = express.Router()

router.route('/')
    .post(titleController.createTitle)
    .get(titleController.getTitles)

router.route('/:id')
    .put(titleController.updateTitle)
    .delete(titleController.deleteTitle)
    .get(titleController.getTitle)

export = router