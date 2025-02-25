import db from '../../DB/mysql.js';

const TABLEC = 'clients';
const TABLEP = 'products';

function alldataProducts (TABLE) {
    return db.alldata(TABLE);
}


//export to routes
export default {
    alldataProducts,
 
};