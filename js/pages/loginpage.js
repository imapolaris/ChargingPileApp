'use strict';

import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View, Text, Keyboard} from 'react-native';
import {Button} from "react-native-elements";
import colors, {GPlaceholderTextColor} from "../common/colors";
import {ActiveOpacity, ScreenKey, screenWidth, UserAction, UserCategory} from "../common/constants";
import {textInputStyle} from "../common/styles";
import {connect} from "react-redux";
import {doNav} from "../redux/navactions";
import {doLogin} from "../redux/useractions";

class CPALoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            pwd: '',
            userCategory: UserCategory.Personal,
        };
    }

    _login = () => {
        Keyboard.dismiss();

        const {phoneNumber, pwd, userCategory} = this.state;
        const {login} = this.props;
        login && login(phoneNumber, pwd, userCategory);
    };

    _switchGroup = () => {
        const {userCategory} = this.state;
        if (userCategory === UserCategory.Personal) {
            this.setState({userCategory: UserCategory.Group});
        } else {
            this.setState({userCategory: UserCategory.Personal});
        }
    };

    render() {
        const {phoneNumber, pwd, userCategory} = this.state;
        const {nav} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.WelcomeTitle}>
                            {userCategory === UserCategory.Personal ? '个人用户登录' : '集团用户登录'}
                        </Text>
                    </View>

                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='手机号'
                               style={[styles.textInput, textInputStyle]}
                               underlineColorAndroid='transparent'
                               keyboardType={'numeric'}
                               value={phoneNumber}
                               onChangeText={(text)=>{
                                   this.setState({
                                       phoneNumber: text,
                                   });
                               }}
                    />

                    <TextInput placeholder='密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               style={[styles.textInput, textInputStyle]}
                               underlineColorAndroid='transparent'
                               value={pwd}
                               onChangeText={(text)=>{
                                   this.setState({
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
                            disabled={phoneNumber.length <= 0 || pwd.length <= 0}
                            disabledStyle={styles.disabled} />
                </View>

                <View style={styles.shortCutContainer}>
                    <TouchableOpacity style={styles.quickLoginContainer}>
                        <Text textDecorationLine="underline"
                              style={styles.text}
                              onPress={this._switchGroup} >
                            {userCategory === UserCategory.Group ? '个人用户登录' : '集团用户登录'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPwdContainer}
                                      activeOpacity={ActiveOpacity}
                                      onPress={()=>nav && nav(ScreenKey.ResetPwd, {action: UserAction.ResetPwd})}>
                        <Text textDecorationLine="underline"
                              style={styles.text}>
                            忘记密码?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (phoneNumber, pwd, checkWay) => dispatch(doLogin(phoneNumber, pwd, checkWay)),
        nav: (screenKey, params) => dispatch(doNav(screenKey, params)),
    };
}

export default connect((state)=>{return state},mapDispatchToProps)(CPALoginPage);


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
        marginTop: 10,
        fontSize: 15,
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
        color: colors.theme1,
        fontSize: 15,
    },
    disabled: {
        backgroundColor: colors.grey3,
    },
});