
class userConstants {
    constructor(){
        this.signedIn = false;
        this.useremail = null;
        this.userToken = null;
        this.userId = null;
    }
    getSignedIn() {
        return this.signedIn;
    }
    setSignedIn(newSignedIn) {
        this.signedIn = newSignedIn;
    }
    getUserEmail() {
        return this.userEmail;
    }
    setUserEmail(newUserEmail) {
        this.userEmail = newUserEmail;
    }
    getUserToken() {
        return this.userToken;
    }
    setUserToken(newUserToken) {
        this.userToken = newUserToken;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(newUserId) {
        this.userId = newUserId;
    }
}


export {userConstants};