import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';


export function configureStore(rootReducer, initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk)
	);
}
