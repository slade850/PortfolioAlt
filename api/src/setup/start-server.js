const StartServer = (server) => {
    console.info('SETUP - Starting server..')

    server.listen(3000, (error) => {
        if (error) {
            console.error('ERROR - Unable to start server.')
        } else {
            console.info(`INFO - Server started on http://localhost:${3000} [DEV]`)
        }
    })
}

export default StartServer