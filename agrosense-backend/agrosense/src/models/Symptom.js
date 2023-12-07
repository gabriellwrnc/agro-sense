import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        symptomCode: {
            type: String,
            required: true,
            unique: true,
        },
        weight: [
            {
                pestCode: {
                    type: String,
                    ref: 'Pest',
                },
                weightValue: {
                    type: Number,
                },
            },
        ],
        pestCode: {
            type: [String],
            ref: 'Pest',
        },
    },
    { timestamps: true },
);

const Symptom = mongoose.model('Symptom', symptomSchema);

export default Symptom;
