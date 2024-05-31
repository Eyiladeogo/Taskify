import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../middleware/database.js";


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
                        const token = jwt.sign({userId:user.id, username:user.username}, '$2b$10$SLL2HpUBxYQDTf.qI6jLF.DkB/WCMbzmG5uihwc3zK6EqRYcHrTiq', {expiresIn: '1h'})
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
        'INSERT INTO users SET ?', user, (err) =>{
            if (err){
                console.log(err);
                res.status(500).json(`Error registering user ${user.username}`)
            }
            else{
                const token = jwt.sign({userId:user.id, username:user.username}, '$2b$10$SLL2HpUBxYQDTf.qI6jLF.DkB/WCMbzmG5uihwc3zK6EqRYcHrTiq', {expiresIn: '1h'})
                res.status(201).json(token)
            }
        }
    )
})

export {router};