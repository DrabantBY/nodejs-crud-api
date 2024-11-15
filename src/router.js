import UUID_REGEXP from './constants/uuidRegExp.js';
import { users } from './db.js';

const staticRoutes = {
	'/api/users': (req, res) => {
		return users;
	},
	'/api/users/:id': (req, res, userId) => {
		return users.find(({ id }) => id === userId);
	},
};

const routeHandlerTypes = {
	function: (req, res, id, callback) => JSON.stringify(callback(req, res, id)),
	undefined: (req, res) => '404: Page is not exist',
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

	let callback = staticRoutes[route];
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
