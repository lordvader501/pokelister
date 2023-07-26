import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithRedirect, signInWithPopup, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDtU9ZDMId2MBgO3eQZgV5dRf68oiFipuY',
	authDomain: 'pokelister-db.firebaseapp.com',
	projectId: 'pokelister-db',
	storageBucket: 'pokelister-db.appspot.com',
	messagingSenderId: '975716357472',
	appId: '1:975716357472:web:cbc0a83765c6d900353a05',
	measurementId: 'G-27WHLF292M'
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addFavourites = async (userAuth: User, pokemonData = {}) => {
	const favouritesRef = doc(db, 'favourites', userAuth.uid);
	const favSnapshot = await getDoc(favouritesRef);
	if (favSnapshot.exists()) {
		try {
			await updateDoc(favouritesRef, {
				...pokemonData
			});
		} catch (error) {
			console.log(error);
		}
	}
	else {
		try {
			await setDoc(favouritesRef, {
				...pokemonData
			});
		} catch (error) {
			console.log(error);
		}
	}
	return favouritesRef;
};
export const getFavourites = async (userAuth: User) => {
	const favouritesRef = doc(db, 'favourites', userAuth.uid);
	const favSnapshot = await getDoc(favouritesRef);
	return favSnapshot.data();
};
export const removeFavourites = async (userAuth: User, id: string) => {
	const favouritesRef = doc(db, 'favourites', userAuth.uid);
	await updateDoc(favouritesRef, {
		[ id ]: deleteField()
	});
};


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

export const signinAuthUserWithEmailAndPass = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
	onAuthStateChanged(auth, callback);
};