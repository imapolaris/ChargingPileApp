import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import CPAStackNavigator from "./components/navigators";
import {Provider} from 'react-redux';
import configureStore from "./redux/configureStore";

class Root extends Component{
    render() {
        return (
            <CPAStackNavigator />
        );
    }
}

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