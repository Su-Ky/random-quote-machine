export function compose(...func: Function[]): Function {
	return (...args) => {
		for (const f of func) {
			f(args);
		}
	};
}

export const EMPTY_ARR = [];
export const ON_FETCH = { fetch: true };
export const OFF_FETCH = { fetch: false };
