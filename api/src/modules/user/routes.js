import express from "express"
import connectJwt from '../../middle/connectJwt';
const router = express.Router();

import UserController from './controller'

router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/user', connectJwt.allUser, UserController.userCall)

export default router