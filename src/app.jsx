import {render} from 'inferno';
import {Provider} from 'inferno-redux';


import {combineReducers} from 'redux';
import {AppIndex} from './components/AppIndex';
import {INIT, rootReducer} from './store';
import configureStore from './store/configure';

import src from './styles.scss';

export {src};
import {quote} from './store/actions/quote';

const store = configureStore(combineReducers(rootReducer), INIT);

quote(store.dispatch);

const container = document.getElementById('app');
render(<Provider store={store}>
	<AppIndex/>
</Provider>, container);
