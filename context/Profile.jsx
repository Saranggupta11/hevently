import { createContext, useState } from 'react';

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
	const [profileData, setProfileData] = useState({});
	console.log(profileData);
	return (
		<ProfileContext.Provider value={{ profileData, setProfileData }}>
			{children}
		</ProfileContext.Provider>
	);
};
