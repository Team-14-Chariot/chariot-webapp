import {client} from '../index';

async function createEvent(eventName, eventAddr, eventCity, eventState, eventZipCode, eventMaxRadius, eventRiderPassword, eventDriverPassword, ownerId){
    try {
        const fullAddr = "" + eventAddr + ", " + eventCity + ", " + eventState + " " + eventZipCode;
        const response = await client.records.create('events', {ride_max_radius: eventMaxRadius, accept_rides: true, event_name: eventName, address: fullAddr, owner: ownerId, rider_password: eventRiderPassword, driver_password: eventDriverPassword});
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

async function getDriversAndRides(eventCode) {
    try {   
    let allDrivers;
    await fetch('https://chariot.augustabt.com/api/getEventDrivers', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})}).then(res => {return res.json()}).then(d => allDrivers = d.drivers);
    let numRides = 0;
    console.log(allDrivers);
    for (let i = 0;  i < allDrivers.length; i++) {
        numRides += allDrivers[i].rides_completed;
    }
    console.log(numRides);
    console.log(allDrivers.length);
    return {status: "success", numRides: numRides, numDrivers: allDrivers.length};
    } catch(e) {
        console.log(e);
        return {status: "failed", numRides: "null", numDrivers: "null"};
    }
}

async function getETA(eventCode, startLocLat, startLocLng, endLocLat, endLocLng) {
    try {
        let eta;
        await fetch('https://chariot.augustabt.com/api/getRouteETA', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode, origin_latitude: startLocLat + "", origin_longitude: startLocLng + "", dest_latitude: endLocLat + "", dest_longitude: endLocLng + ""})}).then(res => {return res.json()}).then(d => eta = d.eta);
        console.log("calculated eta");
        console.log(eta);
        return {status: "success", eta: eta};
    } catch (e) {
        return {status: "failed", eta: null};
    }
}

async function getWaitTime(eventCode) {
    try {
        let waitTime;
        await fetch('https://chariot.augustabt.com/api/getBallparkETA', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})}).then(res => {return res.json()}).then(d => waitTime = d.eta);
        console.log("ballpark " + waitTime);
        return {status: "success", waitTime: waitTime};
    } catch (e) {
        return {status: "failed", waitTime: null};
    }
}

async function listRides(eventCode){
    try{
        console.log(`try to display rides ${eventCode}`);
        let queues;
        await fetch('https://chariot.augustabt.com/api/getRideQueues', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})}).then(res => {return res.json()}).then(d => queues = d.queues);
        console.log(queues);
        return {status: "success", rides: queues};
    } catch(e){
        return {status: "failed", rides: null};
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

async function listDrivers(eventCode){
    try{
        let eventDrivers;
        await fetch('https://chariot.augustabt.com/api/getEventDrivers', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})}).then(res => {return res.json()}).then(data => eventDrivers = data);        
        console.log(eventDrivers.drivers);
        return {status: "success", drivers: eventDrivers.drivers};
    } catch(e){
        return {status: "failed", drivers: null};
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

async function updateEvent(eventCode, newName, newAddressLine, newCity, newState, newZip, newRadius, newRiderPassword, newDriverPassword){
    try{
        const newFullAddr = "" + newAddressLine + ", " + newCity + ", " + newState + " " + newZip;
        const newNewRadius = parseInt(newRadius);
        const res = await fetch('https://chariot.augustabt.com/api/updateEventDetails', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode, name: newName, address: newFullAddr, max_radius: newNewRadius, rider_password: newRiderPassword, driver_password: newDriverPassword})});
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

async function removeDriver(driverId){
    try {
        console.log(driverId);
        await client.records.delete('driver', `${driverId}`);
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

async function listDrivers(eventCode) {
    try {
        let driverList;
        await fetch('https://chariot.augustabt.com/api/getEventDrivers', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({event_id: eventCode})}).then(res => {return res.json()}).then(data => driverList = data);
        console.log(driverList);
        return driverList.drivers;
    } catch (e) {
        return e;
    }
}



export {createEvent, retrieveEventInfo, listEvents, listDrivers, listRides, updateEvent, endEvent, checkEventCode, requestRide, sendImage, updateDropoff, updatePickup, removeDriver, getDriversAndRides, getETA, getWaitTime};
