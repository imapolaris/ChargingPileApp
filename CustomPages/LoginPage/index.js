import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {Button, Avatar} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../Common/colors";
import TextInputStyles from "../../CustomComponents/SimpleCustomComponent/styles";
import {login} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import {loadAvatar, saveUserProfile} from "../../Common/appContext";

class CPALoginPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            username: '',
            pwd: '',
            avatarSource: null,
        };
    }

    componentDidMount() {
        loadAvatar()
            .then(ret=>{
                this.setState({
                    ...this.state,
                    avatarSource: { uri: 'data:image/jpeg;base64,' + ret.data }
                })
            })
            .catch(err=>{
                console.log(err);
            });
    }

    _login = () => {
        let username = this.state.username;
        let pwd = this.state.pwd;

        login(username, pwd)
            .then(ret=>{
                if (ret.result === true) {
                    // 登录成功
                    ToastAndroidBS(`登录成功！`);

                    saveUserProfile({username: '小佟', nickname:'alice', gender:'女'});
                    AppContext.isLogon = true;

                    const {goBack} = this.props.navigation;
                    goBack && goBack();
                } else {
                    // 登录失败
                    ToastAndroidBS('登录失败！');
                }
            })
            .catch(error=>{
                console.log(error);

                ToastAndroidBS('登录失败！');
            });
    };

    _forgotPwd = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('Reset', {registerOrReset: 'reset'});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.avatarContainer}>
                        <Avatar large
                                rounded
                                icon={{name:'user', type:'simple-line-icon', color:'yellow'}}
                                source={this.state.avatarSource}
                                activeOpacity={0.7}
                        />
                    </View>

                    <TextInput placeholderTextColor={GPlaceholderTextColor}
                               placeholder='用户名'
                               style={[styles.textInput, TextInputStyles.textInput]}
                               underlineColorAndroid='transparent'
                               value={this.state.username}
                               onChangeText={(text)=>{
                                   this.setState({
                                       ...this.state,
                                       username: text,
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
                            onPress={this._login} />
                </View>

                <TouchableOpacity style={styles.forgotPwdContainer}>
                    <Text textDecorationLine="underline"
                          style={styles.text}
                          onPress={this._forgotPwd} >
                        忘记密码?
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CPALoginPage;