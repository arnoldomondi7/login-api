import User from '../models/user.model'
import extend from 'lodash/extend'
import { hashPassword, comparePassword } from '../helpers/auth'

export const createUser = async (req, res) => {
    const user = new User(req.body)//get data from the user
    try {
        //save the data.
        await user.save()
        //send the res to the client.
        return res.status(201).json({
            message: 'User Successfully Signed Up'
        })
    } catch (error) {
        return res.status(400).json({
            error: 'Unable To Sign in Try Again.'
        })
    }

}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('name email updated created')
        //send the response to the frontend.
        res.json(users)
    } catch (error) {
        return res.status(400).json({
            error: 'Unable To Load The Users Try Again.'
        })
    }
}

//handle the user by if.
export const userById = async (req, res, next, id) => {
    try {
        //find the users by id.
        let user = await User.findById(id)

        //handle the error if the user does not exist.
        if (!user) {
            return res.status('400').json({
                error: "User not found"
            })
        }

        //what to de if the user is found.
        //put the user details in the created var (req.profile)
        req.profile = user

        //go on to the next function.
        next()
    } catch (error) {
        return res.status(400).json({
            error: 'Unable To Load The Users Try Again.'
        })
    }
}

export const readUser = async (req, res) => {
    //hash the password.
    req.profile.password = undefined
    //return to the front end.
    res.json(req.profile)
}

export const updateUser = async (req, res) => {
    try {
        //get the profile data to the user
        let user = req.profile
        //update the data 
        user = extend(user, req.body)
        //update the date
        user.updated = Date.now()
        //save the data.
        await user.save()
        //remove the password
        user.password = undefined
        //send the res.
        res.json(user)
    } catch (error) {
        return res.status(400).json({
            error: 'Faild To Update The User'
        })
    }
}

export const deleteUser = async (req, res) => {

}