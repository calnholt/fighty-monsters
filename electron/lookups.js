var LOOKUP;
const Store = require('electron-store');
let lookupStorage;
const LOOKUPS = ['GAME_ICONS', 'GAME_TERMS'];

module.exports.initializeLookups = initializeLookups;

function initializeLookups(ipc, appName) {
    LOOKUP = `${appName}-lookups`;
    lookupStorage = new Store({name: LOOKUP});
    ipc.handle('get-lookup', async (event, lookupName) => {
        return lookupStorage.get(lookupName);
    });
        
    ipc.handle('save-lookup', async (event, gameIcons, lookupName) => {
        lookupStorage.set(lookupName, gameIcons);
        return gameIcons;
    });
    
    LOOKUPS.forEach(lk => {
        let lookup = lookupStorage.get(lk);
        if (!lookup || !lookup.length) {
        lookupStorage.set(lk, []);
        }
    });
};