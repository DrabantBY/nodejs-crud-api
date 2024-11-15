import UUID_REGEXP from './constants/uuidRegExp.js';
import sendNotFound from './handlers/sendNotFound.js';
import getAllUsers from './handlers/getAllUsers.js';
import getUserById from './handlers/getUserById.js';

const staticRoutes = {
	'/api/users': getAllUsers,
	'/api/users/:id': getUserById,
};

const routeHandlerTypes = {
	function: (req, res, id, callback) => {
		callback(req, res, id);
	},
	undefined: sendNotFound,
};

const dynamicRoutes = [];

for (const key in staticRoutes) {
	if (Object.hasOwn(staticRoutes, key) && key.endsWith(':id')) {
		const regexp = new RegExp(`^${key.replace(':id', UUID_REGEXP)}$`);

		dynamicRoutes.push([regexp, staticRoutes[key]]);

		delete staticRoutes[key];
	}
}

const router = (req, res) => {
	const route = req.url.replace(/(?=.)\/+$/, '');

	let callback = staticRoutes[route || '/'];
	let userId;

	if (!callback) {
		for (let i = 0; i < dynamicRoutes.length; i++) {
			const [regexp, dynamicRouteHandler] = dynamicRoutes[i];
			const isDynamicRoute = regexp.test(route);

			if (isDynamicRoute) {
				userId = route.match(UUID_REGEXP)[0];
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
