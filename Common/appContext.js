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
        this.userId = data.userId;
        this.userProfile = Object.assign({}, data, {isLogon: true});
        this.updateUserProfile(this.userProfile);
    },
    init: function () {
        storage.load({
            key: constants.UserProfileKey,
            autoSync: true,
            syncInBackground: false,
        })
            .then(ret=> {
                this.isLogon = ret.isLogon;
                this.userId = ret.userId;
                this.userProfile = ret;
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
    updateUserProfile: function (data) {
        this.userProfile = Object.assign({}, this.userProfile, data);
        storage.save({
            key: constants.UserProfileKey,
            data: this.userProfile,
            expires: null
        });
    },
};

export function appInit() {
    appContext.init();
}

global.AppContext = appContext;