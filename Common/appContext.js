import constants from "./constants";

const appContext = {
    logined: false,
    avatar: null,
};

export function appInit() {
    loadUserProfile();
}

function loadUserProfile() {
    storage.load({
        key: constants.LoginedKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=> {
            appContext.logined = ret;
        })
        .catch(error=>{
            console.warn(error.message);
        });
}

function loadAvatar() {
    storage.load({
        key: constants.AvatarKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=>{
            appContext.avatar = ret;
        })
        .catch(error=>{
            console.warn(error.message);
        });
}

global.AppContext = appContext;