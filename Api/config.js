import { config } from 'dotenv';
config();

export default {
    app: {
        port:process.env.PORT || 3000,
    },

    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'Pxnxkzb18',
        database: process.env.MYSQL_DATABASE || 'overclothes'
    }

}