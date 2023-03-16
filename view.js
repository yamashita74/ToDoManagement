const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 5500;

const indexPage = fs.readFileSync('index.html', 'UTF-8');
const styleCss = fs.readFileSync('style.css', 'UTF-8');
const scriptJs = fs.readFileSync('index.js', 'UTF-8');

const server = http.createServer(RouteSetting);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function RouteSetting(req, res) {
    const url_parts = url.parse(req.url);
    console.log('----');
    console.log(url_parts);
    console.log('----');
    switch (url_parts.pathname) {
      case '/':
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexPage);
        res.end();
      break;
    
      case '/style.css':
      // cssファイルにアクセスした時の処理
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(styleCss);
      res.end();
      break;
  
      case '/index.js':
      // jsファイルにアクセスした時の処理
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(scriptJs);
      res.end();
      break;
    }
  }