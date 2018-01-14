import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from "./redux/configureStore";
import Root from './root';

const store = configureStore();
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

export default App;