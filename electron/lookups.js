const Store = require('electron-store');
const lookupStorage = new Store({name: 'lookups'});
const LOOKUPS = ['GAME_ICONS', 'GAME_TERMS'];

module.exports.initializeLookups = initializeLookups;

function initializeLookups(ipc) {
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