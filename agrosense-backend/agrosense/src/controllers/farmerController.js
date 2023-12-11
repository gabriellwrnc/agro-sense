import { Case, Pest, Symptom } from '../models';

export const consultate = async (req, res) => {
    const { symptomCodes } = req.body;

    try {
        const cases = await Case.find({});
        console.log('case count:', cases.length);
        const similarityValues = [];

        for (const caseItem of cases) {
            console.log('right now on case', caseItem.caseCode);

            let numerator = 0;
            let denominator = 0;
            for (const caseSymptom of caseItem.symptoms) {
                let symptomValue = 0;
                const weight = caseSymptom.weight;

                for (const consultationSymptom of symptomCodes) {
                    if (caseSymptom.symptomCode === consultationSymptom) {
                        symptomValue = 1;
                    }
                }
                numerator += symptomValue * weight;
                denominator += weight;
            }
            console.log(caseItem.caseCode, 'numerator:', numerator);
            console.log(caseItem.caseCode, 'denominator:', denominator);

            const similarity = numerator / denominator;
            const similarityPercentage = (similarity * 100).toFixed(2);

            similarityValues.push({
                caseCode: caseItem.caseCode,
                similarityPercentage: parseFloat(similarityPercentage),
            });

            console.log(
                'Similarity for case',
                caseItem.caseCode,
                ':',
                similarity,
            );
        }

        console.log('similarityValues', similarityValues);

        return res.status(200).json({
            status: 'success',
            message: 'Consultation success',
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};
