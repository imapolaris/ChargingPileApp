import {myFetch} from "./functions";

const urls = {
    messages: 'http://192.168.0.201/ChargingPileService/api/messages',
    stations: 'http://192.168.0.201/ChargingPileService/api/stations',
    chargingRecords: 'http://192.168.0.201/ChargingPileService/api/chargingRecords',
    charging: 'http://192.168.0.201/ChargingPileService/api/charging',
    users: 'http://192.168.0.201/ChargingPileService/api/users',
    payRecords: 'http://192.168.0.201/ChargingPileService/api/payRecords',
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

/*
 * send message, eg. verify code.
 */
export function sendMessage(phoneNumbers){
    let url = `${urls.messages}?phoneNumber=${phoneNumbers}`;
    return myFetch(url, 'GET', headers);
}

/*
 * get all the stations with brief info.
 **/
export function getAllStationsWithBriefInfo() {
    let url = urls.stations;
    return myFetch(url, 'GET', headers);
}

/*
 * query the station by id.
 */
export function getSingleStation(id) {
    let url =  `${urls.stations}/${id}`;
    return myFetch(url, 'GET', headers);
}

/*
* query the station names by the filter condition.
* */
export function getStationNames(filter) {
    let url = '';

}

/*
* get current logon user' charging records.
* */
export function getChargingRecords(refreshing=false) {
    let url = `${urls.chargingRecords}?refreshing=${refreshing}`;
    return myFetch(url, 'GET', headers);
}

/*
* start charging after scan the qrcode or input serial number.
* */
export function startCharging(serialNumber) {
    let url = `${urls.charging}?serialNumber=${serialNumber}`;
    return myFetch(url, 'POST', headers);
}

/*
* login the app.
* */
export function login(username, pwd) {
    let url = `${urls.users}/login`;
    let data = {username: username, password: pwd};

    return myFetch(url, 'POST', headers, data);
}

/*
* register the user.
* */
export function register(username, phoneNumber, vCode, pwd) {
    let url = `${urls.users}/register`;
    let data = {
        username: username,
        phoneNumber: phoneNumber,
        vCode: vCode,
        password: pwd,
    };

    return myFetch(url, 'POST', headers, data);
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

    return myFetch(url, 'POST', headers, data);
}

/*
* upload the avatar to server.
* */
export function uploadAvatar(avatar) {
    let url = `${urls.users}/avatar`;
    let data = {
        avatar: avatar
    };

    return myFetch(url, 'POST', headers, data);
}