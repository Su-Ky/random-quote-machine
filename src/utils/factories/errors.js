// TODO: refactor when api
export interface ErrorMessage {
	clazz: string;
	message: string;
}

export function parseFetchError(err: any): ErrorMessage {
	return {
		clazz:   err.clazz === void 0 ? 'fetch' : err.clazz,
		message: err.message === void 0 ? 'There was an fetch error' : err.message
	};
}
