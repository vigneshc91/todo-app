import mongoose from "mongoose";

export const Status = {
    NEW: 1,
    INPROGRESS: 2,
    COMPLETED: 3,
    DELETED: 4
}

export const Label = {
    PERSONAL: 1,
    WORK: 2,
    SHOPPING: 3,
    OTHER: 4
}

export const Pagination = {
    SKIP: 0,
    SIZE: 10
}

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    label: { type: Number, enum: Object.values(Label) },
    dueDate: Date,
    user: { type: 'ObjectId', ref: 'User' },
    status: { type: Number, enum: Object.values(Status), default: Status.NEW }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export const TodoModel = mongoose.model('Todo', TodoSchema);