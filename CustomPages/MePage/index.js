import React, {Component} from 'react';
import {View, ScrollView, ImageBackground, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {List, ListItem, Avatar} from 'react-native-elements';
import colors from "../../Common/colors";
import {ToastAndroidBS} from "../../Common/functions";

class CPAMePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            avatarSource: null,
            logon: false,
            nickname: '',
        };
    }

    componentDidMount() {
        this._loadUserProfile();
    }

    _loadUserProfile() {
        if (AppContext.isLogon === true) {
            AppContext.loadUserProfile()
                .then(ret => {
                    if (ret === null || ret === undefined) {
                        ToastAndroidBS("登录信息失效，请重新登录！");
                    } else {
                        this.setState({
                            ...this.state,
                            nickname: ret.nickname,
                            avatarSource: ret.avatar !== null ? JSON.parse(ret.avatar) : null,
                            logon: true,
                        });
                    }
                })
                .catch(error => {
                    console.log(error.message);
                    ToastAndroidBS("加载个人信息失败！");
                });
        }
    }

    // 个人资料
    _personalData = () => {
        this._navigateTo('PersonalData', {callback: this._onUpdate});
    };

    // 钱包
    _wallet = () => {
        this._navigateTo('Wallet');
    };

    // 充电记录
    _chargingRecords = () => {
        this._navigateTo('ChargingRecords');
    };

    // 我的预约
    _mySubscribe = () => {
        this._navigateTo('MySubscribe');
    };

    // 设置
    _setting = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Setting', {callback: this._onLogout});
    };

    // 登录
    _login = () => {
        if (!this.state.logined){
            this._goToLogin();
        }
    };

    _goToLogin = ()=>{
        const {nav} = this.props.screenProps;
        nav && nav('Login', {callback: this._onLogin});
    };

    _onLogin = () => {
        this._loadUserProfile();
    };

    _onLogout = () => {
        this.setState({
            ...this.state,
            nickname: '',
            logon: false,
        });
    };

    _onUpdate = () => {
        this._loadUserProfile();
    };

    _navigateTo = (screenKey, params) => {
        if (AppContext.isLogon === true) {
            const {nav} = this.props.screenProps;
            if (params === null || params === undefined)
                nav && nav(screenKey);
            else
                nav && nav(screenKey, params);
        } else {
            ToastAndroidBS('请先登录！');
            this._goToLogin();
        }
    };

    // 注册
    _register = () => {
        if (!this.state.logined){
            const {nav} = this.props.screenProps;
            nav && nav('Register', {registerOrReset: 'register', callback: this._onRegistered});
        }
    };

    render() {
        const list = [
            {
                title: '个人资料',
                icon: {name:'user', type:'simple-line-icon'},
                callback: this._personalData,
            },
            {
                title: '钱包',
                icon: {name:'wallet', type:'simple-line-icon'},
                callback: this._wallet,
            },
            {
                title: '充电记录',
                icon: {name:'list', type:'simple-line-icon'},
                callback: this._chargingRecords,
            },
            {
                title: '我的预约',
                icon: {name:'pin', type:'simple-line-icon'},
                callback: this._mySubscribe,
            },
        ];

        const settings = [
            {
                title: '设置',
                icon: {name:'settings', type:'simple-line-icon'},
                callback: this._setting,
            }
        ];

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <ImageBackground  style={[styles.backgroundImage, {backgroundColor: colors.theme1}]}>
                        <View style={{alignItems:'center'}}>
                            <Avatar width={100} height={100}
                                    rounded
                                    onPress={this._changeAvatar}
                                    activeOpacity={0.7}
                                    icon={{name: 'user', type: 'simple-line-icon', color:'yellow'}}
                                    source={this.state.avatarSource}
                            />

                            {
                                this.state.logon === true ?
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.text}>
                                            {this.state.nickname}
                                        </Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row', marginTop:10,}}>
                                        <TouchableOpacity>
                                            <Text style={[styles.text, styles.login]}
                                                  onPress={this._login}
                                                  textDecorationLine='underline'>
                                                登录/注册
                                            </Text>
                                        </TouchableOpacity>
                                        {/*<Text> / </Text>
                                        <TouchableOpacity>
                                            <Text style={[styles.text, styles.register]}
                                                  onPress={this._register}
                                                  textDecorationLine='underline'>
                                                注册
                                            </Text>
                                        </TouchableOpacity>*/}
                                    </View>
                            }
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView>
                    <View>
                        <List style={styles.list}>
                            {
                                list.map((item, i) => (
                                    <ListItem key={i}
                                              title={item.title}
                                              leftIcon={item.icon}
                                              containerStyle={styles.item}
                                              underlayColor='#F3F3F3'
                                              onPress={() => item.callback && item.callback()}
                                    />
                                ))
                            }
                        </List>

                        <List style={styles.settings}>
                            {
                                settings.map((item, i) => (
                                    <ListItem key={i}
                                              title={item.title}
                                              leftIcon={item.icon}
                                              containerStyle={styles.item}
                                              underlayColor='#F3F3F3'
                                              onPress={() => item.callback && item.callback()}
                                    />
                                ))
                            }
                        </List>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default CPAMePage;