import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

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