import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';

class CPAWaitingChargingPage extends Component{
    render() {
        return (
            <View>
                <Text>
                    正在充电...
                </Text>
            </View>
        );
    }
}

export default CPAWaitingChargingPage;