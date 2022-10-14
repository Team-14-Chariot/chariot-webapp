import {client} from '../index';

async function createEventOrganizer(userEmail, userPassword){
    try {
        const createdUser = await client.users.create({email: userEmail, password: userPassword, passwordConfirm: userPassword});
        return {status: "success", record: createdUser};
    } catch (e){
        return {status: "failed", record: e};
    }
}

async function checkEventOrganizerTupleExists(userEmail, userPassword){
    try{
        const authData = await client.users.authViaEmail(userEmail, userPassword);
        return {status: "success", record: authData};
    } catch (e){
        return {status: "failed", record: e}
    }
}

async function checkEventOrganizerExists(userEmail){

    try {
        const recordId = generateRecordId(userEmail);
        const response = await client.users.getOne(recordId);
        return {status: "success", record: response};
    } catch (e) {
        return {status: "failed", record: e};
    }
}

async function changeEventOrganizerPasswordRequest(userEmail){
    try {
        console.log("attempt reset request");
        await client.users.requestPasswordReset(userEmail);
        console.log("attempt reset request worked");
        return{status: "success"};
    } catch (e) {
        return{status: "failed"};
    }
}

async function changeEventOrganizerPasswordSubmit(userToken, userNewPassword){
    try {
        const authData = await client.users.confirmPasswordReset(userToken, userNewPassword, userNewPassword);
        return{status: "success", data: authData};
    } catch (e) {
        return{status: "failed", data: e};
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

export {createEventOrganizer, checkEventOrganizerTupleExists, checkEventOrganizerExists, changeEventOrganizerPasswordRequest, changeEventOrganizerPasswordSubmit};