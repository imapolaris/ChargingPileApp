import constants from "./constants";

const appContext = {
    isLogon: false,
    userProfile: null,
    userId: '',
    logout: function () {
        this.isLogon = false;
        this.userProfile = null;
        this.userId = '';
        storage.save({
            key: constants.UserProfileKey,
            data: Object.assign({},
                this.userProfile, {isLogon: false}
            ),
            expires: null
        });
    },
    login: function (data) {
        this.isLogon = true;
        this.userProfile = data;
        this.userId = data.userId;
        storage.save({
            key: constants.UserProfileKey,
            data: {
                isLogon: true,
                userId: data.userId,
                nickname: data.nickname,
                avatar: data.avatar,
            },
            expires: null
        });
    },
    hadLogon: function () {
        storage.load({
            key: constants.UserProfileKey,
            autoSync: true,
            syncInBackground: false,
        })
            .then(ret=> {
                this.isLogon = ret.isLogon;
            })
            .catch(error=>{
                console.log(error.message);
            });
    },
    loadUserProfile: function () {
        return storage.load({
            key: constants.UserProfileKey,
            autoSync: true,
            syncInBackground: false,
        })
            .then(ret=> {
                this.userProfile = ret;
                return ret;
            })
            .catch(error=>{
                console.log(error.message);
            });
    },
    saveAvatar: function(data) {
        storage.save({
            key: constants.UserProfileKey,
            data: Object.Assign({},
                appContext.userProfile, {avatar: data}
            ),
            expires: null
        });
    },
};

export function appInit() {
    appContext.hadLogon();
}

export function loadUserProfile() {

}

global.AppContext = appContext;