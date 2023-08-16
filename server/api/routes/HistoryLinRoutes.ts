import express from "express"
import * as historyLinController from "./../controllers/HistoryLinController"

const router = express.Router()

router.route('/')
    .post(historyLinController.createHistoryLin)
    .get(historyLinController.getHistoriesLin)

router.route('/:id')
    .put(historyLinController.updateHistoryLin)
    .delete(historyLinController.deleteHistoryLin)
    .get(historyLinController.getHistoryLin)

export = router