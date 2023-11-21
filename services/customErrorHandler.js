class CustomErrorHandler {
    constructor (status,message) {
        this.status = status;
        this.message = message
    }
    static error(status=500,message = "Unauthorize user") {
        return new CustomErrorHandler(status,message);
    }
}

export default CustomErrorHandler;