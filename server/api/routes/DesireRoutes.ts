import express from "express"
import * as desireController from "./../controllers/DesireController"

const router = express.Router()

router.route('/')
    .post(desireController.createDesire)
    .get(desireController.getDesires)

router.route('/:id')
    .put(desireController.updateDesire)
    .delete(desireController.deleteDesire)
    .get(desireController.getDesire)

export = router