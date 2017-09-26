import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../Common/colors";
import TextInputStyles from "../../CustomComponents/SimpleCustomComponent/styles";
import {ToastAndroidBL, ToastAndroidBS, validatePhoneNumber} from "../../Common/functions";
import {register, resetPwd, sendMessage} from "../../Common/webApi";


const GetVCode = '获取验证码';
const CountTime = 120;
class CPARegisterOrResetPwdPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            phoneNumber: '',
            vCode: '',
            pwd: '',
            countTime: CountTime, // 验证码倒计时120秒
            vCodeSent: false,
            vCodeText: GetVCode,
        };
    }

    componentWillUnmount() {
        this._timer && clearInterval(this._timer);
    }

    // 获取验证码
    _getVCode = ()=>{
        // 先验证手机号码是否合法
        let phoneNumber = this.state.phoneNumber;
        let correct = validatePhoneNumber(phoneNumber);
        if (correct){
            sendMessage(phoneNumber)
                .then(ret=>{
                    if (ret.result === true) {
                        this.setState({
                            ...this.state,
                            vCodeSent: true,
                        });
                        ToastAndroidBS('验证码已发送！');

                        this._onSentVCode();
                    } else {
                        ToastAndroidBS(ret.message);
                    }
                })
                .catch(err=>{
                    ToastAndroidBS('验证码发送失败：'+err);
                    console.log(err);
                });
        }
        else {
            ToastAndroidBS('手机号码不正确！');
        }
    };

    _onSentVCode = ()=>{
        this._timer = setInterval(()=>{
            let countTime = this.state.countTime - 1;
            if (countTime === 0) {
                this.setState({
                    ...this.state,
                    vCodeText: GetVCode,
                    vCodeSent: false,
                    countTime: CountTime,
                });

                this._timer && clearInterval(this._timer);
            } else {
                this.setState({
                    ...this.state,
                    vCodeText: `重新获取${countTime}s`,
                    countTime: countTime,
                });
            }
        }, 1000);
    };

    _showUserAgreement = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('UserAgreement');
    };

    _registerOrReset = () => {
        let phoneNumber = this.state.phoneNumber;
        let vCode = this.state.vCode;
        let pwd = this.state.pwd;
        if (!this._validateInput(phoneNumber, vCode, pwd)) {
            return;
        }

        const {params} = this.props.navigation.state;
        if (params.registerOrReset === 'register'){
            register(phoneNumber, vCode, pwd)
                .then(ret=>{
                    if (ret.result === true) {
                        ToastAndroidBS('注册成功，请登录！');
                        this._goToLogin();
                    } else {
                        ToastAndroidBS(ret.message);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    ToastAndroidBS('注册失败：'+err);
                });
        } else {
            resetPwd(phoneNumber, vCode, pwd)
                .then(ret=>{
                    ToastAndroidBS('重置密码成功，请使用新密码登录！');
                })
                .catch(err=>{
                    console.log(err);
                    ToastAndroidBS('重置密码失败！');
                });
        }
    };

    _validateInput = (phoneNumber, vCode, pwd)=>{
        if (phoneNumber.length <= 0 || !validatePhoneNumber(phoneNumber)) {
            ToastAndroidBL('手机号不正确！');
            return false;
        }

        if (vCode.length !== 6) {
            ToastAndroidBL('验证码不正确！');
            return false;
        }

        if (pwd.length <= 0) {
            ToastAndroidBL('密码不能为空！');
            return false;
        }

        return true;
    };

    _goToLogin = ()=>{
        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    render() {
        const {params} = this.props.navigation.state;

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='手机号'
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
                        <TextInput placeholder='验证码'
                                   placeholderTextColor={GPlaceholderTextColor}
                                   style={[styles.textInput,
                                       styles.vcodeTextInput,
                                       TextInputStyles.textInput]}
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
                                          style={[styles.vcodeButton, this.state.vCodeSent ? styles.vcodeButtonSent : null]}
                                          disabled={this.state.vCodeSent} >
                            <Text style={[styles.vcodeText, this.state.vCodeSent ? styles.vcodeTextSent : null]}>
                                {this.state.vCodeText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput placeholder={params.registerOrReset === 'register' ? '密码' : '新密码'}
                               placeholderTextColor={GPlaceholderTextColor}
                               style={[styles.textInput,
                                   TextInputStyles.textInput]}
                               secureTextEntry={true}
                               value={this.state.pwd}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       pwd: text,
                                   })
                               }}
                               onSubmitEditing={this._registerOrReset}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title={params.registerOrReset === 'register' ? "注册" : '确定'}
                            buttonStyle={styles.button}
                            onPress={this._registerOrReset}
                    />
                </View>

                {
                    params.registerOrReset === 'register' ?
                        <TouchableOpacity style={styles.userAgreementContainer}>
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
        );
    }
}

export default CPARegisterOrResetPwdPage;