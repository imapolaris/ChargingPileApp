import {myFetch} from "./functions";

const baseUrl = 'http://192.168.0.201/ChargingPileService/api/';

const urls = {
    messages: `${baseUrl}messages`,
    stations: `${baseUrl}stations`,
    stationDetails: `${baseUrl}stationDetails`,
    chargingPiles: `${baseUrl}chargingPiles`,
    chargingRecords: `${baseUrl}chargingRecords`,
    charging: `${baseUrl}charging`,
    subscribeRecords: `${baseUrl}subscribeRecords`,
    users: `${baseUrl}users`,
    payRecords: `${baseUrl}payRecords`,
    wallet: `${baseUrl}wallet`,
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

const GET = 'GET';
const POST = 'POST';

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
export function getAllStationsWithBriefInfo() {
    let url = urls.stations;
    return myFetch(url, GET, headers);
}

/*
 * query the station by id.
 */
export function getSingleStation(id) {
    let url =  `${urls.stations}/${id}`;
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
    let url = `${urls.stations}/nearby`;
    let data = {
        longitude: position.longitude,
        latitude: position.latitude
    };

    return myFetch(url, POST, headers, data);
}

/*
* query the details of the station by id.
* */
export function getStationDetails(stationId) {
    let url = `${urls.stationDetails}/${stationId}`;
    return myFetch(url, GET, headers);
}

/*
* query charging piles of the station by id.
* */
export function getChargingPiles(stationId) {
    let url = `${urls.chargingPiles}/${stationId}`;
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
* login the app.
* */
export function login(phoneNumber, pwd) {
    let url = `${urls.users}/login`;
    let data = {phoneNumber: phoneNumber, password: pwd};

    return myFetch(url, POST, headers, data);
}

/*
* register the user.
* */
export function register(phoneNumber, vCode, pwd) {
    let url = `${urls.users}/register`;
    let data = {
        phoneNumber: phoneNumber,
        vCode: vCode,
        password: pwd,
    };

    return myFetch(url, POST, headers, data);
}

/*
* reset the password.
* */
export function resetPwd(phoneNumber, vCode, pwd) {
    let url = `${urls.users}/reset`;
    let data = {
        phoneNumber: phoneNumber,
        vCode: vCode,
        password: pwd,
    };

    return myFetch(url, POST, headers, data);
}

/*
* get user profile by phone number.
* */
export function getUserProfile(userId) {
    let url = `${urls.users}/info`;
    let data = {
        Id: userId
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
* make one charge.
* */
export function makeOneCharge(userId, money, payWay) {
    let url = `${urls.wallet}/charge?userId=${userId}&money=${money}&payway=${payWay}`;
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