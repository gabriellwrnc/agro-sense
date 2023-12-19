import { Case, Consultation, Pest, Solution, Symptom, User } from '../models';
import { firebaseAdmin } from '../utils';

export const addSymptom = async (req, res) => {
    const { name } = req.body;

    try {
        const symptomCount = await Symptom.countDocuments();
        const symptomCode = `G-${symptomCount > 9 ? '' : '0'}${
            symptomCount + 1
        }`;

        const newSymptom = new Symptom({
            name,
            symptomCode,
        });

        await newSymptom.save();

        return res.status(200).json({
            status: 'success',
            message: {
                data: {
                    name: newSymptom.name,
                    symptomCode: newSymptom.symptomCode,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const addSolution = async (req, res) => {
    const { name } = req.body;

    try {
        const solutionCount = await Solution.countDocuments();
        const solutionCode = `S-${solutionCount > 9 ? '' : '0'}${
            solutionCount + 1
        }`;

        const newSolution = new Solution({
            name,
            solutionCode,
        });

        await newSolution.save();

        return res.status(200).json({
            status: 'success',
            message: {
                data: {
                    name: newSolution.name,
                    solutionCode: newSolution.solutionCode,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const addPest = async (req, res) => {
    const { name, description, symptom, solutionCodes } = req.body;

    try {
        let symptoms = [];
        let solutions = [];
        const pestCount = await Pest.countDocuments();
        const pestCode = `H-${pestCount > 9 ? '' : '0'}${pestCount + 1}`;

        const newPest = new Pest({
            name,
            description,
            pestCode,
        });

        await newPest.save();

        for (const { symptomCode, weightValue } of symptom) {
            const symptomFound = await Symptom.findOne({ symptomCode });
            if (!symptomFound) {
                return res
                    .status(404)
                    .json({ status: 'fail', message: 'Symptom not found' });
            }

            symptoms.push(symptomFound.name);

            await symptomFound.updateOne({
                $push: { pestCode, weight: { pestCode, weightValue } },
            });
        }

        for (const solutionCode of solutionCodes) {
            const solutionFound = await Solution.findOne({ solutionCode });
            solutionCode;
            if (!solutionFound) {
                return res
                    .status(404)
                    .json({ status: 'fail', message: 'Solution not found' });
            }

            solutions.push(solutionFound.name);

            await solutionFound.updateOne({
                $push: { pestCode },
            });
        }

        return res.status(200).json({
            status: 'success',
            message: {
                data: {
                    pest: newPest,
                    symptoms,
                    solutions,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const addPestImage = async (req, res) => {
    const file = req.file;
    const { pestCode } = req.body;
    const bucket = firebaseAdmin.storage().bucket();

    if (!file) {
        return res.status(400).json({ error: 'No file found' });
    }

    if (!bucket) {
        return res.status(404).json({ error: 'Bucket not found' });
    }

    try {
        const uploadedFile = bucket.file(file.originalname);
        await uploadedFile.save(file.buffer, {
            contentType: file.mimetype,
            public: true,
        });

        const [imageUrl] = await uploadedFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });

        const pestFound = await Pest.findOne({ pestCode });
        if (!pestFound) {
            return res
                .status(404)
                .json({ status: 'fail', message: 'Pest not found' });
        }

        await pestFound.updateOne({ imageUrl }, { new: true });

        return res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const addVerifiedCase = async (req, res) => {
    const { pestCode, symptomCodes } = req.body;

    try {
        let symptoms = [];
        const pestFound = await Pest.findOne({ pestCode });
        if (!pestFound) {
            return res
                .status(404)
                .json({ status: 'fail', message: 'Pest not found' });
        }

        const caseCount = await Case.countDocuments();
        const caseCode = `K-${caseCount >= 9 ? '' : '0'}${caseCount + 1}`;

        for (const symptomCode of symptomCodes) {
            const symptomFound = await Symptom.findOne({ symptomCode });
            if (!symptomFound) {
                return res
                    .status(404)
                    .json({ status: 'fail', message: 'Symptom not found' });
            }

            symptoms.push({
                symptomCode,
                weight: symptomFound.weight.find(
                    weight => weight.pestCode === pestCode,
                ).weightValue,
            });
        }

        const newCase = new Case({
            caseCode,
            pestCode,
            symptoms,
            status: 'verified',
        });

        newCase.save();

        await pestFound.updateOne({ $inc: { caseCount: 1 } });

        return res.status(200).json({
            status: 'success',
            message: {
                data: {
                    newCase,
                },
            },
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'farmer' });

        if (!users) {
            return res
                .status(404)
                .json({ status: 'fail', message: 'User not found' });
        }

        const userResponse = await Promise.all(
            users.map(async user => {
                const userConsultations = await Consultation.find({
                    userId: user._id,
                });

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    firebaseId: user.firebaseId,
                    consultationCount: userConsultations.length,
                };
            }),
        );

        return res.status(200).json({
            status: 'success',
            data: userResponse,
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const getAllCases = async (req, res) => {
    try {
        const cases = await Case.find();
        const unverifiedCase = cases.filter(
            caseData => caseData.status === 'unverified',
        );

        return res.status(200).json({
            status: 'success',
            data: {
                unverifiedCaseCount: unverifiedCase.length,
                cases,
            },
        });
    } catch (error) {}
};
