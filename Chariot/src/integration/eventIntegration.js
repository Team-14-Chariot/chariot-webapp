import {client} from '../index';

async function createEvent(userEmail, eventName, eventAddr, eventCity, eventState, eventZipCode, eventMaxRadius, ownerId){
    try {
        const fullAddr = "" + eventAddr + ", " + eventCity + ", " + eventState + " " + eventZipCode;
        const recordId = generateRecordId(userEmail, eventName);
        const response = await client.records.create('events', {id: recordId, ride_max_radius: eventMaxRadius, accept_rides: true, event_name: eventName, address: fullAddr, owner: ownerId});
        return {status: "success", record: response};
    } catch (e) {
        return {status: "failed", record: e};
    }
}

async function retrieveEventInfo(eventCode){
    try {
        //const res = await fetch('https://chariot.augustabt.com/api/retrieveEvent', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})});
        const demoRes = {event_id: "QWERT", ride_max_radius: 5, accept_rides: true, owner: "demo@gmail.com", address: "1235 Bretmoor Way, San Jose, CA 95129", event_name: "Demo Event"};
        const addressArray = demoRes.address.split(', ');
        const stateZipArray = addressArray[2].split(' ');
        const address = addressArray[0];
        const city = addressArray[1];
        const state = stateZipArray[0];
        const zip = stateZipArray[1];
        const retInfo = {...demoRes, address: address, city: city, state: state, zip: zip};
        return {status: "success", info: retInfo};
    } catch (e) {
        return {status: "failed", info: null};
    }
}


async function listEvents(){
    try{
        const pageResult = await client.records.getList('events', 1, 10);
        return {status: "success", events: pageResult.items};
    } catch(e){
        return {status: "failed", events: null};
    }
}

async function checkEventCode(eventCode){
    try{
        const res = await fetch('https://chariot.augustabt.com/api/validateEvent', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})});
        if(res.status === 200){
            return {status: "success"};
        } else {
            throw new Error("Not a valid event code");
        }
    } catch (e){
        return {status: "failed"};
    }
}

async function updateEvent(eventCode, newName, newAddressLine, newCity, newState, newZip, newRadius){
    return{status: "success"};
}

async function endEvent(eventCode){
    try {
        console.log(eventCode);
        await fetch('https://chariot.augustabt.com/api/endEvent', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})});
        return {status: "success"};
    } catch (e) {
        return {status: "failed", record: e}
    }
}

function hashCode(s) {
    let h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
}

function generateRecordId(userEmail, eventName){
    const inputConcat = "" + userEmail + eventName;
    let hashNum = hashCode(inputConcat);
    if(hashNum < 0){
        hashNum *= -1;
    }
    const fullHash = "" + hashNum;
    let tempHash = "";
    if(fullHash.length < 15){
        tempHash = fullHash;
        while(tempHash.length < 15){
            tempHash += '0';
        }
    } else if(fullHash.length > 15){
        let idx = 0;
        while(idx < 15){
            tempHash += fullHash.charAt(idx);
            idx++;
        }
    } else {
        tempHash = fullHash;
    }
    return tempHash;
}

export {createEvent, retrieveEventInfo, listEvents, updateEvent, endEvent, checkEventCode};