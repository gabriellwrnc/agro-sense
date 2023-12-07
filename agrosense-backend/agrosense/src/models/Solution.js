import mongoose from 'mongoose';

const solutionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        solutionCode: {
            type: String,
            required: true,
            unique: true,
        },
        pestCode: {
            type: [String],
            ref: 'Pest',
        },
    },
    { timestamps: true },
);

const Solution = mongoose.model('Solution', solutionSchema);

export default Solution;
