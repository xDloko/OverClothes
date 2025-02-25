import mysql from 'mysql';
import config from '../../config.js';
import bcrypt from 'bcrypt';

// Database configuration parameters  from config.js file 
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

// Global variable to hold the MySQL connection
let conecction;

// Function to create a MySQL connection and handle connection errors  every 200ms.  If a connection error occurs, it will try to reconnect.
// If the connection is successful, it will log a message.
// If the connection is lost, it will try to reconnect.
// If the connection is lost after a certain number of attempts, it will log an error message.
// This function is called when the server starts.  It also sets up an event listener to handle
function conecctionMySQL(){
    conecction = mysql.createConnection(dbconfig);
    conecction.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            setTimeout(conecctionMySQL, 200)
        }else {
            console.log('Succefull Conection to DB')
        }
    });

    conecction.on('error', err => {
        console.error('DB Error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            conecctionMySQL();
        } else {
            throw err;
        }
    });
}

conecctionMySQL();

// Function to retrieve all data from a given table.  It uses a Promise to handle asynchronous database operations.
// If an error occurs, it rejects the Promise.  If the operation is successful, it resolves the Promise with the retrieved data.
// This function is used in the client controller to retrieve all products.
// It uses the MySQL connection established earlier.
// This function is called when the server starts.
// It also sets up an event listener to handle connection errors.  If
function alldata(table) {
    return new Promise((resolve, reject) => {
        conecction.query(`SELECT * FROM ${table}`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function getData(table, id) {

}


function addData(table, data) {

}

function deleteData(table, id) {

}

//anothers handles
function login(table, email, password) {
    return new Promise((resolve, reject) => {
        conecction.query(`SELECT * FROM ${table} WHERE email =? AND password =?`, [email, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

async function register(table, name, email, password) {
    try {
        
        const existingUser = await new Promise((resolve, reject) => {
            connection.query(`SELECT email FROM ${table} WHERE email = ?`, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (existingUser.length > 0) {
            throw new Error('UserAlreadyExists');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`,
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });

        return { message: 'User registered successfully' };
    } catch (error) {
        throw error;
    }
}


export default {
    alldata,
    getData,
    addData,
    deleteData,
    login,
    register,
};
