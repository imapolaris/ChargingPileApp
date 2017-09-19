import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../Common/colors";
import TextInputStyles from "../../CustomComponents/SimpleCustomComponent/styles";
import {ToastAndroidBS, validatePhoneNumber} from "../../Common/functions";
import {sendMessage} from "../../Common/webApi";

class CPARegisterOrResetPwdPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            phoneNumber: '',
            vCode: '',
            pwd: '',
        };
    }

    // 获取验证码
    _getVCode = () => {
        // 先验证手机号码是否合法
        let phoneNumber = this.state.phoneNumber;
        let correct = validatePhoneNumber(phoneNumber);
        if (correct){
            sendMessage(phoneNumber);

            ToastAndroidBS('验证码已发送！');
        }
        else {
            ToastAndroidBS('手机号码不正确！');
        }
    };

    _showUserAgreement = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('UserAgreement');
    };

    _registerOrReset = () => {
        const {params} = this.props.navigation.state;

        if (params.registerOrReset === 'register'){
            ToastAndroidBS('注册成功！');
        } else {
            ToastAndroidBS('重置成功！');
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
                               style={[styles.textInput, TextInputStyles.textInput]}
                               keyboardType={'numeric'}
                               value={this.state.phoneNumber}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       phoneNumber: text,
                                   })
                               }}
                    />
                    <View style={styles.vcodeContainer}>
                        <TextInput placeholder='输入验证码'
                                   placeholderTextColor={GPlaceholderTextColor}
                                   style={[styles.textInput, styles.vcodeTextInput, TextInputStyles.textInput]}
                                   keyboardType={'numeric'}
                                   value={this.state.vCode}
                                   onChangeText={(text)=>{
                                       this.setState({
                                           ...this.state,
                                           vCode: text,
                                       })
                                   }}
                        />
                        <TouchableOpacity onPress={this._getVCode}
                                          style={styles.vcodeButton}>
                            <Text style={styles.vcodeText}>
                                获取验证码
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput placeholder={params.registerOrReset === 'register' ? '输入密码' : '输入新密码'}
                               placeholderTextColor={GPlaceholderTextColor}
                               style={[styles.textInput, TextInputStyles.textInput]}
                               secureTextEntry={true}
                               value={this.state.pwd}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       pwd: text,
                                   })
                               }}
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