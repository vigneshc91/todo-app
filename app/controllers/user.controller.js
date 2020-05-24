import { UserService } from '../services/user.service';
import { ResponseHandler } from '../helper/response_handler';
import Httpstatus from 'http-status-codes';

export class UserController {

    /**
     * Register new user
     * @param {object} request 
     * @param {object} response 
     */
    static async createUser(request, response) {
        try {
            const data = await UserService.createUser(request.payload);
            
            return ResponseHandler.handle(response, data)
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Authenticates user
     * @param {object} request 
     * @param {object} response 
     */
    static async loginUser(request, response) {
        try {
            const data = await UserService.login(request.payload);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Update user info
     * @param {object} request 
     * @param {object} response 
     */
    static async updateUser(request, response) {
        try {
            const data = await UserService.updateUser(request.payload, request.auth.credentials.data.email);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Get the user details
     * @param {object} request 
     * @param {object} response 
     */
    static async getUser(request, response) {
        try {
            const data = await UserService.getUserById(request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

}