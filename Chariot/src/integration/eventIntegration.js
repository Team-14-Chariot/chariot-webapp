import {client} from '../index';

async function createEvent(userEmail, eventName, eventAddr, eventCity, eventState, eventZipCode, eventMaxRadius, eventRiderPassword, ownerId){
    try {
        const fullAddr = "" + eventAddr + ", " + eventCity + ", " + eventState + " " + eventZipCode;
        const recordId = generateRecordId(userEmail, eventName);
        const response = await client.records.create('events', {id: recordId, ride_max_radius: eventMaxRadius, accept_rides: true, event_name: eventName, address: fullAddr, owner: ownerId, rider_password: eventRiderPassword});
        return {status: "success", record: response};
    } catch (e) {
        return {status: "failed", record: e};
    }
}

async function retrieveEventInfo(eventCode){
    try {
        let eventDetails;
        await fetch('https://chariot.augustabt.com/api/getEventDetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})}).then(res => {return res.json()}).then(data => eventDetails = data);
        
        //const demoRes = {event_id: "QWERT", ride_max_radius: 5, accept_rides: true, owner: "demo@gmail.com", address: "1235 Bretmoor Way, San Jose, CA 95129", event_name: "Demo Event"};
        const addressArray = eventDetails.address.split(', ');
        const stateZipArray = addressArray[2].split(' ');
        const address = addressArray[0];
        const city = addressArray[1];
        const state = stateZipArray[0];
        const zip = stateZipArray[1];
        const retInfo = {...eventDetails, address: address, city: city, state: state, zip: zip};
        return {status: "success", info: retInfo};
    } catch (e) {
        return {status: "failed", info: null};
    }
}


async function listEvents(){
    try{
        const pageResult = await client.records.getList('events', 1, 10, {sort: '-created', });
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

async function updateEvent(eventCode, newName, newAddressLine, newCity, newState, newZip, newRadius, newRiderPassword){
    try{
        const newFullAddr = "" + newAddressLine + ", " + newCity + ", " + newState + " " + newZip;
        const newNewRadius = parseInt(newRadius);
        const res = await fetch('https://chariot.augustabt.com/api/updateEventDetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode, name: newName, address: newFullAddr, max_radius: newNewRadius, rider_password: newRiderPassword})});
        if(res.status === 200){
            return{status: "success"};
        }
        throw new Error("Update Event Failed");
    } catch (e){
        return{status: "failed"}
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

async function requestRide(eventCode, originLat, originLng, destLat, destLng, riderName, groupSize){
    const newOriginLat = "" + originLat;
    const newOriginLng = "" + originLng;
    const newDestLat = "" + destLat;
    const newDestLng = "" + destLng;
    const newGroupSize = parseInt(groupSize);
    let rideId;
    await fetch('https://chariot.augustabt.com/api/requestRide', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode, origin_latitude: newOriginLat, origin_longitude: newOriginLng, dest_latitude: newDestLat, dest_longitude: newDestLng, rider_name: riderName, group_size: newGroupSize})}).then(res => {return res.json()}).then(data => rideId = data.ride_id);
    return rideId;
}

async function updatePickup(rideId, originLat, originLng) {
    console.log("update ride " + rideId + " " + originLat + " " + originLng);
    const newOriginLat = "" + originLat;
    const newOriginLng = "" + originLng;
    const record = await client.records.update('rides', rideId, {
        origin_latitude: newOriginLat,
        origin_longitude: newOriginLng
    });
}

async function updateDropoff(rideId, destLat, destLng) {
    const newDestLat = "" + destLat;
    const newDestLng = "" + destLng;
    const record = await client.records.update('rides', rideId, {
        dest_latitude: newDestLat,
        dest_longitude: newDestLng
    });
}

async function sendImage(rideId, image) {
    const formData = new FormData();
    console.log(image);
    formData.append('ride_id', rideId);
    formData.append('picture', image);
    
    const record = await client.records.create('pictures', formData);
}


export {createEvent, retrieveEventInfo, listEvents, updateEvent, endEvent, checkEventCode, requestRide, updatePickup, updateDropoff, sendImage};
