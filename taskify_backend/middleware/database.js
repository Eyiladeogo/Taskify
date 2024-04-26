import mysql from 'mysql';
import { config } from 'dotenv';

config({path: '../../.env'});

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'Taskify'
})

console.log(`User details\nhost:${process.env.DB_HOST}\nuser:${process.env.DB_USER}`);

db.connect(err =>{
    if (err) {
        console.error(`DB Connection Error:\n${err}`)
    }
    else {
        console.log("DB connected successfulllly")
    };
    
});

export default db;