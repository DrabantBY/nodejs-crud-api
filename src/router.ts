import sendNotFound from './handlers/sendNotFound.ts';
import handleAllUsers from './handlers/handleAllUsers.ts';
import handleUserId from './handlers/handleUserId.ts';
import { UUID, END_SLASH } from './constants/regexp.ts';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Handler } from './types.ts';

const staticRoutes: Record<string, Handler> = {
	'/api/users': handleAllUsers,
	'/api/users/{userId}': handleUserId,
};

const routeHandlerTypes = {
	function: (
		req: IncomingMessage,
		res: ServerResponse,
		id?: string,
		callback?: Handler
	) => {
		if (callback) {
			callback(req, res, id);
		}
	},
	undefined: sendNotFound,
};

const dynamicRoutes: Array<[RegExp, Handler]> = [];

for (const key in staticRoutes) {
	if (Object.hasOwn(staticRoutes, key) && key.endsWith('{userId}')) {
		const regexp = new RegExp(`^${key.replace('{userId}', UUID)}$`);

		dynamicRoutes.push([regexp, staticRoutes[key]]);

		delete staticRoutes[key];
	}
}

const router = (req: IncomingMessage, res: ServerResponse) => {
	res.setHeader('Content-Type', 'application/json');

	const route = req.url?.replace(END_SLASH, '');

	let callback = staticRoutes[route || '/'];
	let userId;

	if (!callback) {
		for (let i = 0; i < dynamicRoutes.length; i++) {
			const [regexp, dynamicRouteHandler] = dynamicRoutes[i];
			const isDynamicRoute = regexp.test(route!);

			if (isDynamicRoute) {
				userId = route!.match(UUID)![0];
				callback = dynamicRouteHandler;
				break;
			}
		}
	}

	const handlerType = typeof callback as 'function' | 'undefined';
	const routeHandler = routeHandlerTypes[handlerType];

	return routeHandler(req, res, userId, callback);
};

export default router;
