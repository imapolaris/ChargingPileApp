import constants, {AppStatus} from "./constants";

/*
* the context of the app.
* */
const appContext = {
    isLogon: false,
    userProfile: null,
    userId: '',
    container: [],
    appStatus: AppStatus.Normal,
    subscribeData: {},
    register: function(func){
        let exists = false;
        for (let i=0; i < this.container.length; ++i) {
            if (this.container[i] === func) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            this.container.push(func);
        }
    },
    unRegister: function (func) {
        let index = this.container.indexOf(func);
        if (index >= 0) {
            this.container = Object.assign([], this.container.slice(0, index), this.container.slice(index+1));
        }
    },
    clearListeners: function() {
        this.container && this.container.clear();
    },
    noticeListeners: function() {
        for (let i = 0; i < this.container.length; ++i) {
            let func = this.container[i];
            func && func({isLogon: this.isLogon, userId: this.userId, userProfile: this.userProfile});
        }
    },
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

        this.noticeListeners();
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

        this.noticeListeners();
    },
    subscribe: function (data) {
        this.changeAppStatus(AppStatus.Subscribe);
        this.subscribeData = data;
    },
    unSubscribe: function (status) {
        this.changeAppStatus(status);
    },
    startCharging: function () {
        this.changeAppStatus(AppStatus.Charging);
    },
    stopCharging: function () {
        this.changeAppStatus(AppStatus.Normal);
    },
    changeAppStatus: function (status) {
        this.appStatus = status;
    },
};

export function appInit() {
    appContext.init();
}

global.AppContext = appContext;

/*
* recent visit cities.
* */
export function updateRecentVisitCities(cities) {
    storage.save({
        key: constants.RecentVisitCitiesKey,
        data: cities,
        expires: null
    });
}

export function getRecentVisitCities() {
    return storage.load({
        key: constants.RecentVisitCitiesKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=> {
            return ret || ['北京', '上海', '杭州'];
        })
        .catch(error=>{
            console.log(error.message);
            throw new Error();
        });
}

/*
* search historical stations.
* */
export function updateSearchHistoryStations(stations) {
    storage.save({
        key: constants.SearchHistoryStationsKey,
        data: stations,
        expires: null,
    });
}

export function getSearchHistoryStations() {
    return storage.load({
        key: constants.SearchHistoryStationsKey,
        autoSync: true,
        syncInBackground: false,
    })
        .then(ret=>{
            return ret || [];
        })
        .catch(err=>{
            console.log(err);
            throw new Error();
        })
}

export function clearSearchHistoryStations() {
    storage.remove({key: constants.SearchHistoryStationsKey});
}