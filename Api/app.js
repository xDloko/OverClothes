// General import
import express from 'express';
import config from './config.js';

// Import routes
import enruterClient from './src/modules/client/routes.js';

// Initialize the app and set the port
const app = express();
app.use(express.json())
app.set('port', config.app.port)

//Routes
app.use('/OverClothes', enruterClient)

//export to index
export default app;