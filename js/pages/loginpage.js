'use strict';

import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from "react-native-elements";
import colors, {GPlaceholderTextColor} from "../common/colors";
import {screenWidth} from "../common/constants";
import {textInputStyle} from "../common/styles";

class CPALoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            pwd: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.WelcomeTitle}>
                            欢迎登录
                        </Text>
                    </View>

                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='手机号'
                               style={[styles.textInput, textInputStyle]}
                               underlineColorAndroid='transparent'
                               keyboardType={'numeric'}
                               value={this.state.phoneNumber}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       phoneNumber: text,
                                   });
                               }}
                    />

                    <TextInput placeholder='密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               style={[styles.textInput, textInputStyle]}
                               underlineColorAndroid='transparent'
                               value={this.state.pwd}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       pwd: text,
                                   });
                               }}
                               onSubmitEditing={this._login}
                               returnKeyType="go"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button buttonStyle={styles.button}
                            title="登录"
                            onPress={this._login}
                            disabled={this.state.phoneNumber.length <= 0 || this.state.pwd.length <= 0}
                            disabledStyle={styles.disabled} />
                </View>

                <View style={styles.shortCutContainer}>
                    <TouchableOpacity style={styles.quickLoginContainer}>
                        <Text textDecorationLine="underline"
                              style={styles.text}
                              onPress={this._quickLogin} >
                            短信验证码登录
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPwdContainer}>
                        <Text textDecorationLine="underline"
                              style={styles.text}
                              onPress={()=>{}} >
                            忘记密码?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default CPALoginPage;

CPALoginPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    infoContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    titleContainer:{
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    WelcomeTitle: {
        fontSize: 24,
        color: colors.theme1,
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginTop: 10,
        fontSize: 14,
    },
    buttonContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    button:{
        width: screenWidth-20,
    },
    shortCutContainer: {

        flexDirection: 'row',
    },
    quickLoginContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'flex-start',
    },
    forgotPwdContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'flex-end',
    },
    text:{
        marginTop: 15,
        color: '#00FFFF',
        fontSize: 15,
    },
    disabled: {
        backgroundColor: colors.grey3,
    },
});