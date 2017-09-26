import React, {Component} from 'react';
import {View, ScrollView, ImageBackground, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {List, ListItem, Avatar} from 'react-native-elements';
import {loadAvatar} from "../../Common/appContext";
import colors from "../../Common/colors";

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
        this._loadAvatar();

        /*this.setState({
            ...this.state,
            logon: AppContext.isLogon,
        });*/
    }

    _loadAvatar() {
        loadAvatar()
            .then(data=>{
                this.setState({
                    ...this.state,
                    avatarSource: { uri: 'data:image/jpeg;base64,' + data.data }
                });
            })
            .catch(error=>{
                console.log(error);
            });
    }

    // 个人资料
    _personalData = () => {
        const {nav} = this.props.screenProps;
        nav && nav('PersonalData');
    };

    // 钱包
    _wallet = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Wallet');
    };

    // 充电记录
    _chargingRecords = () => {
        const {nav} = this.props.screenProps;
        nav && nav('ChargingRecords');
    };

    // 我的预约
    _mySubscribe = () => {
        const {nav} = this.props.screenProps;
        nav && nav('MySubscribe');
    };

    // 设置
    _setting = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Setting');
    };

    // 登录
    _login = () => {
        if (!this.state.logined){
            this._goToLogin();
        }
    };

    _goToLogin = ()=>{
        const {nav} = this.props.screenProps;
        nav && nav('Login');
    };

    // 注册
    _register = () => {
        if (!this.state.logined){
            const {nav} = this.props.screenProps;
            nav && nav('Register', {registerOrReset: 'register', callback: this._onRegistered});
        }
    };

    // 注册完成
    _onRegistered = (status)=>{
        // 注册成功
        if (status === true) {
            //this._goToLogin();
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
                            <Avatar width={110} height={110}
                                    rounded
                                    onPress={this._changeAvatar}
                                    activeOpacity={0.7}
                                    icon={{name: 'user', type: 'simple-line-icon', color:'yellow'}}
                                    source={this.state.avatarSource}
                            />

                            {
                                this.state.logon ?
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.text}>
                                            {this.props.nickname}
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