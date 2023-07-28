module.exports = class ResponseForm {
    constructor(status, errCode, message, data) {
        this.status = status;
        this.errCode = errCode;
        this.message = message;
        this.data = data;
    }
}