import { ResponseHandler } from '../helper/response_handler';
import Httpstatus from 'http-status-codes';
import { TodoService } from '../services/todo.service';

export class TodoController {

    /**
     * Create a new todo
     * @param {object} request 
     * @param {object} response 
     */
    static async createTodo(request, response) {
        try {
            const data = await TodoService.createTodo(request.payload, request.auth.credentials.subject);
            
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
     * Get the list of todo
     * @param {object} request 
     * @param {object} response 
     */
    static async listTodo(request, response) {
        try {
            const data = await TodoService.listTodo(request.query, request.auth.credentials.subject);
            
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
     * Get the todo
     * @param {object} request 
     * @param {object} response 
     */
    static async getTodo(request, response) {
        try {
            const data = await TodoService.getTodoById(request.params.id, request.auth.credentials.subject);
            
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
     * Update the todo
     * @param {object} request 
     * @param {object} response 
     */
    static async updateTodo(request, response) {
        try {
            const data = await TodoService.updateTodo(request.payload, request.params.id, request.auth.credentials.subject);
            
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
     * Delete the todo
     * @param {object} request 
     * @param {object} response 
     */
    static async deleteTodo(request, response) {
        try {
            const data = await TodoService.deleteTodo(request.params.id, request.auth.credentials.subject);
            
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
     * Change todo status
     * @param {object} request 
     * @param {object} response 
     */
    static async changeTodoStatus(request, response) {
        try {
            const data = await TodoService.changeTodoStatus(request.payload, request.params.id, request.auth.credentials.subject);
            
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