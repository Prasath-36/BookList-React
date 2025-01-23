import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose'
import {Book} from './models/bookModel.js'
import booksRoute from './routes/bookRoute.js'
import cors from 'cors'

const app=express();

//Middleware for parsing request body
app.use(express.json())

//Middleware - to handling cors policy
//Method 1: Allow all Origins with Default of cors (*)
app.use(cors())
//Method 2: Allow custom Origins
/*app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}))*/

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Creating an Notes App")
})

app.use('/books',booksRoute)

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App is connected to the DB")
    app.listen(PORT,()=>{
        console.log(`App is listening to  port : ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error)
})