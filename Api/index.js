import app from './app.js';

// Start the server on respective port. 
app.listen(app.get('port'), () => {
    console.log('Server is running on port: ', app.get('port'));
})

