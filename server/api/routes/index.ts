import express from "express";
import userRouter from "./UserRoutes";
import characterRouter from "./CharacterRoutes"
import configurationRouter from "./ConfigurationRoutes"
import titleRouter from "./TitleRoutes"
import historyHdrRouter from "./HistoryHdrRoutes"
import historyLinRouter from "./HistoryLinRoutes"
import bondRouter from "./BondRoutes"
import desireRouter from "./DesireRoutes"
import taskRouter from "./TaskRoutes"

const rootRoutes = express.Router()

rootRoutes.use('/users', userRouter)
rootRoutes.use('/characters', characterRouter)
rootRoutes.use('/configurations', configurationRouter)
rootRoutes.use('/titles', titleRouter)
rootRoutes.use('/historiesHdr', historyHdrRouter)
rootRoutes.use('/historiesLin', historyLinRouter)
rootRoutes.use('/bonds', bondRouter)
rootRoutes.use('/desires', desireRouter)
rootRoutes.use('/tasks', taskRouter)

export = rootRoutes