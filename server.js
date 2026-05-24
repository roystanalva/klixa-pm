const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, 'dist');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function serveStatic(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback - serve index.html
      fs.readFile(path.join(DIST, 'index.html'), (err2, indexData) => {
        if (err2) {
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexData);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(DIST, urlPath);

  // Security: ensure path is within DIST
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  serveStatic(res, filePath);
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║       Klixa ERP  v1.0.0             ║');
  console.log('  ║                                      ║');
  console.log('  ║  Running at: ' + url);
  console.log('  ║  Press Ctrl+C to stop               ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');

  const plat = process.platform;
  if (plat === 'win32') {
    require('child_process').exec('start ' + url);
  } else if (plat === 'darwin') {
    require('child_process').exec('open ' + url);
  } else {
    require('child_process').exec('xdg-open ' + url);
  }
});
