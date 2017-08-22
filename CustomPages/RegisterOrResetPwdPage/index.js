import React, {Component} from 'react';
import {View, Text, TextInput, ToastAndroid, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Button, Avatar} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../CommonStyles/colors";

class CPARegisterOrResetPwdPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    _getVCode = () => {
        alert('验证码：336699');
    };

    _showUserAgreement = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('UserAgreement');
    };

    _registerOrReset = () => {
        const {params} = this.props.navigation.state;

        if (params.registerOrReset === 'register'){
            ToastAndroid.show('注册成功！',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            ToastAndroid.show('重置成功！',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }

        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    render() {
        const {params} = this.props.navigation.state;

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='输入手机号'
                               style={styles.textInput}
                    />
                    <View style={styles.vcodeContainer}>
                        <TextInput placeholder='输入验证码'
                                   placeholderTextColor={GPlaceholderTextColor}
                                   style={[styles.textInput, styles.vcodeTextInput]}
                        />
                        <Button title="获取"
                                onPress={this._getVCode}
                                buttonStyle={styles.vcodeButton}
                        />
                    </View>
                    <TextInput placeholder={params.registerOrReset === 'register' ? '输入密码' : '输入新密码'}
                               placeholderTextColor={GPlaceholderTextColor}
                               style={styles.textInput}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title={params.registerOrReset === 'register' ? "注册" : '确定'}
                            buttonStyle={styles.button}
                            onPress={this._registerOrReset}
                    />
                    {
                        params.registerOrReset === 'register' ?
                            <TouchableOpacity>
                                <Text style={styles.text}>
                                    注册即代表同意
                                    <Text style={styles.userAgreement}
                                          onPress={this._showUserAgreement}
                                    >
                                        用户协议
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
            </View>
        );
    }
}

export default CPARegisterOrResetPwdPage;