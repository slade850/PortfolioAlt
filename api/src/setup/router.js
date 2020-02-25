import express from "express"

import projectRoutes from "../modules/project/routes"
import pageRoutes from '../modules/page/routes'
import userRoutes from '../modules/user/routes'

const Router = (app) => {
    var apiRoutes = express.Router();

    // Home route. We'll end up changing this to our main front end index later.
    app.get('/', function (req, res) {
        res.send('This Route is not yet defined.');
    });

    app.use('/api/', apiRoutes);

    //Project router
    app.use('/api/project', projectRoutes);
    app.use('/api/pages', pageRoutes);
    app.use('/api/user', userRoutes)
}

export default Router

