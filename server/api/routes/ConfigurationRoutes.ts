import express from "express"
import * as configurationController from "./../controllers/ConfigurationController"

const router = express.Router()

router.route('/')
    .post(configurationController.createConfiguration)
    .get(configurationController.getConfigurations)

router.route('/:id')
    .put(configurationController.updateConfiguration)
    .delete(configurationController.deleteConfiguration)
    .get(configurationController.getConfiguration)

export = router