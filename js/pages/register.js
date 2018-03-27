'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors, {GPlaceholderTextColor} from "../common/colors";
import {textInputStyle} from "../common/styles";
import {Button} from "react-native-elements";
import {ActiveOpacity, ScreenKey, screenWidth, UserAction} from "../common/constants";
import {connect} from "react-redux";
import {doNav} from "../redux/navactions";
import {doGetVcode, doRegister, doResetPwd} from "../redux/useractions";
import {ToastBS, validatePhoneNumber} from "../common/functions";

const GetVCode = '获取验证码';
const CountTime = 120;
class CPARegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            vCode: '',
            pwd: '',
            lastCountDownDate: null,
            countTime: CountTime, // 验证码倒计时120秒
            vCodeSent: false,
            vCodeText: GetVCode,
            action: 0, // 0:注册用户，1：重置密码
        };
    }

    componentDidMount() {
        this.setState({
            action: this.props.navigation.state.params.action
        });
    }

    componentWillUnmount() {
        this._timer && clearInterval(this._timer);
    }

    _getVcode = ()=>{
        const {phoneNumber} = this.state;
        if (!validatePhoneNumber(phoneNumber))
        {
            ToastBS('手机号不正确！');
            return;
        }

        const {getVcode} = this.props;
        getVcode(phoneNumber)
            .then(ret=>{
                if (ret) {
                    this.setState({
                        vCodeSent: true,
                        lastCountDownDate: new Date(),
                    });

                    this._onSentVCode();
                }
            })
    };

    _onSentVCode = ()=>{
        this._timer = setInterval(()=>{
            let now = new Date();
            let start = this.state.lastCountDownDate;
            let diff = parseInt((now - start) / 1000);

            let countTime = this.state.countTime - diff;
            if (countTime <= 0) {
                this.setState({
                    vCodeText: GetVCode,
                    vCodeSent: false,
                    countTime: CountTime,
                    lastCountDownDate: now,
                });

                this._timer && clearInterval(this._timer);
            } else {
                this.setState({
                    vCodeText: `重新获取${countTime}s`,
                    countTime: countTime,
                    lastCountDownDate: now,
                });
            }
        }, 1000);
    };

    _registerOrReset = () => {
        const {phoneNumber, vCode, pwd, action} = this.state;
        const {register, resetPwd} = this.props;
        if (action === UserAction.Register) {
            register && register(phoneNumber, vCode, pwd);
        } else if (action === UserAction.ResetPwd) {
            resetPwd && resetPwd(phoneNumber, vCode, pwd);
        }
    };

    render() {
        const {nav} = this.props;
        const {action, phoneNumber, vCode, vCodeSent, vCodeText, pwd} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='手机号'
                               style={[styles.textInput, textInputStyle]}
                               keyboardType={'numeric'}
                               value={phoneNumber}
                               onChangeText={(text) => {
                                   this.setState({
                                       phoneNumber: text,
                                   })
                               }}/>
                    <View style={styles.vcodeContainer}>
                        <TextInput placeholder='验证码'
                                   placeholderTextColor={GPlaceholderTextColor}
                                   style={[styles.textInput, styles.vcodeTextInput, textInputStyle]}
                                   keyboardType={'numeric'}
                                   value={vCode}
                                   onChangeText={(text) => {
                                       this.setState({
                                           vCode: text,
                                       })
                                   }}
                        />
                        <TouchableOpacity onPress={this._getVcode}
                                          activeOpacity={ActiveOpacity}
                                          style={[styles.vcodeButton, vCodeSent ? styles.vcodeButtonSent : null]}
                                          disabled={vCodeSent}>
                            <Text style={[styles.vcodeText, vCodeSent ? styles.vcodeTextSent : null]}>
                                {vCodeText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput placeholder={action === UserAction.Register ? '密码' : '新密码'}
                               placeholderTextColor={GPlaceholderTextColor}
                               style={[styles.textInput, textInputStyle]}
                               secureTextEntry={true}
                               value={pwd}
                               onChangeText={(text) => {
                                   this.setState({
                                       pwd: text,
                                   })
                               }}
                               onSubmitEditing={this._registerOrReset}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title={action === UserAction.Register ? "注册" : '提交'}
                            buttonStyle={styles.button}
                            onPress={this._registerOrReset}
                            disabled={phoneNumber.length <= 0 || vCode.length <= 0 || pwd.length <= 0}
                            disabledStyle={styles.disabled}
                    />
                </View>

                {
                    action === UserAction.Register ?
                        <TouchableOpacity style={styles.userAgreementContainer}>
                            <Text style={styles.text}>
                                注册即代表同意
                                <Text style={styles.userAgreement} onPress={()=>nav && nav(ScreenKey.UserAgreement)}>
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

function mapStateToProps(state){
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        nav: (screenKey) => dispatch(doNav(screenKey)),
        register: (phoneNumber, vCode, pwd) => dispatch(doRegister(phoneNumber, vCode, pwd)),
        resetPwd: (phoneNumber, vCode, pwd) => dispatch(doResetPwd(phoneNumber, vCode, pwd)),
        getVcode: (phoneNumber) => dispatch(doGetVcode(phoneNumber)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPARegisterPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    infoContainer: {
    },
    vcodeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    vcodeButton: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.theme1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    vcodeButtonSent: {
        borderColor: colors.grey3,
    },
    vcodeTextInput: {
        flex: 1,
    },
    vcodeText: {
        color: colors.theme1,
    },
    vcodeTextSent: {
        color: colors.grey3,
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginTop: 10,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    button: {
        width: screenWidth-20,
    },
    text: {
        marginTop: 15,
        color: colors.theme1,
        fontSize: 15,
    },
    userAgreementContainer: {
        alignItems: 'center',
    },
    userAgreement: {
        textDecorationLine : 'underline',
    },
    disabled: {
        backgroundColor: colors.grey3,
    },
});