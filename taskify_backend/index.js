import bodyParser from "body-parser";
import express from "express";
import mysql from 'mysql';
import { config} from 'dotenv';
import bcrypt from 'bcrypt';

config({path: '../.env'});

const PORT = 6969;
const app = express();

const loginMessage = {
    invalidUsername: 'Invalid Username or Password',
    loginSuccess: 'Login Successful',
    genericError: 'Server Error'
}

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(err =>{
    if (err) throw err;
    console.log("DB connected successfully");
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/login', (req, res)=>{
    res.render('login.ejs');
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    db.query(
        'SELECT * FROM users WHERE email = ?', email, (err, results) =>{
            if (err){
                console.error(err);
                res.status(500).send('Error logging in!');
            }
            else if(results.length === 0){
                res.status(401).send('Invalid Username')
            }
            else{
                console.log(results);
                const user = results[0];
            
                if (bcrypt.compareSync(password, user.password)){
                    res.status(200).send('Login Successful');
                }
                else{
                    res.status(401).send('Incorrect Password');
                }
            }
        })
    
})

app.get('/register', (req, res)=>{
    res.render('register.ejs');
})

app.post('/register', (req, res)=>{  
    console.log('register route');
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = {email, password: hashedPassword}
    db.query(
        'INSERT INTO users SET ?', user, (err) =>{
            if (err){
                console.log(err);
                res.status(500).send(`Error registering user ${user.email}`)
                res.render('failed.ejs')
            }
            else{
                res.status(201).send('User created successfully')
                res.render('success.ejs')
            }
        }
    )
})










app.listen(PORT, (err)=>{
    if (err) {console.log(err)};
    console.log(`App running on port ${PORT}`);
})