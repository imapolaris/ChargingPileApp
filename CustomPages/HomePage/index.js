import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

class CPAHomePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text>
                    Hello, here is Home Page!!!
                </Text>
            </View>
        );
    }
}

export default CPAHomePage;