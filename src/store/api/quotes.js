import {axios} from './index';

export const getQuotesRandom = () => axios.get('/random');
