import mongoose from 'mongoose';

const pestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        pestCode: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
    },
    { timestamps: true },
);

const Pest = mongoose.model('Pest', pestSchema);

export default Pest;
