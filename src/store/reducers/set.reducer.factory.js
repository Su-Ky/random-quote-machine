import {EMPTY_OBJ} from 'inferno';
import {SET} from '../actions';


export const setReducerFactory = (name) =>
	(state = EMPTY_OBJ, {type, settled}) =>
		type === `${SET} ${name}` ? {settled} : state;

export const setActionFactory = (name) => (settled) => ({type: `${SET} ${name}`, settled});
