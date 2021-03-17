const express = require("express");
const cors = require('cors');
require('dotenv').config()
const app = express();


let PORT = process.env.PORT || 5600;

/**MIDDLEWARES*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: process.env.CLIENT_URL}))

app.use('/alysystem/coins', require('./routes/coins'))
app.use('/alysystem/users', require('./routes/users'))
app.use('/alysystem/bd', require('./routes/index'))


app.listen(PORT, ()=>{
    console.log(`Server is runing on port: ${PORT}`)
})