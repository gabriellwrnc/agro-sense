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
        symptoms: [
            {
                symptomCode: {
                    type: String,
                    ref: 'Symptom',
                },
                weight: {
                    type: Number,
                },
            },
        ],
        status: {
            type: String,
            enum: ['pending', 'verified', 'unverified'],
        },
    },
    { timestamps: true },
);

const Case = mongoose.model('Case', caseSchema);

export default Case;
