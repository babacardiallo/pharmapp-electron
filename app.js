const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;

app.on('window-all-closed', function() {
    app.quit();
});

var newWindow = null;
var createWindow = function(width, height, directory, template) {
    newWindow = new BrowserWindow({
        width: width,
        height: height
    });
    newWindow.loadURL('file://' + __dirname + '/templates/forms/' + directory + '/' + template);
    //newWindow.openDevTools();
    newWindow.setMenuBarVisibility(false);
};

app.on('ready', function() {

    var electronScreen = electron.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;

    var authentication = new BrowserWindow({
        width: 475,
        height: 350,
        center: true,
        resizable: false,
        frame: true
    });
    authentication.loadURL('file://' + __dirname + '/templates/authentication.html');
    //authentication.openDevTools();

    var register = new BrowserWindow({
        width: 600,
        height: 565,
        center: true,
        resizable: false,
        show: false,
        frame: true
    });
    register.loadURL('file://' + __dirname + '/templates/register.html');
    //register.openDevTools();

    var mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        //center: true,
        show: false,
        frame: true
    });
    //mainWindow.openDevTools();
    mainWindow.setMenuBarVisibility(true);
    mainWindow.loadURL('file://' + __dirname + '/templates/main.html');

    /**************************************************/
    ipcMain.on('fermer', function() {
        authentication.close();
        register.close();
        mainWindow.close();
    });

    ipcMain.on('ouvrir', function() {
        authentication.close();
        register.close();
        mainWindow.show();
    });

    ipcMain.on('inscrire', function() {
        authentication.hide();
        register.show();
    });

    ipcMain.on('inscrire_fin', function() {
        register.hide();
        authentication.show();
    });

    ipcMain.on('annuler', function() {
        authentication.show();
        register.hide();
    });

    ipcMain.on('refresh_app', function() {
        mainWindow.reload();
    });

    /**********************************************/
    ipcMain.on('add_pharmacy', function() {
        createWindow(600, 560, 'add', 'pharmacy.html');
    });
    ipcMain.on('add_laboratory', function() {
        createWindow(600, 560, 'add', 'laboratory.html');
    });
    ipcMain.on('add_md', function() {
        createWindow(600, 560, 'add', 'md.html');
    });
    ipcMain.on('add_product', function() {
        createWindow(600, 650, 'add', 'product.html');
    });

    /**********************************************/
    ipcMain.on('update_laboratory', function() {
        createWindow(600, 650, 'update', 'laboratory.html');
    });
    ipcMain.on('update_md', function() {
        createWindow(600, 650, 'update', 'md.html');
    });
    ipcMain.on('update_product', function() {
        createWindow(600, 650, 'update', 'product.html');
    });

    /**********************************************/
    ipcMain.on('delete_laboratory', function() {
        createWindow(600, 650, 'delete', 'laboratory.html');
    });
    ipcMain.on('delete_md', function() {
        createWindow(600, 650, 'delete', 'md.html');
    });
    ipcMain.on('delete_product', function() {
        createWindow(600, 650, 'delete', 'product.html');
    });

    /**********************************************/
    ipcMain.on('close', function() {
        newWindow.close();
    });
});