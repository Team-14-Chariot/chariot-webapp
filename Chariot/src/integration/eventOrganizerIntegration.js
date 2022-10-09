import {client} from '../index';

async function createEventOrganizer(userEmail, userPassword){
    const response = await client.records.create('organizers', {email: userEmail, password: userPassword});
    if (response.code === 200 || response.code === null){
        return {status: "success", record: response};
    } else {
        return {status: "failed", record: response};
    }
}

async function checkEventOrganizerExists(userEmail){
    const response = await client.records.getOne('organizers', {email: userEmail});
    if (response.code === 200 || response.code === null){
        return {status: "success", record: response};
    } else {
        return {status: "failed", record: response};
    }
}

export {createEventOrganizer, checkEventOrganizerExists};