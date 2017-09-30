import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';
import {ToastAndroidBS} from "../../Common/functions";
import TextInputStyles from '../../CustomComponents/SimpleCustomComponent/styles';
import {GPlaceholderTextColor} from "../../Common/colors";
import {changePwd} from "../../Common/webApi";

class CPAChangePwdPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            oldPwd: '',
            newPwd: '',
            newPwdAgain: '',
            newPwdFit: true,
        };
    }

    _onPress = () => {
        let oldPwd = this.state.oldPwd;
        let newPwd = this.state.newPwd;
        let newPwdAgain = this.state.newPwdAgain;
        if (newPwd !== newPwdAgain){
            ToastAndroidBS('两次输入的密码不一致！');
            return;
        }

        changePwd({id: AppContext.userId, password: oldPwd, newpassword: newPwd})
            .then(ret=>{
                if (ret.result === true) {
                    ToastAndroidBS('密码修改成功，请使用新密码重新登录！');

                    AppContext.logout();

                    const {goBack, state} = this.props.navigation;
                    goBack && goBack(state.params.PersonalKey);
                } else {
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(err=>{
                ToastAndroidBS(err.message);
                console.log(err);
            });


    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    {/*<FlatList data={data}
                              renderItem={this._renderItem}
                    />*/}

                    <TextInput style={[styles.textInput, TextInputStyles.textInput]}
                               placeholder='原密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               value={this.state.oldPwd}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       oldPwd: text,
                                   });
                               }} />
                    <TextInput style={[styles.textInput, TextInputStyles.textInput]}
                               placeholder='新密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               value={this.state.newPwd}
                               onChangeText={(text)=>{
                                   if (text === this.state.newPwdAgain){
                                       this.setState({
                                           ...this.state,
                                           newPwdFit: true,
                                           newPwd: text,
                                       });
                                   } else {
                                       this.setState({
                                           ...this.state,
                                           newPwdFit: false,
                                           newPwd: text,
                                       });
                                   }
                               }} />
                    <TextInput style={[styles.textInput, TextInputStyles.textInput]}
                               placeholder='重复新密码'
                               placeholderTextColor={GPlaceholderTextColor}
                               secureTextEntry={true}
                               value={this.state.newPwdAgain}
                               onChangeText={(text)=>{
                                   if (text === this.state.newPwd){
                                       this.setState({
                                           ...this.state,
                                           newPwdFit: true,
                                           newPwdAgain: text,
                                       });
                                   } else {
                                       this.setState({
                                           ...this.state,
                                           newPwdFit: false,
                                           newPwdAgain: text,
                                       });
                                   }
                               }}
                               onSubmitEditing={this._onPress} />
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
                            onPress={this._onPress}
                            disabledStyle={styles.disabledButton}
                            disabled={!(this.state.oldPwd.length > 0
                                            && this.state.newPwd.length > 0
                                            && this.state.newPwdAgain.length > 0
                                            && this.state.newPwdFit)} />
                </View>
            </View>
        );
    }
}

export default CPAChangePwdPage;