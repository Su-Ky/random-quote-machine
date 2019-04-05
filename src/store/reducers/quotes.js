import {OFF_FETCH, ON_FETCH} from '../../utils';
import {QUOTES_FAILURE, QUOTES_REQUEST, QUOTES_SUCCESS} from '../actions/quote';

export const QUOTES_INIT = {fetch: false, quoteText: "", quoteAuthor: ""};

export function quotes(state = QUOTES_INIT, {type, quotes, error}) {
	switch (type) {
		case QUOTES_REQUEST:
			return ON_FETCH;
		case QUOTES_SUCCESS:
			return {...quotes, ...OFF_FETCH};
		case QUOTES_FAILURE:
			return {error, ...OFF_FETCH};
		default:
			return state;
	}
}
