/**
 * Utils: custom API error class with status code.
 */

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ApiError;
