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


async function listEvents(){
    try{
        const pageResult = await client.records.getList('events', 1, 10);
        return {status: "success", events: pageResult.items};
    } catch(e){
        return {status: "failed", events: null};
    }
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

export {createEvent, listEvents, endEvent};