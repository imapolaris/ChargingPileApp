import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, BackHandler, View} from 'react-native';
import CPAStackNavigator from './CustomComponents/Navigators/CPAStackNavigator';
import {createStore} from 'redux';

let lastBackPressed = 0;
/*let store = createStore(null);*/

class App extends Component{
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        /*let now = new Date().getTime();
        if(now - lastBackPressed < 2500) {
            return false;
        }
        lastBackPressed = now;
        ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
        return true;*/
    };

    render() {
        return (
            <View style={styles.container}>
                <CPAStackNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});

export default App;