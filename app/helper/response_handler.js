import HttpStatus from 'http-status-codes';

export class ResponseHandler {

    static handle(response, data) {
        if (data.success) {
            const res = ResponseHandler.successResponse(data, data.statusCode);
            return response.response({ data: res.data }).code(res.statusCode);
        } else {
            if (data.exception) {
                const res = ResponseHandler.exceptionResponse(data, data.statusCode);
                return response.response({ errors: res.errors }).code(res.statusCode);
            } else {
                const res = ResponseHandler.errorResponse(data, data.statusCode);
                return response.response({ errors: res.errors }).code(res.statusCode);
            }
        }
    }

    static successResponse(data, statusCode=HttpStatus.OK) {
        return {
            data: data.data,
            statusCode: statusCode
        }
    }

    static errorResponse(error, statusCode=HttpStatus.BAD_REQUEST) {
        return {
            errors: error.errors,
            statusCode: statusCode
        }
    }

    static exceptionResponse(error, statusCode=HttpStatus.INTERNAL_SERVER_ERROR) {
        return {
            errors: String(error.errors),
            statusCode: statusCode
        }
    }

}