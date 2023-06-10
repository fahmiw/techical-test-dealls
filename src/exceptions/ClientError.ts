export class ClientError extends Error {
    statusCode: number
    constructor(message: any, statusCode = 400) {
        super(message);
        Object.setPrototypeOf(this, ClientError.prototype);
        this.statusCode = statusCode;
    }
}