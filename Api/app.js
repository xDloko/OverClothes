// General import
import express from 'express';
import config from './config.js';

// Import routes
import enruter from './Rest/Routes/routes.js';

// Initialize the app and set the port
const app = express();
app.use(express.json())
app.set('port', config.app.port)

//Routes
app.use('/Prave', enruter)

//export to index
export default app;