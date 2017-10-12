import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import {List, ListItem, Button, Avatar} from 'react-native-elements';
import {ToastAndroidBS} from "../../Common/functions";
import {getUserProfile, updateUserProfile} from "../../Common/webApi";
import {AlertSelected} from "../../CustomComponents/AlertSelected/index.android";
import {selectFromLibrary, takePicture} from '../../CustomComponents/AvatarPicker/index';
import AlertWaiting, {closeWaitingAlert, openWaitingAlert} from "../../CustomComponents/AlertWaiting/index";

const selectArr = [{key: 0, title:'拍照...'}, {key: 1, title: '从手机相册选择'}];
const selectGenderArr = [{key: 0, title: '男'}, {key: 1, title:'女'}];
class CPAPersonalDataPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            avatarSource: null,
            nickname: '',
            gender: '',
            loaded: false,
        };
    }

    componentDidMount() {
        this._getUserProfile();
    }

    componentWillUnmount() {
        closeWaitingAlert(this._waiting);
    }

    // 查询用户个人信息
    _getUserProfile = ()=> {
        openWaitingAlert(this._waiting);
        this.setState({
            ...this.state,
            loaded: false,
        });
        getUserProfile(AppContext.userId)
            .then(ret=>{
                closeWaitingAlert(this._waiting);

                if (ret.result === true){
                    this.setState({
                        ...this.state,
                        nickname: ret.data.nickname,
                        gender: ret.data.gender,
                        avatarSource: ret.data.avatar !== null ? JSON.parse(ret.data.avatar) : null,
                        loaded: true,
                    })
                } else {
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(err=>{
                closeWaitingAlert(this._waiting);
                console.log(err);
                ToastAndroidBS(err.message);
            });
    };

    _confirmModify = () => {
        let avatar = JSON.stringify(this.state.avatarSource);
        let nickname = this.state.nickname;
        let gender = this.state.gender;
        let data = {nickname: nickname, gender: gender, avatar: avatar};

        openWaitingAlert(this._waiting, '正在保存...');
        updateUserProfile(Object.assign({}, data, {id: AppContext.userId}))
            .then(ret=>{
                closeWaitingAlert(this._waiting);

                if (ret.result === true){
                    ToastAndroidBS('修改成功');

                    AppContext.updateUserProfile(data);

                    const {goBack} = this.props.navigation;
                    goBack && goBack();
                } else {
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(err=>{
                closeWaitingAlert(this._waiting);
                console.log(err);
                ToastAndroidBS(err.message);
            });
    };

    // 更换头像
    _changeAvatar = () => {
        this._selector.show('选择头像',
            selectArr,
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

    _changeGender = () => {
        this._genderSelector.show('选择性别',
            selectGenderArr,
            (i)=>{
                switch (i){
                    case 0:
                        this.setState({
                            ...this.state,
                            gender: '男'
                        });
                        break;
                    case 1:
                        this.setState({
                            ...this.state,
                            gender: '女'
                        });
                        break;
                    default:
                        break;
                }
            })
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
            // let source = { uri: response.uri };

            // You can also display the image using data:
            let source = { uri: 'data:image/jpeg;base64,' + response.data };

            //AppContext.saveAvatar(source);

            this.setState({
                avatarSource: source
            });
        }
    };

    _onChangePwd = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('ChangePwd', {PersonalKey: this.props.navigation.state.key});
    };

    render() {
        const list = [
            {
                title: '修改密码',
                icon: {name:'lock', type:'simple-line-icon'},
                callback: this._onChangePwd,
            },
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            头像
                        </Text>

                        <Avatar width={45} height={45}
                                rounded
                                onPress={this._changeAvatar}
                                activeOpacity={0.7}
                                icon={{name: 'user', type: 'simple-line-icon', color:'yellow'}}
                                source={this.state.avatarSource}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            昵称
                        </Text>

                        <TextInput style={styles.textInput}
                                   value={this.state.nickname}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text)=>{
                                       this.setState({
                                           ...this.state,
                                           nickname: text,
                                       });
                                   }} />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            性别
                        </Text>

                        <TouchableOpacity style={styles.button}
                                          onPress={this._changeGender}>
                            <Text style={styles.buttonText}>
                                {this.state.gender}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <List style={styles.list}>
                        {
                            list.map((item, i) => (
                                <ListItem key={i}
                                          title={item.title}
                                          leftIcon={item.icon}
                                          containerStyle={styles.item}
                                          onPress={() => item.callback && item.callback()}
                                />
                            ))
                        }
                    </List>
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.button}
                            title="确认修改"
                            onPress={this._confirmModify}
                            disabled={!this.state.loaded}
                            disabledStyle={styles.disabled}
                    />
                </View>

                <AlertSelected ref={self=>this._selector=self} />
                <AlertSelected ref={self=>this._genderSelector=self} />
                <AlertWaiting ref={self=>this._waiting=self} />
            </View>
        );
    }
}

export default CPAPersonalDataPage;