import User from '../models/user.model'
import config from '../config/config.config'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt"
import { comparePassword } from '../helpers/auth'

export const signInUser = async (req, res) => {
    //destructure the email and password.
    const { email, password } = req.body

    try {
        //check if the db has the email 
        let user = await User.findOne({ email })

        //handle the user.
        if (!user) {
            return res.status('401').json({ error: "User not found" })
        }

        //if pk compare the password.
        const match = await comparePassword(password, user.password)

        //handle the error.
        if (!match) {
            return res.json({
                error: "Invalid Password, Try Again.",
            })
        }

        //if there is then create the signed token.

        const token = jwt.sign({ _id: user._id }, config.jwtSecret,)

        //the cookie handles the expiry date.
        res.cookie('t', token, { expire: new Date() + 999 })

        //send to the frontend.
        return res.json({
            token, user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

export const signOutUser = async (req, res) => {
    res.clearCookie('t')
    return res.status('200').json({
        message: 'User Signed Out'
    })
}

export const requireSignIn = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
})


export const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id

    //req.auth comes from the express-jwt,

    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }

    next()
}