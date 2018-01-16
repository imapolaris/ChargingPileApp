'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import colors, {GPlaceholderTextColor} from "../common/colors";
import {Button} from "react-native-elements";
import {textInputStyle} from "../common/styles";
import {doResetPwd} from "../redux/useractions";
import {connect} from "react-redux";

class CPAResetPwdPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            oldPwd: '',
            newPwd: '',
            newPwdAgain: '',
            newPwdFit: true,
        };
    }

    _onResetPwd = () => {
        const {oldPwd, newPwd, newPwdAgain} = this.state;
        if (newPwd !== newPwdAgain) {
            //ToastAndroidBS('两次输入的密码不一致！');
            return;
        }

        const {resetPwd} = this.props;
        resetPwd && resetPwd(oldPwd, newPwd);
    };

    render() {
        const {oldPwd, newPwd, newPwdAgain, newPwdFit} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <TextInput style={[styles.textInput, textInputStyle]}
                               placeholder='原密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               value={oldPwd}
                               onChangeText={(text)=>{
                                   this.setState({oldPwd: text,});
                               }} />
                    <TextInput style={[styles.textInput, textInputStyle]}
                               placeholder='新密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               value={newPwd}
                               onChangeText={(text)=>{
                                   if (text === newPwdAgain){
                                       this.setState({
                                           newPwdFit: true,
                                           newPwd: text,
                                       });
                                   } else {
                                       this.setState({
                                           newPwdFit: false,
                                           newPwd: text,
                                       });
                                   }
                               }} />
                    <TextInput style={[styles.textInput, textInputStyle]}
                               placeholder='重复新密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               value={newPwdAgain}
                               onChangeText={(text)=>{
                                   if (text === newPwd){
                                       this.setState({
                                           newPwdFit: true,
                                           newPwdAgain: text,
                                       });
                                   } else {
                                       this.setState({
                                           newPwdFit: false,
                                           newPwdAgain: text,
                                       });
                                   }
                               }}
                               onSubmitEditing={this._onResetPwd} />
                </View>

                <View style={styles.hintContainer}>
                    {
                        this.state.newPwdFit !== true ?
                            <Text style={styles.text}>
                                两次输入的密码不一致！
                            </Text>
                            : null
                    }
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="确认修改"
                            onPress={this._onResetPwd}
                            disabledStyle={styles.disabledButton}
                            disabled={!(oldPwd.length > 0 && newPwd.length > 0 && newPwdAgain.length > 0 && newPwdFit)} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        resetPwd: (oldPwd, newPwd) => dispatch(doResetPwd(oldPwd, newPwd)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAResetPwdPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    listContainer:{

    },
    hintContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
    },
    buttonContainer:{
        justifyContent: 'center',
    },
    textInput: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    text: {
        color: colors.tintColor2,
    },
    disabledButton:{
        backgroundColor: colors.grey3,
    },
});