import { Case, Consultation, Pest, Solution, User } from '../models';

export const consultate = async (req, res) => {
    const { symptomCodes, userId } = req.body;

    try {
        const user = await User.findOne({ _id: userId });
        const cases = await Case.find({ status: 'verified' });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        const similarityValues = [];
        for (const caseItem of cases) {
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

            const similarity = numerator / denominator;
            const similarityPercentage = (similarity * 100).toFixed(2);

            similarityValues.push({
                caseCode: caseItem.caseCode,
                similarityPercentage: parseFloat(similarityPercentage),
            });
        }

        const sortedSimilarityValues = similarityValues.sort(
            (a, b) => b.similarityPercentage - a.similarityPercentage,
        );
        const slicedSimilarityValues = sortedSimilarityValues.slice(0, 4);

        let otherPestResponse = [];
        const otherPests = slicedSimilarityValues.slice(1, 4);

        const mainPest = await Pest.findOne({
            pestCode: cases.find(
                item => item.caseCode === slicedSimilarityValues[0].caseCode,
            ).pestCode,
        });
        const mainPestSolution = await Solution.find({
            pestCode: cases.find(
                item => item.caseCode === slicedSimilarityValues[0].caseCode,
            ).pestCode,
        });

        for (const otherPest of otherPests) {
            const otherPestData = await Pest.findOne({
                pestCode: cases.find(
                    item => item.caseCode === otherPest.caseCode,
                ).pestCode,
            });
            const otherPestSolution = await Solution.find({
                pestCode: cases.find(
                    item => item.caseCode === otherPest.caseCode,
                ).pestCode,
            });

            otherPestResponse.push({
                name: otherPestData.name,
                solution: otherPestSolution.map(item => item.name),
                similarityPercentage: otherPest.similarityPercentage,
            });
        }

        if (slicedSimilarityValues[0].similarityPercentage < 60) {
            const casesCount = await Case.countDocuments();

            const newCase = new Case({
                caseCode: `K-${casesCount + 1}`,
                pestCode: mainPest.pestCode,
                symptoms: symptomCodes.map(symptomCode => ({
                    symptomCode,
                })),
                status: 'unverified',
            });

            newCase.save();
        }

        const newConsultation = new Consultation({
            userId,
            symptomCodes,
            consultationResult: {
                status:
                    slicedSimilarityValues[0].similarityPercentage < 60
                        ? 'newCase'
                        : 'oldCase',
                mainPest: {
                    name: mainPest.name,
                    solution: mainPestSolution.map(item => item.name),
                    similarityPercentage:
                        slicedSimilarityValues[0].similarityPercentage,
                },
                otherPests: otherPestResponse,
            },
        });

        newConsultation.save();

        return res.status(200).json({
            status: 'success',
            consultationResult: {
                consultationStatus: newConsultation.consultationResult.status,
                mainPest: {
                    name: mainPest.name,
                    solution: mainPestSolution.map(item => item.name),
                    similarityPercentage:
                        slicedSimilarityValues[0].similarityPercentage,
                },
                otherPests: otherPestResponse,
            },
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};
