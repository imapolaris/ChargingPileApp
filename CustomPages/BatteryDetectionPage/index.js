import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import styles from './styles';

class CPABatteryDetectionPage extends Component{
    render(){
        return (
            <View>
                <Text>电池检测</Text>
            </View>
        );
    }
}

export class CPABatteryDetectionReportPage extends Component{
    render() {
        return (
            <View>
                <Text>检测报告</Text>
            </View>
        );
    }
}

export default CPABatteryDetectionPage;