import React, {Component} from 'react';
import {View, ScrollView, ImageBackground, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {List, ListItem, Avatar} from 'react-native-elements';
import {selectFromLibrary, showAvatarPicker, takePicture} from '../../CustomComponents/AvatarPicker/index';
import {AlertSelected} from "../../CustomComponents/AlertSelected/index.android";
import {loadAvatar, saveAvatar} from "../../Common/appContext";
import {NavigationActions} from 'react-navigation';

const selectArr = [{key: 0, title:'拍照...'}, {key: 1, title: '从手机相册选择'}];
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

    // 更换头像
    _changeAvatar = () => {
        this._selector.show('选择头像',
            selectArr,
            '#333333',
            (i)=>{
                switch (i){
                    case 0:
                        takePicture(this.selectAvatarResponse);
                        break;
                    case 1:
                        selectFromLibrary(this.selectAvatarResponse);
                        break;
                    default:
                        break;
                }
            }
        );
    };

    selectAvatarResponse = (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            saveAvatar(response.data);

            this.setState({
                avatarSource: source
            });
        }
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
                    <ImageBackground  ref={self=>this._avatar=self}
                            style={styles.backgroundImage}
                            source={require('../../Resources/Images/homebk.png')}>
                        <View style={{alignItems:'center'}}>
                            <Avatar width={100} height={100}
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

                <AlertSelected ref={self=>this._selector=self} />
            </View>
        );
    }
}

export default CPAMePage;