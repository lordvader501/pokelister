import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { createUserDocFromAuth, onAuthStateChangedListener } from './../Auth/firebase';

interface UserProps {
  currUser: User | null;
  setCurrUser:React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserProps>({
	currUser:null,
	setCurrUser: () => null
});

export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
	const [currUser, setCurrUser] = useState<User | null>(null);
	const value:UserProps = {currUser, setCurrUser};

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user:User | null) => {
			if (user) {
				const [firstname , lastname]  = user.displayName ? user.displayName.split(' ') : ['', ''];
				await createUserDocFromAuth(user, {firstname, lastname});
			}
			setCurrUser(user);
		});

		return unsubscribe;
	},[]);

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};
