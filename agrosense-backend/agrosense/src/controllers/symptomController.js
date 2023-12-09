import { Symptom } from '../models';

export const getAllSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptom.find();
        return res.status(200).json({
            status: 'success',
            message: {
                data: {
                    symptoms: symptoms.map(symptom => {
                        return {
                            name: symptom.name,
                            symptomCode: symptom.symptomCode,
                            pestCode: symptom.pestCode,
                            weight: symptom.weight,
                        };
                    }),
                },
            },
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};
