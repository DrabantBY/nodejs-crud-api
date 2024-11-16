import { UUID, END_SLASH } from './constants/regexp.js';
import sendNotFound from './handlers/sendNotFound.js';
import handleAllUsers from './handlers/handleAllUsers.js';
import handleUserId from './handlers/handleUserId.js';

const staticRoutes = {
	'/api/users': handleAllUsers,
	'/api/users/{userId}': handleUserId,
};

const routeHandlerTypes = {
	function: (req, res, id, callback) => {
		callback(req, res, id);
	},
	undefined: sendNotFound,
};

const dynamicRoutes = [];

for (const key in staticRoutes) {
	if (Object.hasOwn(staticRoutes, key) && key.endsWith('{userId}')) {
		const regexp = new RegExp(`^${key.replace('{userId}', UUID)}$`);

		dynamicRoutes.push([regexp, staticRoutes[key]]);

		delete staticRoutes[key];
	}
}

const router = (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const route = req.url.replace(END_SLASH, '');

	let callback = staticRoutes[route || '/'];
	let userId;

	if (!callback) {
		for (let i = 0; i < dynamicRoutes.length; i++) {
			const [regexp, dynamicRouteHandler] = dynamicRoutes[i];
			const isDynamicRoute = regexp.test(route);

			if (isDynamicRoute) {
				userId = route.match(UUID)[0];
				callback = dynamicRouteHandler;
				break;
			}
		}
	}

	const handlerType = typeof callback;
	const routeHandler = routeHandlerTypes[handlerType];

	return routeHandler(req, res, userId, callback);
};

export default router;
