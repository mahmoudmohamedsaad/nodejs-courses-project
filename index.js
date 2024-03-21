require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const httpStatusText = require('./utils/httpStatusText');
const cors = require('cors')
mongoose.connect(url).then(()=>{
    console.log("mongo db server started")
})
app.use(cors())
app.use(express.json());

const coursesRouter = require('./routes/courses.route')
app.use('/api/courses',coursesRouter)

const usersRouter = require('./routes/users.route')
app.use('/api/users',usersRouter)

//global middleware
app.all('*',(req,res,next)=>{
    return  res.status(404).json({status:httpStatusText.ERROR, message:'this resource is not avaialable'})
})

app.use((error,req,res,next) =>{
    res.status(error.statusCode || 500).json({status:httpStatusText.ERROR,message:error.message,code:error.statusCode});
})
// CRUD Create / read / update / delete



app.listen(process.env.PORT || 5002,()=>{
    console.log("app is lisiting on port 5002")
})