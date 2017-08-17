import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import CPAHomeStackNavigator from '../../CustomComponents/Navigators/CPAStackNavigator/index.home'

class CPAHomePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <CPAHomeStackNavigator />
        );
    }
}

export default CPAHomePage;