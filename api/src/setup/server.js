// Imports
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'


const server = (server) => {
    console.info('SETUP - Loading modules...')

    // Enable CORS
    server.use(cors())

    // Request body parser
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))

    // Request body cookie parser
    server.use(cookieParser())

    server.use(morgan('tiny'))

    server.get("/", (req, res) => {
        console.log(req);
        res.send(200, 'Super, vous avez réussi à lancer votre route par défaut');
    })

}

export default server;