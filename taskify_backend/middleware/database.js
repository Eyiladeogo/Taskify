import mysql from 'mysql';
import { config } from 'dotenv';
// import * as dotenv from 'dotenv'

config({path: '../.env'});

var db;

if (process.env.JAWSDB_MARIA_URL) {
  db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
} 
else {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
}

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