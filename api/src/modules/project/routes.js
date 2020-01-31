import express from "express"
const router = express.Router();

import ProjectController from './controller'

router.get('/all', ProjectController.allProjects);

export default router