import {myFetch} from "./functions";

const urls = {
    messages: 'http://192.168.0.201/ChargingPileService/api/messages',
    stations: 'http://192.168.0.201/ChargingPileService/api/stations',
    chargingRecords: 'http://192.168.0.201/ChargingPileService/api/chargingRecords',
    charging: 'http://192.168.0.201/ChargingPileService/api/charging',
    users: 'http://192.168.0.201/ChargingPileService/api/users',
};

const headers = {
    'Content-Type': 'application/json; charset: utf-8',
};

/*
 * send message, eg. verify code.
 */
export function sendMessage(phoneNumbers){
    let url = `${urls.messages}?phoneNumber=${phoneNumbers}`;
    return fetch(url, {
        method: 'GET',
        timeout: 3000,
        contentLength: 0,
    })
        .then(response=>response.json())
        .catch(error=>{
            console.log(error);
        })
}

/*
 * get all the stations with brief info.
 **/
export function getAllStationsWithBriefInfo() {
    let url = urls.stations;

    return myFetch(url, 'GET', headers)
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            throw new Error(error);
        });
}

/*
 * query the station by id.
 */
export function getSingleStation(id, callback) {
    let url =  `${urls.stations}/${id}`;
    return fetch(url, {
        method: 'GET',
        timeout: 3000,
        contentLength: 0,
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('not found ...');
            }
        })
        .catch(error=>{
            console.log(error);
        });
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