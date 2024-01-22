import { Pest, Solution, Symptom } from '../models';

export const getAllPests = async (req, res) => {
    try {
        let pestsData = [];
        const pests = await Pest.find();

        for (const pest of pests) {
            const symptoms = await Symptom.find({
                pestCode: { $in: pest.pestCode },
            }).exec();

            const solutions = await Solution.find({
                pestCode: { $in: pest.pestCode },
            }).exec();

            pestsData.push({
                name: pest.name,
                pestCode: pest.pestCode,
                description: pest.description,
                imageUrl: pest.imageUrl,
                caseCount: pest.caseCount,
                symptoms: symptoms.map(symptom => symptom.name),
                solutions: solutions.map(solution => solution.name),
            });
        }

        return res.status(200).json({
            status: 'success',
            data: pestsData,
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};
