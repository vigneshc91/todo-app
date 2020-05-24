import { TodoController } from '../controllers/todo.controller';
import createTodoValidator from '../validators/create_todo.validator';
import updateTodoValidator from '../validators/update_todo.validator';
import listTodoValidator from '../validators/list_todo.validator';
import changeTodoStatusValidator from '../validators/change_todo_status.validator';

export function todoRoute(server) {

    server.route({
        method: 'POST',
        path: '/api/todos',
        options: {
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
            validate: {
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
        handler: TodoController.getTodo
    });

    server.route({
        method: 'DELETE',
        path: '/api/todos/{id}',
        handler: TodoController.deleteTodo
    });

    server.route({
        method: 'PATCH',
        path: '/api/todos/{id}',
        options: {
            validate: {
                payload: changeTodoStatusValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: TodoController.changeTodoStatus
    });

}