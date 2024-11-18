import type { IncomingMessage, ServerResponse } from 'node:http';

export type User = Partial<{
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}>;

export type Handler = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
	userId?: string
) => void;
