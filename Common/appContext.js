import constants from "./constants";

const appContext = {
    logined: false,
    avatar: null,
};

export function appInit() {
    loadUserProfile();
}

export function loadUserProfile() {
    storage.load({
        key: constants.LoginedKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=> {
            appContext.logined = ret;
        })
        .catch(error=>{
            console.log(error.message);
        });
}

export function loadAvatar() {
    return storage.load({
        key: constants.AvatarKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=>{
            appContext.avatar = ret;
            return ret;
        })
        .catch(error=>{
            console.warn(error.message);
            throw new Error(error);
        });
}

export function saveAvatar(data) {
    storage.save({
        key: constants.AvatarKey,
        data: {
            data: data,
        },
        expires: null
    });
}

global.AppContext = appContext;