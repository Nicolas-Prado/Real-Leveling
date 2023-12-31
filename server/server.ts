import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import server from "./config/express"
import rootRoutes from "./api/routes";

server.use(function(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(403).json({ error: 'No credentials sent!' })
    }

    const authParts = authHeader.split(' ');

    if (authParts.length !== 2 || authParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    const token = authParts[1];

    if(token !== 'ELPSYKONGROO'){
        return res.status(401).json({ error: 'Invalid authorization' })
    }

    next()
})

server.get('/', (req, res) => {
    res.send("El Psy Kongroo!")
})

server.use('/', rootRoutes)

server.use('/uploads', express.static('uploads'))

const port = process.env.PORT
server.listen(port, () => {
    console.log("Server running in port: " + port)
})