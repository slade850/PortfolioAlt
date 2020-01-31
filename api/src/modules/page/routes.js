import express from "express"
const router = express.Router();

import PageController from './controller'

router.get('/', PageController.allPages);
router.get('/:id', PageController.pageById);

export default router