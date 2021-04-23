var MONSTERS;
const Store = require('electron-store');
var storage;

module.exports.initializeMonsterStorage = initializeMonsterStorage;

function initializeMonsterStorage(ipc, appName) {
    MONSTERS = `${appName}-monster-cards`;
    storage = new Store({name: MONSTERS});
    ipc.handle('get-monster', async (event, monsterName) => {
        return storage.get(monsterName);
    });
        
    ipc.handle('save-monster', async (event, monsterObj, monsterName) => {
        storage.set(monsterName, monsterObj);
        return monsterObj;
    });
    
    // initialize .json
    let obj = storage.get(MONSTERS);
    if (!obj) {
        storage.store = {};
    }
};