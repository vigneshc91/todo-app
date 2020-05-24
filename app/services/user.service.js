import HttpStatus from 'http-status-codes';
import { UserModel, Status } from '../models/user.model';
import * as FailureConstants from '../helper/failure_constants';
import { hash, verify } from 'argon2';
import jwt from 'jsonwebtoken';

export class UserService {

    /**
     * Get the user details by its email
     * @param {string} email 
     */
    static async getUserByEmail(email, field) {
        try {

            let user = UserModel.findOne({
                email: email,
                status: { $ne: Status.DELETED }
            });

            if (field) {
                user.select(`+${field}`);
            }

            user = await user.exec();

            if (!user) {
                return {
                    success: 0,
                    errors: FailureConstants.USER_NOT_FOUND,
                    statusCode: HttpStatus.NOT_FOUND
                };
            }
            
            return {
                success: 1,
                data: user,
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
     * Get the user details by its id
     * @param {string} email 
     */
    static async getUserById(id) {
        try {

            const user = await UserModel.findOne({
                _id: id,
                status: { $ne: Status.DELETED }
            });

            if (!user) {
                return {
                    success: 0,
                    errors: FailureConstants.USER_NOT_FOUND,
                    statusCode: HttpStatus.NOT_FOUND
                };
            }
            
            return {
                success: 1,
                data: user,
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
     * Create a new user with the given data
     * @param {object} data 
     */
    static async createUser(data) {
        try {

            const isUserExist = await this.getUserByEmail(data.email);
            if (isUserExist.success) {
                return {
                    success: 0,
                    errors: FailureConstants.EMAIL_ALREADY_EIXST,
                    statusCode: HttpStatus.BAD_REQUEST
                }
            }

            data.password = await hash(data.password);
            let user = await UserModel.create(data);
            user = user.toObject();
            delete user.password;

            return {
                success: 1,
                data: user,
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
     * Authenticates the user with the given email and password and generate access token if valid
     * @param {object} data 
     */
    static async login(data) {
        try {
            let user = await this.getUserByEmail(data.email, 'password');
            if (!user.success) {
                return user;
            }
            user = user.data

            if(!await verify(user.password, data.password)) {
                return {
                    success: 0,
                    errors: FailureConstants.INVALID_CREDENTIALS,
                    statusCode: HttpStatus.UNAUTHORIZED
                };
            }

            const token = jwt.sign({
                subject: user._id,
                data: {
                    email: user.email
                }
            }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES}h` });

            user = user.toObject();
            delete user.password;
            user.accessToken = token;

            return {
                success: 1,
                data: user,
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
     * Update the user with the given details
     * @param {object} data 
     * @param {string} email 
     */
    static async updateUser(data, email) {
        try {
            let user = await this.getUserByEmail(email, 'password');
            if (!user.success) {
                return user;
            }
            user = user.data

            if (data.password) {
                data.password = await hash(data.password);
            }

            for (const key of Object.keys(data)) {
                user[key] = data[key];
            }

            user.save();
            user = user.toObject();
            delete user.password;

            return {
                success: 1,
                data: user,
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