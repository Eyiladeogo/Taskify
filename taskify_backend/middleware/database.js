import mysql from 'mysql';
import { config } from 'dotenv';
// import * as dotenv from 'dotenv'

config({path: '../.env'});
// console.log(process.env.DB_USER);
const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// console.log(DB_HOST, DB_NAME, DB_PASSWORD, DB_USER);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// console.log(`User details\nhost:${process.env.DB_HOST}\nuser:${process.env.DB_USER}`);

db.connect(err =>{
    if (err) {
        console.error(`DB Connection Error:\n${err}`)
    }
    else {
        console.log("DB connected successfulllly")
    };
    
});

export default db;