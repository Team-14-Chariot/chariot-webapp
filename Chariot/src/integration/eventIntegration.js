import {client} from '../index';

async function createEvent(userEmail, eventName, eventZipCode, eventMaxRadius, ownerId){
    try {
        const recordId = generateRecordId(userEmail, eventName, eventZipCode);
        const response = await client.records.create('events', {id: recordId, ride_max_radius: eventMaxRadius, accept_rides: true, latitude: 80, longitude: 80, owner: ownerId});
        return {status: "success", record: response};
    } catch (e) {
        return {status: "failed", record: e};
    }
}

async function getEventCode(userEmail, eventName, eventZipCode){
    try{
        const recordId = generateRecordId(userEmail, eventName, eventZipCode);
        const response = await client.records.getOne('events', recordId);
        if(response.eventCode === null){
            throw new Error('Event Creation Error');
        }
        return {status: "success", eventCode: response.eventCode};
    } catch (e){
        return {status: "failed", eventCode: e.message}
    }
}

async function endEvent(userEmail, eventName, eventZipCode){
    try {
        const recordId = generateRecordId(userEmail, eventName, eventZipCode);
        const response = await client.records.update('events', recordId, {accept_rides: false});
        if(response.accept_rides === true){
            throw new Error('Not able to end event');
        }
        return {status: "success", record: response};
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

function generateRecordId(userEmail, eventName, eventZipCode){
    const inputConcat = "" + userEmail + eventName + eventZipCode;
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

export {createEvent, getEventCode};