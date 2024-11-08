import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../middleware/database.js";
import { config } from 'dotenv';


config({path: '../.env'});
const router = express.Router()

router.post('/login', (req, res)=>{
    const {emailorUsername, password} = req.body;
    // const values = [email, username]

    let query
    if (emailorUsername.includes('@')){
        query = 'SELECT * FROM users WHERE email = ?';
    } else {
        query = 'SELECT * FROM users WHERE username = ?';
    }
    db.query(
        query, emailorUsername, (err, results) =>{
            if (err){
                console.error(err);
                res.status(500).json('Error logging in!');
            }
            else if(results.length === 0){
                res.status(401).json('Invalid Username/Email')
            }
            else{
                console.log(results);
                const user = results[0];
            
                if (bcrypt.compareSync(password, user.password)){
                    try {
                        var token = jwt.sign({userId:user.id, username:user.username}, process.env.JWT_SECRET, {expiresIn: '1h'})
                        res.status(200).json(token);
                    } catch (error) {
                        console.error(`JWT Signing error:\n${error}`)
                        res.status(500).json(`JWT Signing error:${error}`)
                    }
                    
                    
                }
                else{
                    res.status(401).json('Incorrect Password');
                }
            }
        })
    
});


router.post('/register', (req, res)=>{  
    const {email, username, password, password2} = req.body;
    if (password !== password2){
        return res.status(400).json('Passwords dont match!')
    }
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = {email, username:username, password: hashedPassword}
    db.query(
        'INSERT INTO users SET ?', user, (err, result) =>{
            if (err){
                console.log(err);
                res.status(500).json(`Error registering user ${user.username}`)
            }

            const userId = result.insertId
            try {
                var token = jwt.sign({userId:userId, username:user.username}, process.env.JWT_SECRET, {expiresIn: '1h'})
                res.status(201).json(token)
            } catch (error) {
                console.error(`JWT Signing error:\n${error}`);
                return res.status(500).json(`JWT Signing error: ${error}`);
            }
            
        }
    )
})

export {router};