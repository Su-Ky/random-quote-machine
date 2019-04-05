import { getQuotesRandom } from '../api/quotes';

export const QUOTES_REQUEST = 'QUOTES_REQUEST';
export const QUOTES_SUCCESS = 'QUOTES_SUCCESS';
export const QUOTES_FAILURE = 'QUOTE_FAILURE';

export function failureQuotes(error) {
	return { type: QUOTES_FAILURE, error };
}

export function receiveQuotes(quotes) {
	return { type: QUOTES_SUCCESS, quotes };
}

export function quote(dispatch) {
	dispatch({ type: QUOTES_REQUEST });

	getQuotesRandom()
		.then(({ data }) => {
			dispatch(receiveQuotes(data));
		}).catch(() => dispatch(failureQuotes('Bad request')));
}
