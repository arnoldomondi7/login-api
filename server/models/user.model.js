import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name Is Required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email Is Required',
        trim: true,
        unique: 'Email Already Exists',
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 99,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        Date
    }
})

const userData = model('User', UserSchema)

export default userData