import ax from 'axios';

export const axios = ax.create({
	baseURL: API_URL,
	timeout: 1000
});
