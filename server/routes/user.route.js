import express from 'express'

import {
    createUser,
    deleteUser,
    getUsers,
    readUser,
    updateUser,
    userById
} from '../controllers/user.controller'
//protected routes.
import { hasAuthorization, requireSignIn } from '../controllers/auth.controller'

const router = express.Router()

//create the user.
router.route('/signup')
    .post(createUser)
//list the user.
router.route('/users')
    .get(getUsers)

//get user.
//update a user.
//delete a user.
router.route('/users/:userId')
    .get(requireSignIn, readUser)
    .put(requireSignIn, hasAuthorization, updateUser)
    .delete(requireSignIn, hasAuthorization, deleteUser)

//handle the id part.
router.param('userId', userById)

module.exports = router