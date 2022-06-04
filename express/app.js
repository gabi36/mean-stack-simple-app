const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
app.use(cors({credentials: true, origin: true}))

const router = require('./routes/route')

mongoose.connect('mongodb://localhost:27017/contactList')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(5000, () => {
    console.log("Server stated")
})
