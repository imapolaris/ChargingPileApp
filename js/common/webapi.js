import {myFetch} from "./functions";
import {RuntimeEnv} from './constants';

const baseUrl = `${RuntimeEnv.ServerUri}/ChargingPileService/api`;

const urls = {
    messages: `${baseUrl}/messages`,
    stations: `${baseUrl}/stations`,
    chargingPiles: `${baseUrl}/chargingPiles`,
    chargingRecords: `${baseUrl}/chargingRecords`,
    charging: `${baseUrl}/charging`,
    subscribeRecords: `${baseUrl}/subscribeRecords`,
    users: `${baseUrl}/users`,
    payRecords: `${baseUrl}/payRecords`,
    wallet: `${baseUrl}/wallet`,
    batterytesting: `${baseUrl}/batterytesting`,
    system: `${baseUrl}/system`,
    vehicle: `${baseUrl}/vehicle`,
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

/*
 * send message, eg. verify code.
 */
export function sendMessage(phoneNumbers){
    let url = `${urls.messages}?phoneNumber=${phoneNumbers}`;
    return myFetch(url, GET, headers);
}

/*
 * get all the stations with brief info.
 **/
export function getAllStationsWithBriefInfo(filter) {
    let url = urls.stations;
    return myFetch(url, GET, headers);
}

/*
 * query the station by id.
 */
export function getSingleStation(id) {
    let url =  `${urls.stations}?stationId=${id}`;
    return myFetch(url, GET, headers);
}

/*
* query the station names by the filter condition.
* */
export function getStationsByName(text) {
    let url = `${urls.stations}/search/${text}`;
    return myFetch(url, GET, headers);
}

/*
* query the nearby stations by the position.
* */
export function getNearbyStations(position) {
    let url = `${urls.stations}/nearby?lon=${position.longitude}&lat=${position.latitude}`;
    return myFetch(url, GET, headers);
}

/*
* query collect stations by user id.
* */
export function getCollectStations(userId) {
    let url = `${urls.stations}/collect/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* cancel collect one station.
* */
export function stationCollectState(userId, stationId) {
    let url = `${urls.stations}/collect/state`;
    let data = {
        userId,
        stationId,
    };

    return myFetch(url, POST, headers, data);
}

/*
* clear collect stations by user id.
* */
export function clearCollectStations(userId) {
    let url = `${urls.stations}/collect/clear`;
    let data = {
        userId
    };

    return myFetch(url, POST, headers, data);
}

/*
* query the details of the station by id.
* */
export function getStationDetails(userId, stationId) {
    let url = `${urls.stations}/details?userId=${userId}&stationId=${stationId}`;
    return myFetch(url, GET, headers);
}

/*
* query charging piles of the station by id.
* */
export function getChargingPiles(stationId) {
    let url = `${urls.chargingPiles}?stationId=${stationId}`;
    return myFetch(url, GET, headers);
}

/*
* subscribe the charging pile.
* */
export function makeOneSubscribe(userId, sn) {
    let url = `${urls.chargingPiles}/subscribe?userId=${userId}&sn=${sn}`;
    return myFetch(url, GET, headers);
}

/*
* get current logon user' charging records.
* */
export function getChargingRecords(userId) {
    let url = `${urls.chargingRecords}/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* get subscribe records by user id.
* */
export function getSubscribeRecords(userId) {
    let url = `${urls.subscribeRecords}/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* query all the vehicles of mine.
* */
export function getVehicleInfo(userId) {
    let url = `${urls.vehicle}?userId=${userId}`;
    return myFetch(url, GET, headers);
}

/*
* delete one vehicle.
* */
export function delOneVehicle(vehicleId) {
    let url = `${urls.vehicle}/delete`;
    let data = {
        vehicleId
    };

    return myFetch(url, DELETE, headers, data);
}

/*
* add one vehicle.
* */
export function addOneVehicle(userId, models, plateno) {
    let url = `${urls.vehicle}/submit`;
    let data = {
        userId,
        models,
        plateno,
    };

    return myFetch(url, POST, headers, data);
}

/*
* start charging after scan the qrcode or input serial number.
* */
export function startCharging(userId, sn) {
    let url = `${urls.charging}/start`;
    let data = {
        userId,
        sn,
    };

    return myFetch(url, POST, headers, data);
}

/*
* stop charging.
* */
export function stopCharging(userId, sn, transSn) {
    let url = `${urls.charging}/stop`;
    let data = {
        userId,
        sn,
        transSn,
    };

    return myFetch(url, POST, headers, data);
}

/*
* request charging status.
* */
export function getChargingStatus(sn, transSn) {
    let url = `${urls.charging}/status?sn=${sn}&transSn=${transSn}`;
    return myFetch(url, GET, headers);
}

/*
* query charging billing records of the user.
* */
export function queryChargingBillingRecords(userId) {
    let url = `${urls.charging}/records`;
    return myFetch(url, GET, headers);
}

/*
* start battery testing.
* */
export function startBatteryTesting(serialNumber) {
    let url = `${urls.batterytesting}/start/${serialNumber}`;
    return myFetch(url, GET, headers);
}

/*
* query battery testing records.
* */
export function getBatteryTestingRecords(userId) {
    let url = `${urls.batterytesting}?userId=${userId}`;
    return myFetch(url, GET, headers);
}

/*
* query detail of the battery testing report by id.
* */
export function getBatteryTestingReportDetail(reportId) {
    let url = `${urls.batterytesting}?reportId=${reportId}`;
    return myFetch(url, GET, headers);
}

/*
* query battery testing billing records of the user.
* */
export function queryBatteryTestingBillingRecords(userId) {
    let url = `${urls.batterytesting}/records?userId=${userId}`;
    return myFetch(url, GET, headers);
}

/*
* login the app.
* */
export function login(phoneNumber, pwd, cType) {
    let url = `${urls.users}/login`;
    let data = {
        telephone: phoneNumber,
        pwd,
        cType
    };

    return myFetch(url, POST, headers, data);
}

/*
* register the user.
* */
export function register(phoneNumber, vcode, pwd) {
    let url = `${urls.users}/register`;
    let data = {
        telephone: phoneNumber,
        vcode,
        pwd,
    };

    return myFetch(url, POST, headers, data);
}

/*
* reset the password.
* */
export function resetPwd(phoneNumber, vcode, pwd) {
    let url = `${urls.users}/reset`;
    let data = {
        telephone: phoneNumber,
        vcode,
        pwd,
    };

    return myFetch(url, POST, headers, data);
}

/*
* get user profile by phone number.
* */
export function getUserProfile(userId) {
    let url = `${urls.users}/info`;
    let data = {
        userId
    };

    return myFetch(url, POST, headers, data);
}

/*
* update user profile.
* */
export function updateUserProfile(data) {
    let url = `${urls.users}/update`;
    return myFetch(url, POST, headers, data);
}

/*
* change user's password.
* */
export function changePwd(user) {
    let url = `${urls.users}/change`;
    return myFetch(url, POST, headers, user);
}

/*
* query my messages.
* */
export function getMyMessages(userId) {
    let url = `${urls.users}/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* query pay records by user id.
* */
export function getPayRecords(userId) {
    let url = `${urls.payRecords}/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* query balance of user' wallet
* */
export function getWalletBalance(userId) {
    let url = `${urls.wallet}/balance?userId=${userId}`;
    return myFetch(url, GET, headers);
}

/*
* query recharge records.
* */
export function queryRechargeRecords(userId) {
    let url = `${urls.wallet}/records?userId=${userId}`;
    return myFetch(url, GET, headers);
}

/*
* clear recharge records.
* */
export function clearRechargeRecords(userId) {
    let url = `${urls.wallet}/clear`;
    let data = {
        userId
    };

    return myFetch(url, DELETE, headers, data);
}

/*
 * pay by ali app.
 */
export function aliPay(money) {
    let url = `${urls.wallet}/alipay`;
    let data = {
        money
    };

    return myFetch(url, POST, headers, data);
}

/*
* pay by wechat app.
* */
export function wxPay(money) {
    let url = `${urls.wallet}/wxpay`;
    let data = {
        money
    };

    return myFetch(url, POST, headers, data);
}

/*
* make one charge.
* */
export function makeOneCharge(userId, money, payway) {
    let url = `${urls.wallet}/recharge`;
    let data = {
        userId,
        money,
        payway,
    };

    return myFetch(url, POST, headers, data);
}

/*
* submit feedback.
* */
export function submitFeedback(userId, content, datetime) {
    let url = `${urls.system}/feedback`;
    let data = {
        customerId: userId,
        fbContent: content,
        fbDate: datetime,
    };

    return myFetch(url, POST, headers, data);
}