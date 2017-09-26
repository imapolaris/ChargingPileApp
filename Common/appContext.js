import constants from "./constants";

const appContext = {
    isLogon: false,
    userProfile: null,
};

export function appInit() {
    loadUserProfile();
}

export function loadUserProfile() {
    storage.load({
        key: constants.UserProfileKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=> {
            appContext.isLogon = ret.isLogon;
            appContext.userProfile = ret.userProfile;
            return ret.isLogon;
        })
        .catch(error=>{
            console.log(error.message);
        });
}

export function saveUserProfile(data) {
    storage.save({
        key: constants.UserProfileKey,
        data: {
            isLogon: true,
            userProfile: {
                phoneNumber: data.phoneNumber,
                nickname: data.nickname,
                avatar: data.avatar,
            }
        },
        expires: null
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