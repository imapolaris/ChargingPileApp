import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../Common/colors";
import TextInputStyles from "../../CustomComponents/SimpleCustomComponent/styles";
import {login} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import {closeWaitingAlert, openWaitingAlert} from "../../CustomComponents/AlertWaiting/index";
import AlertWaiting from "../../CustomComponents/AlertWaiting/index";

class CPALoginPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            phoneNumber: '',
            pwd: '',
        };
    }

    _login = () => {
        Keyboard.dismiss();

        let phoneNumber = this.state.phoneNumber;
        let pwd = this.state.pwd;

        openWaitingAlert(this._waiting, '正在登录...');
        login(phoneNumber, pwd)
            .then(ret=>{
                closeWaitingAlert(this._waiting);

                if (ret.result === true) {
                    // 登录成功
                    ToastAndroidBS(`登录成功！`);

                    AppContext.login({userId: ret.data.id, nickname:ret.data.nickname, avatar: ret.data.avatar});

                    const {goBack} = this.props.navigation;
                    goBack && goBack();
                } else {
                    // 登录失败
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(error=>{
                closeWaitingAlert(this._waiting);
                console.log(error);
                ToastAndroidBS('登录失败:'+error);
            });
    };

    // 快捷登录
    _quickLogin = () => {

    };

    // 忘记密码
    _forgotPwd = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('Reset', {registerOrReset: 'reset'});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.WelcomeTitle}>
                            欢迎登录
                        </Text>
                    </View>

                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='手机号'
                               style={[styles.textInput, TextInputStyles.textInput]}
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
                               style={[styles.textInput, TextInputStyles.textInput]}
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
                    {/*<TouchableOpacity style={styles.quickLoginContainer}>
                        <Text textDecorationLine="underline"
                              style={styles.text}
                              onPress={this._quickLogin} >
                            快捷登录
                        </Text>
                    </TouchableOpacity>*/}

                    <TouchableOpacity style={styles.forgotPwdContainer}>
                        <Text textDecorationLine="underline"
                              style={styles.text}
                              onPress={this._forgotPwd} >
                            忘记密码?
                        </Text>
                    </TouchableOpacity>
                </View>

                <AlertWaiting ref={self=>this._waiting=self} />
            </View>
        );
    }
}

export default CPALoginPage;