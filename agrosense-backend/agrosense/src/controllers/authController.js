import {
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAuth } from '../utils';

export const signUp = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    console.log('req.body', req.body)

    try {
        const firebaseResponse = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
        );

        res.status(200).json({ status: 'success', message: firebaseResponse.user });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ status: 'fail', message: error });
    }
}