import { UserController } from '../controllers/user.controller';
import createUserValidator from '../validators/create_user.validator';
import loginUserValidator from '../validators/login_user.validator';
import updateUserValidator from '../validators/update_user.validator';

export function userRoute(server) {

    server.route({
        method: 'POST',
        path: '/api/users',
        options: {
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
        handler: UserController.getUser
    });

}