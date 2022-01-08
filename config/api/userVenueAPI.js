import { auth } from '../firebase/firebase';

export async function addUserVenue(venue, type, id) {
	try {
		const newVenue = await fetch(
			`/api/user/${auth.currentUser.uid}/uservenue`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ venue: {...venue, type, uid: id}, uid: auth.currentUser.uid }),
			}
		);
		const res = await newVenue.json();
		return res.ok;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function deleteUserVenue(uid) {
	try {
		const newVenue = await fetch(
			`/api/user/${auth.currentUser.uid}/uservenue`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ uid }),
			}
		);
		const res = await newVenue.json();
		return res.ok;
	} catch (err) {
		console.log(err);
		return false;
	}
}

