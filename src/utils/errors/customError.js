 export class customError extends Error {
    constructor({ message, statusCode = 500, cause = null }) {
        super(message);
        this.cause = cause;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}