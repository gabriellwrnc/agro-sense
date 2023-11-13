import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    firebaseId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'farmer'],
        default: 'farmer',
    },
})

const User = mongoose.model('User', userSchema);

export default User;