// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const server = http.createServer(handleRequest);
server.listen(port, () => {
  console.log('Server is listening on port', port);
});

function handleRequest(req, res) {
  console.log(req.method, req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      const readStream = fs.createReadStream(path.join(__dirname, 'index.html'));
      readStream.pipe(res);
    } else if (req.url === '/comments') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      const readStream = fs.createReadStream(path.join(__dirname, 'comments.json'));
      readStream.pipe(res);
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
}
