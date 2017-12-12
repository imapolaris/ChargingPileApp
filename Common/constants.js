import App from "../app";

export default {
    UserProfileKey: 'userProfile',
    RecentVisitCitiesKey: 'recentVisitCities',
    SearchHistoryStationsKey: 'searchHistoryStations',
}

export const AppStatus = {
    Normal: 'normal',
    Subscribe: 'subscribe',
    Charging: 'charging',
};

// 搜索历史缓存数量：10个
export const SearchHistoryCount = 10;

global.AppStatus = AppStatus;

export const AndroidPlatform = 'android';
export const IOSPlatform = 'ios';