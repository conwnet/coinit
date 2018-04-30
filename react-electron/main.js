const {app, BrowserWindow} = require('electron');
const child_process = require('child_process');
const path = require('path');
const url = require('url');

// 启动 Webpack Dev Server
child_process.exec('npm run dev');

const createWindow = () => {
    const win = new BrowserWindow({width: 800, height: 600});

    // 加载应用的 URL
    win.loadURL(url.format({
        hostname: '127.0.0.1',
        port: '8080',
        protocol: 'http:',
        slashes: true
    }));

    // 打开开发者工具
    win.webContents.openDevTools();

    // window 关闭的回调
    win.on('close', () => {
        console.log('window is closed');
    });
};

// 创建浏览器窗口回调
app.on('ready', createWindow);

// 全部窗口关闭回调
app.on('window-all-closed', () => {
    app.quit();
});

