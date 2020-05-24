import mongoose from "mongoose";

export const Status = {
    DRAFT: 0,
    ACTIVE: 1,
    DELETED: 2
}

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: { type: String, select: false },
    countryCode: String,
    phoneNumber: String,
    status: { type: Number, enum: Object.values(Status), default: Status.ACTIVE }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export const UserModel = mongoose.model('User', UserSchema);