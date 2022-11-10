import express from 'express'
import { signInUser, signOutUser } from '../controllers/auth.controller'

const router = express.Router()

//create and list the user.
router.route('/signin')
    .post(signInUser)


//get user.
//update a user.
//delete a user.
router.route('/signout')
    .get(signOutUser)


module.exports = router