import db from '../../DB/mysql.js';

const TABLEC = 'clients';
const TABLEP = 'products';

function alldataProducts () {
    return db.alldata(TABLEP);
}


//export to routes
export default {
    alldataProducts,
 
};