import HttpStatus from 'http-status-codes';
import { TodoModel, Status, Pagination } from '../models/todo.model';
import * as FailureConstants from '../helper/failure_constants';
import moment from 'moment';

export class TodoService {
    
    /**
     * Create a new todo under the user
     * @param {object} data 
     * @param {string} user 
     */
    static async createTodo(data, user) {
        try {
            data.user = user;
            
            const todo = await TodoModel.create(data);
            
            return {
                success: 1,
                data: todo,
                statusCode: HttpStatus.CREATED
            };

        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Get the list of todo
     * @param {object} data 
     * @param {string} user 
     */
    static async listTodo(data, user) {
        try {
            let conditions = {
                user: user,
                status: { $ne: Status.DELETED }
            };

            if (data.status) {
                if (data.status instanceof Array) {
                    conditions.status = { $in: data.status };
                } else {
                    conditions.status = data.status;
                }
            } else {
                conditions.status = { $ne: Status.DELETED };
            }

            if (data.label) {
                if (data.label instanceof Array) {
                    conditions.label = { $in: data.label };
                } else {
                    conditions.label = data.label;
                }
            }

            if (data.search) {
                conditions.$or = [
                    { title: { $regex: data.search, $options: 'i'} },
                    { description: { $regex: data.search, $options: 'i'} }
                ]
            }

            if (data.dueDate) {
                conditions.dueDate = { $gt: moment(data.dueDate).startOf('day'), $lt: moment(data.dueDate).endOf('day') };
            }

            let todo = TodoModel.find(conditions);

            if (!data.all) {
                todo.skip(data.skip || Pagination.SKIP).limit(data.size || Pagination.SIZE);
            }

            if (data.sort) {
                todo.sort(data.sort)
            } else {
                todo.sort('-createdAt');
            }

            todo = await todo.exec();

            return {
                success: 1,
                data: todo,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Get the details of the todo
     * @param {string} id 
     * @param {string} user 
     */
    static async getTodoById(id, user) {
        try {
            let conditions = {
                _id: id,
                status: { $ne: Status.DELETED }
            };

            if (user) {
                conditions.user = user;
            }

            const todo = await TodoModel.findOne(conditions);

            if (!todo) {
                return {
                    success: 0,
                    errors: FailureConstants.TODO_NOT_FOUND,
                    statusCode: HttpStatus.NOT_FOUND
                };
            }

            return {
                success: 1,
                data: todo,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Delete the todo
     * @param {string} id 
     * @param {string} user 
     */
    static async deleteTodo(id, user) {
        try {
            let todo = await this.getTodoById(id, user);
            if (!todo.success) {
                return todo;
            }
            todo = todo.data;

            todo.status = Status.DELETED;
            await todo.save();

            return {
                success: 1,
                data: todo,
                statusCode: HttpStatus.NO_CONTENT
            };

        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Update the details of the todo
     * @param {object} data 
     * @param {string} id 
     * @param {string} user 
     */
    static async updateTodo(data, id, user) {
        try {
            let todo = await this.getTodoById(id, user);
            if (!todo.success) {
                return todo;
            }
            todo = todo.data;

            for (const key of Object.keys(data)) {
                todo[key] = data[key];
            }

            await todo.save();

            return {
                success: 1,
                data: todo,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Change the status of the todo
     * @param {object} data 
     * @param {string} id 
     * @param {string} user 
     */
    static async changeTodoStatus(data, id, user) {
        try {

            let todo = await this.getTodoById(id, user);
            if (!todo.success) {
                return todo;
            }
            todo = todo.data;

            todo.status = data.status;
            await todo.save();

            return {
                success: 1,
                data: todo,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

}