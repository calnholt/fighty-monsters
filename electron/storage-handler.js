const APP_NAME = 'fighty-monsters';
const Store = require('electron-store');

let storageMap = {};

module.exports.initializeAllStorage = initializeAllStorage;

function initializeAllStorage(ipc) {
    initializeStorage(ipc, 'terms');
    initializeStorage(ipc, 'icons');
    // custom
    initializeStorage(ipc, 'monsters');
    initializeStorage(ipc, 'backgrounds');
};

function initializeStorage(ipc, name) {
    let storageName = `${APP_NAME}-${name}`;
    // create .json if not yet created
    storageMap[storageName] = new Store({name: storageName});
    let storage = storageMap[storageName];
    let hasData = storage.store;
    if (!hasData) {
        storage.store = {};
    }
    // setup ipc handlers
    // GET
    ipc.handle(`get-${name}`, async (event) => {
        return storage.store;
    });
    ipc.handle(`get-item-${name}`, async (event, key) => {
        return storage.get(key);
    });
    // SAVE / UPDATE - must be a list!
    ipc.handle(`save-${name}`, async (event, keyProperty, items) => {
        items.forEach(item => storage.set(item[keyProperty], item));
        return storage.store;
    });
    ipc.handle(`save-item-${name}`, async (event, key, item) => {
        storage.set(key, item);
        return item;
    });
    // DELETE
    ipc.handle(`delete-${name}`, async (event) => {
        storage.store = {};
        return true;
    });
    ipc.handle(`delete-item-${name}`, async (event, key) => {
        storage.delete(key);
        return true;
    });
}