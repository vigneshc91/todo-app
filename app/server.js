import Hapi from '@hapi/hapi';
import Jwt from 'hapi-auth-jwt2';
import DotEnv from 'dotenv';
import { todoRoute } from './routes/todo.route';
import { userRoute } from './routes/user.route';
import mongoose from 'mongoose';
import Vision from '@hapi/vision';
import Inert from '@hapi/inert';
import HapiSwagger from 'hapi-swagger';
import * as AppConstants from './helper/app_constants';
import * as FailureConstants from './helper/failure_constants';
import HttpStatus from 'http-status-codes';

const validate  = (decoded, request, response) => {
    if (!decoded) {
        return {
            isValid: false
        };
    }
    return {
        isValid: true,
        credentials: decoded
    };
}

const init = async () => {
    
    DotEnv.config();

    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
            title: 'TODO REST API Documentation',
            version: '1.0.0',
        },
        grouping: 'tags',
        securityDefinitions: {
            apiKey: {
              in: 'header',
              name: 'Authorization',
              type: 'apiKey'
            }
        }
    };

    await mongoose.connect(`${process.env.MONGODB_HOST}${process.env.MONGODB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await server.register([
        Jwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: validate,
        verifyOptions: {
            algorithms: [ AppConstants.JWT_ALGORITHM ]
        }
    });
    server.auth.default('jwt');

    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: false
        },
        handler: (request, response) => {
            return response.response({data: 'Hello World'});
        }
    });
    
    userRoute(server);
    todoRoute(server);

    server.route({
        method: '*',
        path: '/{any*}',
        options: {
            auth: false
        },
        handler: function (request, response) {
            return response.response({ errors: FailureConstants.PAGE_NOT_FOUND }).code(HttpStatus.NOT_FOUND);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();