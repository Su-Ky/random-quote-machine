
export const SET = 'SET';

export function set<T>() {
	return () => ({ composeActions(name, SET), settled });
}

export function composeActions(name, action) {
	return `${name} ${action}`;
}
