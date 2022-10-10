import {client} from '../index';

async function createEventOrganizer(userEmail, userPassword){
    const recordId = generateRecordId(userEmail);
    const response = await client.records.create('organizers', {id: recordId}, {email: userEmail, password: userPassword});
    if (response.code === 200 || response.code === null){
        return {status: "success", record: response};
    } else {
        return {status: "failed", record: response};
    }
}

async function checkEventOrganizerTupleExists(userEmail, userPassword){
    const recordId = generateRecordId(userEmail);
    const response = await client.records.getOne('organizers', recordId, {email: userEmail, password: userPassword});
    if (response.code === 200 || response.code === null){
        return {status: "success", record: response};
    } else {
        return {status: "failed", record: response};
    }
}

async function checkEventOrganizerExists(userEmail){
    const recordId = generateRecordId(userEmail);
    const response = await client.records.getOne('organizers', recordId, {email: userEmail});
    if (response.code === 200 || response.code === null){
        return {status: "success", record: response};
    } else {
        return {status: "failed", record: response};
    }
}

async function changeEventOrganizerPassword(userEmail, newPassword){
    const recordId = generateRecordId(userEmail);
    const response = await client.records.update('organizers', recordId, {password: newPassword});
    if (response.code === 200 || response.code === null){
        return {status: "success", record: response};
    } else {
        return {status: "failed", record: response};
    }
}

function hashCode(s) {
    let h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
}

function generateRecordId(userEmail){
    let hashNum = hashCode(userEmail);
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

export {createEventOrganizer, checkEventOrganizerTupleExists, checkEventOrganizerExists, changeEventOrganizerPassword};