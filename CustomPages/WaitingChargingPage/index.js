import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';
import DividerLine from "../../CustomComponents/DividerLine/index";
import {prompt2} from "../../Common/functions";

class CPARecord extends Component{
    render() {
        return (
            <View style={styles.textContainer}>
                <View style={styles.leftContainer}>
                    <Text>
                        {this.props.name}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text>
                        {this.props.val} {this.props.unit}
                    </Text>
                </View>
            </View>
        );
    }
}

class CPAWaitingChargingPage extends Component{
    // 结束充电|确认
    _onFinishedChargingPress = () => {
        prompt2('确定要结束充电吗？',
            ()=>{},
            ()=> {
                const {goBack} = this.props.navigation;
                goBack && goBack();
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <CPARecord name="充电电量：" val="10.23" unit="度" />
                    <DividerLine />
                    <CPARecord name="充电时间：" val="0.5" unit="小时" />
                    <DividerLine />
                    <CPARecord name="花费：" val="20.0" unit="元" />
                    <DividerLine />
                </View>

                <View style={styles.lowerContainer}>
                    <Button title='结束充电'
                            onPress={this._onFinishedChargingPress}
                            style={styles.button} />
                </View>
            </View>
        );
    }
}

export default CPAWaitingChargingPage;