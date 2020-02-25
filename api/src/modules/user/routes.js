import express from "express"
const router = express.Router();

import UserController from './controller'

router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);

export default router