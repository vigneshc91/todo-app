import { TodoController } from '../controllers/todo.controller';
import createTodoValidator from '../validators/create_todo.validator';
import updateTodoValidator from '../validators/update_todo.validator';
import listTodoValidator from '../validators/list_todo.validator';
import changeTodoStatusValidator from '../validators/change_todo_status.validator';
import Joi from '@hapi/joi';

export function todoRoute(server) {

    server.route({
        method: 'POST',
        path: '/api/todos',
        options: {
            tags: ['api', 'Todo'],
            description: 'Create a new todo with the given info',
            notes: 'Todo Create',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                payload: createTodoValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: TodoController.createTodo
    });

    server.route({
        method: 'PUT',
        path: '/api/todos/{id}',
        options: {
            tags: ['api', 'Todo'],
            description: 'Update the details of the todo with the given info',
            notes: 'Todo Update',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                payload: updateTodoValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: TodoController.updateTodo
    })
    
    server.route({
        method: 'GET',
        path: '/api/todos',
        options: {
            tags: ['api', 'Todo'],
            description: 'Get the list of todo created by the user',
            notes: 'Todo List',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                query: listTodoValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: TodoController.listTodo
    });

    server.route({
        method: 'GET',
        path: '/api/todos/{id}',
        options: {
            tags: ['api', 'Todo'],
            description: 'Get details of the todo',
            notes: 'Todo Get',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
        handler: TodoController.getTodo
    });

    server.route({
        method: 'DELETE',
        path: '/api/todos/{id}',
        options: {
            tags: ['api', 'Todo'],
            description: 'Delete the given todo',
            notes: 'Todo Delete',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
        handler: TodoController.deleteTodo
    });

    server.route({
        method: 'PATCH',
        path: '/api/todos/{id}',
        options: {
            tags: ['api', 'Todo'],
            description: 'Change the status of the given todo',
            notes: 'Todo Status Change',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                payload: changeTodoStatusValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: TodoController.changeTodoStatus
    });

}