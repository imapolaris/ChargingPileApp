import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from "./reducers";
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native'

/*const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);*/

const store = createStore(
    rootReducer,
    undefined,
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ),
        autoRehydrate(),
    )
);

export default function configureStore(initialState) {
    //return createStoreWithMiddleware(rootReducer);
    return store;
}

const config = {
    storage: AsyncStorage,
    whitelist: ['user', 'system', 'app', 'charging'],
};

persistStore(store, config, ()=>{
    console.log('rehydration complete!');
});