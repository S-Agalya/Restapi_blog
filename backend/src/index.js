//entry point for the server

const express=require('express')
const cors=require('cors')
const morgan= require('morgan')
const db=require('./config/db')

require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes=require('./routes/commentRoutes')
const app=express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/auth',authRoutes)
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

//test route
// app.get('/',(req,res)=>{
//     res.send('welcome to the resftful api blog')
// })


// app.get('/',(req,res)=>{
//     res.send("welcome to RESTful Blog API")
// })

const PORT = process.env.PORT
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})
