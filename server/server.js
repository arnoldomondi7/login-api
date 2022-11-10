import config from './config/config.config'
import app from './express'
import connectToDb from './database/database.db'

//connect to the db.
connectToDb()

//set up the server to listen.
app.listen(config.port, (error) => {
    if (error) {
        return console.log(`Error occures because of , ${error}`)
    }
    //log a success message.
    console.log(`Server is up and running in the port ${config.port}`)
})