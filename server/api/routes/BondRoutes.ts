import express from "express"
import * as bondController from "./../controllers/BondController"

const router = express.Router()

router.route('/')
    .post(bondController.createBond)
    .get(bondController.getBonds)

router.route('/:id')
    .put(bondController.updateBond)
    .delete(bondController.deleteBond)
    .get(bondController.getBond)

export = router