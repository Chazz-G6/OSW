const proxy = require('http-proxy-middleware');

const apiUrl = 'http://localhost:5000';
const apiContext = ['/api'];

module.exports = (app) => {
    app.use(
        '/api',
        proxy({
            target: apiUrl,
            changeOrigin: true,
        })
    );
};