import { UserController } from '../controllers/user.controller';
import createUserValidator from '../validators/create_user.validator';
import loginUserValidator from '../validators/login_user.validator';
import updateUserValidator from '../validators/update_user.validator';

export function userRoute(server) {

    server.route({
        method: 'POST',
        path: '/api/users',
        options: {
            tags: ['api', 'User'],
            description: 'Create a new user',
            notes: 'User Register',
            auth: false,
            validate: {
                payload: createUserValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: UserController.createUser
    });

    server.route({
        method: 'POST',
        path: '/api/users/login',
        options: {
            tags: ['api', 'User'],
            description: 'Authenticates the user with the given email and password',
            notes: 'User Login',
            auth: false,
            validate: {
                payload: loginUserValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: UserController.loginUser
    });

    server.route({
        method: 'PUT',
        path: '/api/users/me',
        options: {
            tags: ['api', 'User'],
            description: 'Update user details',
            notes: 'User Update',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                payload: updateUserValidator,
                failAction: (request, response, err) => {
                    throw err;
                }
            }
        },
        handler: UserController.updateUser
    });

    server.route({
        method: 'GET',
        path: '/api/users/me',
        options: {
            tags: ['api', 'User'],
            description: 'Get user details',
            notes: 'User Get',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
        },
        handler: UserController.getUser
    });

}