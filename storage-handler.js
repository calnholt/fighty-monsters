const APP_NAME = 'fighty-monsters';
const ElectronStore = require('electron-store');
const iconJson = require('./data/fighty-monsters-icons.json');
const backgroundJson = require('./data/fighty-monsters-backgrounds.json');
const monsterJson = require('./data/fighty-monsters-monsters.json');

let storageMap = {};
let jsonMap = {
    icons: iconJson,
    backgrounds: backgroundJson,
    monsters: monsterJson
}

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
    storageMap[storageName] = new ElectronStore({name: storageName});
    let storage = storageMap[storageName];
    let hasData = Object.keys(storage.store).length > 0;
    if (!hasData) {
        storage.set('aAaAaA', {});
        storage.delete('aAaAaA');
        if (jsonMap[name]) {
            storage.store = jsonMap[name];
            storage.set('aAaAaA', {});
            storage.delete('aAaAaA');
        }
        else {
            storage.store = {};
        }
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
        storage.store = {}; // delete original contents
        items.forEach(item => storage.set(item[keyProperty], item));
        return storage.store;
    });
    ipc.handle(`save-item-${name}`, async (event, key, item) => {
        storage.set(key, item);
        return item;
    });
    ipc.handle(`update-item-${name}`, async (event, oldKey, key, item) => {
        storage.delete(oldKey);
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