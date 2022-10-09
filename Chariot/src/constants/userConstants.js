
class userConstants {
    constructor(){
        this.signedIn = false;
        this.useremail = null;
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
}


export {userConstants};