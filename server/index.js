const express=require("express");
const cors=require("cors")
const bodyParser =require("body-parser")
const mongoose = require("mongoose");
const config = require('./config');
//const URL="mongodb://127.0.0.1:27017/mongotest";

const app=express();

app.use(cors());
app.use(bodyParser.json());

const todoRoutes=require('./routes/todoRoutes.js')
const authRoutes = require('./routes/authRoutes.js');


mongoose.connect(config.mongoURI,{
    
}).then(()=>{
    console.log('mongo connected..')
}).catch(err=>{
    console.log(err.message);
})

app.use('/api/todos',todoRoutes);
app.use('/auth', authRoutes);


const PORT=process.env.port|| 4444;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
