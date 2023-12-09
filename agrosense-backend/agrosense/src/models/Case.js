import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema(
    {
        caseCode: {
            type: String,
            required: true,
            unique: true,
        },
        pestCode: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'verified', 'unverified'],
        },
    },
    { timestamps: true },
);

const Case = mongoose.model('Case', caseSchema);

export default Case;
