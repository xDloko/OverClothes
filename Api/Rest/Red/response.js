
const response = {
    success: function (req, res, message, status) {
        const statusCode = status || 200;
        const messageOk = message || '';
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            message: messageOk
        });
    },
    
    error: function (req, res, message, status) {
        const statusCode = status || 500;
        const messageError = message || 'Error Interno';
        res.status(statusCode).send({
            error: true,
            status: statusCode,
            message: messageError
        });
    }
}

export default response;
