const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = '';
    let statusCode = 200;

    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'home.html');
            break;
        case '/about':
            filePath = path.join(__dirname, 'about.html');
            break;
        case '/contact':
            filePath = path.join(__dirname, 'contact.html');
            break;
        default:
            filePath = path.join(__dirname, '404.html');
            statusCode = 404;
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            if (!res.headersSent) {
                res.writeHead(statusCode, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
