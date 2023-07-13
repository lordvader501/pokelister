import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithRedirect, signInWithPopup, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDtU9ZDMId2MBgO3eQZgV5dRf68oiFipuY',
	authDomain: 'pokelister-db.firebaseapp.com',
	projectId: 'pokelister-db',
	storageBucket: 'pokelister-db.appspot.com',
	messagingSenderId: '975716357472',
	appId: '1:975716357472:web:cbc0a83765c6d900353a05',
	measurementId: 'G-27WHLF292M'
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


export const createUserDocFromAuth = async (userAuth: User, aditionalInfo = {}) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...aditionalInfo
			});
		} catch (error) {
			console.log(error);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPass = async (email: string, password: string) => {

	return await createUserWithEmailAndPassword(auth, email, password);
};