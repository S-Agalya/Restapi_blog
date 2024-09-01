const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
const db = require('../config/db')
// user registration field
exports.register = async(req, res)=>{
    const {username, email, password}=req.body;
  //userexists
  //newuser
    try{
        const userExists= await db.query('SELECT * FROM users WHERE email = $1',[email])
        if(userExists.rows.length>0){
            return res.status(400).json({
                message: 'user already exists'
            })
        }

        const hashedPassword= await bcrypt.hash(password, 10)
//insert new user
        const newUser=await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
             [username, email, hashedPassword]
        )
//generate a jwt token
        const token = jwt.sign({
            id:newUser.rows[0].id
        },
        process.env.JWT_SECRET,{
            expiresIn:'1h',
        })
        res.status(201).json({token})

    }catch(error){
        res.status(500).json({message: 'server error'})
    }


}

//Login a user

exports.login = async (req, res) =>{
    const {email,password} =req.body

    try{
        const user=await db.query('SELECT * FROM users WHERE email = $1',[email])
        if(user.rows.length === 0){
            return res.status(400).json({message: 'Invalid credentials'})

        }
        const isMatch = await bcrypt.compare(password,user.rows[0].password)

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.rows[0].id},process.env.JWT_SECRET,{
            expiresIn:'1h',
        })
        res.status(200).json({token})
    }catch(error){
        res.status(500).json({
            message: 'server error'
        })
    }
}