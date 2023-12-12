import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: 'User',
        },
        symptomCodes: {
            type: [String],
            required: true,
        },
        consultationResult: {
            status: {
                type: String,
                enum: ['oldCase', 'newCase'],
                required: true,
            },
            mainPest: {
                name: {
                    type: String,
                },
                solution: {
                    type: [String],
                },
                similarityPercentage: {
                    type: Number,
                },
            },
            otherPests: [
                {
                    name: {
                        type: String,
                    },
                    solution: {
                        type: [String],
                    },
                    similarityPercentage: {
                        type: Number,
                    },
                },
            ],
        },
    },
    { timestamps: true },
);

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
