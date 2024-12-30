import mysql from 'mysql';
import config from '../../config.js';

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conecction;
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


export default {
    alldata,
    getData,
    addData,
    deleteData,
};
