import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import TextInputStyles from '../../CustomComponents/SimpleCustomComponent/styles';

import styles from './styles';
import {CheckBox, Button} from 'react-native-elements';
import {ToastAndroidBS} from "../../Common/functions";

class CPAWalletPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            wxChecked: true,
            zfbChecked: false,
        };
    }

    _onWxPress = () => {
        let checked = !this.state.wxChecked;
        this.setState({
            wxChecked: checked,
            zfbChecked: !checked,
        });
    };

    _onZfbPress = () => {
        let checked = !this.state.zfbChecked;
        this.setState({
            wxChecked: !checked,
            zfbChecked: checked,
        });
    };

    _onSubmit = () => {
        /*Alipay.pay('signed pay info string')
            .then(data=>{
                console.log(data);
                alert(data);
            })
            .catch(error=>{
                console.error(error);
                alert(error);
            });*/

        ToastAndroidBS('充值成功！');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.label}>
                        余额：
                    </Text>
                    <Text style={styles.money}>
                        {this.props.money || '89.32'}
                        <Text style={styles.label}>
                            {'  '}元
                        </Text>
                    </Text>
                </View>

                <View style={styles.payContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={[styles.textInput, TextInputStyles.textInput]}
                                   placeholder='请输入充值金额（最少10元）'
                                   placeholderTextColor='#C3C3C3'
                                   underlineColorAndroid='transparent'
                                   keyboardType='numeric'
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
                                      checked={this.state.wxChecked}
                                      onPress={this._onWxPress}
                            />
                            <CheckBox style={styles.checkbox}
                                      title="支付宝"
                                      checked={this.state.zfbChecked}
                                      onPress={this._onZfbPress}
                            />
                        </View>
                    </View>

                    <View style={styles.submitButtonContainer}>
                        <Button title="充值"
                                buttonStyle={styles.submitButton}
                                onPress={this._onSubmit}
                        />
                    </View>
                </View>
            </View>
        );
    };
}

export default CPAWalletPage;