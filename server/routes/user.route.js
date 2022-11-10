import express from 'express'
import {
    createUser,
    deleteUser,
    getUsers,
    readUser,
    updateUser,
    userById
} from '../controllers/user.controller'

const router = express.Router()

//create and list the user.
router.route('/users')
    .post(createUser)
    .get(getUsers)

//get user.
//update a user.
//delete a user.
router.route('/users/:userId')
    .get(readUser)
    .put(updateUser)
    .delete(deleteUser)

//handle the id part.
router.param('userId', userById)

module.exports = router