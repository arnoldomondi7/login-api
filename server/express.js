import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compress from 'compression'
import { readdirSync } from 'fs'

const morgan = require('morgan')

const app = express()

//activate the softwares.
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(morgan('dev'))

//handle the express routes.
readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)))

//export the app.
export default app