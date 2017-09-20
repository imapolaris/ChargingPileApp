import constants from "./constants";

const appContext = {
    isLogon: false,
    userProfile: null,
    avatar: null,
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
            appContext.logined = ret.isLogon;
            appContext.userProfile = ret.profile;
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
            profile: {
                username: data.username,
                nickname: data.nickname,
                gender: data.gender,
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