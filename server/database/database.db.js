import mongoose from 'mongoose'
import config from '../config/config.config'

const connectToDb = () => {
    try {
        mongoose.connect(config.mongoUri)

        // log a success message
        console.log(`**Application Connected To The mongo-db**`)
    } catch (error) {
        console.log(`Unable to Connect to the db because of ${error}`)
    }
}

export default connectToDb