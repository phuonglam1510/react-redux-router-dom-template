import EventEmitter from "../EventEmitter";

/** 
 * THIS IS FOR MY TEAM STANDARD 
 export const apiSerializer = (data) => {
    if (data.message === 'access is denied') {
        EventEmitter.emit("session_timeout");
    } else if (data.data) {
        return data.data;
    } else if (data.message) {
        throw new Error(data.message);
    } else {
        throw new Error("Something wrong. Please try again!");
    }
}
* */


export const apiSerializer = (data) => {
    if (data && data.message) {
        throw new Error(data.message);
    } else if (data) {
        return data;
    } else {
        throw new Error("Something wrong. Please try again!");
    }
}

export default {
    apiSerializer
}


