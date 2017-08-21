import React, {Component} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';

import styles from './styles';
import {Button, CheckBox} from 'react-native-elements';

class CPAActionPayPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            checked: true,
        };
    }

    _onPress = () => {
        this.setState(previousState => {
            return {checked: !previousState.checked};
        })
    };

    _onSubmit = () => {
        ToastAndroid.show('充值成功！',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput}
                               placeholder='请输入充值金额（最少10元）'
                               placeholderTextColor='#C3C3C3'
                               underlineColorAndroid='transparent'
                    />
                    <Text style={styles.text}>
                        元
                    </Text>
                </View>

                <View style={styles.payWayContainer}>
                    <Text>
                        充值方式：
                    </Text>

                    <View style={styles.checkboxContainer}>
                        <CheckBox style={styles.checkbox}
                                  center
                                  title="微信"
                                  checked={this.state.checked}
                                  onPress={this._onPress}
                        />
                        <CheckBox style={styles.checkbox}
                                  title="支付宝"
                                  checked={!this.state.checked}
                                  onPress={this._onPress}
                        />
                    </View>
                </View>

                <View style={styles.submitButtonContainer}>
                    <Button title="提交"
                            style={styles.submitButton}
                            onPress={this._onSubmit}
                    />
                </View>
            </View>
        );
    }
}

export default CPAActionPayPage;