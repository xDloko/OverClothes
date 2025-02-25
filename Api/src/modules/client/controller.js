import db from '../../DB/mysql.js';
import jwt from 'jsonwebtoken';

const TABLEC = 'clients';
const TABLEP = 'products';

function alldataProducts () {
    return db.alldata(TABLEP);
}

async function login (email, password) {
    try {
        const users = await db.login(TABLEC, email, password); 
        if (!users || users.length === 0) {
            throw new Error('InvalidCredentials');
        }

        const user = users[0]; 

        const token = jwt.sign(
            { id: user.id, email: user.email },
            '1a2b3c4d5e6f7g8h9i0jklmnopqrstuv1234567890abcdef1234567890abcdef', 
            { expiresIn: '1h' }
        );
        
        console.log(user, token)
        return { user, token }; 
    } catch (error) {
        throw error; 
    }
}

async function register(name, email, password) {
    try {
        const result = await db.register(TABLEC, name, email, password); 
        
        return { result }; 
    } catch (error) {
        throw error; 
    }
}

//export to routes
export default {
    alldataProducts,
    login,
    register,
 
};