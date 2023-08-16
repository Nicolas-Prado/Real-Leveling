import express from "express"
import * as historyHdrController from "./../controllers/HistoryHdrController"

const router = express.Router()

router.route('/')
    .post(historyHdrController.createHistoryHdr)
    .get(historyHdrController.getHistoriesHdr)

router.route('/:id')
    .put(historyHdrController.updateHistoryHdr)
    .delete(historyHdrController.deleteHistoryHdr)
    .get(historyHdrController.getHistoryHdr)

export = router