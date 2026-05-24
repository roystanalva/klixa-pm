const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;
let devServer;
let prodServer;

function serveDist(distDir) {
  const mimeTypes = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  };
  return http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  }).listen(0, '127.0.0.1');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'Klixa ERP',
    icon: path.join(__dirname, '..', 'public', 'favicon.svg'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  });

  const isDev = process.argv.includes('--dev');

  if (isDev) {
    devServer = spawn('npx', ['vite', '--port', '5173'], {
      stdio: 'pipe',
      shell: true,
    });

    devServer.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:')) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.show();
      }
    });

    devServer.stderr.on('data', (data) => {
      console.error(`[vite] ${data}`);
    });
  } else {
    const distDir = path.join(__dirname, '..', 'dist');
    prodServer = serveDist(distDir);
    const addr = prodServer.address();
    mainWindow.loadURL(`http://127.0.0.1:${addr.port}`);
    mainWindow.show();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (devServer) devServer.kill();
  if (prodServer) prodServer.close();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

app.on('before-quit', () => {
  if (devServer) devServer.kill();
  if (prodServer) prodServer.close();
});
