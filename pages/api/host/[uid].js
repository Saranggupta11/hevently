import dbConnect from '../../../db/utils/dbConnect';
import Host from '../../../db/model/HostEvents';
import Badge from '../../../db/model/Badge';

export default async function createVenue(req, res) {
	await dbConnect();

	const { method, body } = req;
	const { uid } = req.query;

	try {
		switch (method) {
			case 'GET':
				const host = await Host.findOne({ uid }).clone();
				if (host) {
					return res.status(200).json({
						ok: true,
						message: 'Events retrieved',
						host,
					});
				} else {
					return res.status(404).json({
						ok: false,
						message: 'Events not found',
						host: {},
					});
				}
				break;

			case 'POST':
				const newEvent = await Host.updateOne(
					{ uid },
					{
						$push: {
							pending: body.event,
						},
					},
					{ upsert: true }
				).clone();

				const badge = await Badge.updateOne(
					{
						uid,
					},
					{
						$set: {
							request: true,
						},
					},
					{ upsert: true }
				);

				if (!newEvent) {
					return res.status(500).json({
						ok: false,
						message: 'Event not created',
					});
				} else {
					return res.status(201).json({
						ok: true,
						message: 'Event list updated',
					});
				}
				break;

			case 'PUT':
				const event = await Host.findOne({ uid }).clone();
				const el = event.pending.find((e) => e.uid == body.eventId);
				await Host.updateOne({ uid }, { $pull: { pending: el } });
				await Host.updateOne({ uid }, { $push: { approved: el } });

				res.status(200).json({
					ok: true,
					message: 'Event updated',
				});

				break;

			case 'DELETE':
				const deleteEvent = await Host.updateOne(
					{ uid },
					{
						$pull: {
							pending: {
								uid: body.eventId,
							},
						},
					}
				).clone();

				if (!deleteEvent) {
					return res.status(500).json({
						ok: false,
						message: 'Event not deleted',
					});
				} else {
					return res.status(200).json({
						ok: true,
						message: 'Event list updated',
					});
				}
		}
	} catch (err) {
		return res.status(500).json({
			ok: false,
			message: 'Server error',
			err,
		});
	}
}
