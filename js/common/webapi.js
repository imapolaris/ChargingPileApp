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
    let url = `${urls.users}/vehicle/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* delete one vehicle.
* */
export function delOneVehicle(vehicleId) {
    let url = `${urls.users}/vehicle/${vehicleId}`;
    return myFetch(url, POST, headers);
}

/*
* add one vehicle.
* */
export function addOneVehicle(vehicle) {
    let url = `${urls.users}/vehicle`;
    return myFetch(url, POST, headers, vehicle);
}

/*
* start charging after scan the qrcode or input serial number.
* */
export function startCharging(serialNumber) {
    let url = `${urls.charging}/start/${serialNumber}`;
    return myFetch(url, GET, headers);
}

/*
* stop charging.
* */
export function stopCharging(serialNumber) {
    let url = `${urls.charging}/stop/${serialNumber}`;
    return myFetch(url, GET, headers);
}

/*
* request charging status.
* */
export function getChargingStatus(serialNumber) {
    let url = `${urls.charging}/status/${serialNumber}`;
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
    let url = `${urls.batterytesting}/records/${userId}`;
    return myFetch(url, GET, headers);
}

/*
* query detail of the battery testing report by id.
* */
export function getBatteryTestingReportDetail(reportId) {
    let url = `${urls.batterytesting}/records/detail/${reportId}`;
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
    let url = `${urls.wallet}/balance/${userId}`;
    return myFetch(url, GET, headers);
}

/*
 * pay by ali app.
 */
export function aliPay() {
    let url = `${urls.wallet}/alipay`;
    return myFetch(url, GET, headers);
}

/*
* pay by wechat app.
* */
export function wxPay() {
    let url = `${urls.wallet}/wxpay`;
    return myFetch(url, GET, headers);
}

/*
* make one charge.
* */
export function makeOneCharge(userId, money, payWay) {
    let url = `${urls.wallet}/charge?userId=${userId}&money=${money}&payway=${payWay}`;
    return myFetch(url, GET, headers);
}