import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import StorageKey from "./constants";

const storage = new Storage({
    size: 100,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
        userProfile(){
            return {
                nickname: 'alex',
                gender:'男',
            }
        }
    }
});

global.storage = storage;

export function clearCache() {

}

/*
* search historical stations.
* */
export function updateSearchHistoryStations(stations) {
    storage.save({
        key: StorageKey.SearchHistoryStationsKey,
        data: stations,
        expires: null,
    });
}

export function getSearchHistoryStations() {
    return storage.load({
        key: StorageKey.SearchHistoryStationsKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret => {
            return ret || [];
        })
        .catch(err => {
            console.log(err);
            throw new Error();
        });
}

export function clearSearchHistoryStations() {
    storage.remove({key: StorageKey.SearchHistoryStationsKey});
}