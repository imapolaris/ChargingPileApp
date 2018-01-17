'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors, {GPlaceholderTextColor} from "../common/colors";
import {textInputStyle} from "../common/styles";
import {Button} from "react-native-elements";
import {ActiveOpacity, screenWidth} from "../common/constants";

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
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='手机号'
                               style={[styles.textInput, textInputStyle]}
                               keyboardType={'numeric'}
                               value={this.state.phoneNumber}
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
                                   value={this.state.vCode}
                                   onChangeText={(text) => {
                                       this.setState({
                                           vCode: text,
                                       })
                                   }}
                        />
                        <TouchableOpacity onPress={this._getVCode}
                                          activeOpacity={ActiveOpacity}
                                          style={[styles.vcodeButton, this.state.vCodeSent ? styles.vcodeButtonSent : null]}
                                          disabled={this.state.vCodeSent}>
                            <Text style={[styles.vcodeText, this.state.vCodeSent ? styles.vcodeTextSent : null]}>
                                {this.state.vCodeText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput placeholder={'密码'}
                               placeholderTextColor={GPlaceholderTextColor}
                               style={[styles.textInput, textInputStyle]}
                               secureTextEntry={true}
                               value={this.state.pwd}
                               onChangeText={(text) => {
                                   this.setState({
                                       pwd: text,
                                   })
                               }}
                               onSubmitEditing={this._register}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title={"注册"}
                            buttonStyle={styles.button}
                            onPress={this._register}
                            disabled={this.state.phoneNumber.length <= 0 || this.state.vCode.length <= 0 || this.state.pwd.length <= 0}
                            disabledStyle={styles.disabled}
                    />
                </View>

                <TouchableOpacity style={styles.userAgreementContainer}>
                    <Text style={styles.text}>
                        注册即代表同意
                        <Text style={styles.userAgreement} onPress={this._showUserAgreement}>
                            用户协议
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CPARegisterPage;

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
        borderColor: colors.tintColor,
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
        color: colors.tintColor,
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