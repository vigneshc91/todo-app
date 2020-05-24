import Hapi from '@hapi/hapi';
import Jwt from 'hapi-auth-jwt2';
import DotEnv from 'dotenv';
import { todoRoute } from './routes/todo.route';
import { userRoute } from './routes/user.route';
import mongoose from 'mongoose';

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

    await mongoose.connect(process.env.MONGODB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGODB_NAME
    })

    await server.register(Jwt);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: validate
    });
    server.auth.default('jwt');

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, response) => {

            return response.response({data: 'Hello World'});
        }
    });

    userRoute(server);
    todoRoute(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();