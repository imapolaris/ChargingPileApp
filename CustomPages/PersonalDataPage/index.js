import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import {List, ListItem, Button, Avatar} from 'react-native-elements';
import {ToastAndroidBS} from "../../Common/functions";
import {getUserProfile} from "../../Common/webApi";
import {AlertSelected} from "../../CustomComponents/AlertSelected/index.android";
import {selectFromLibrary, takePicture} from '../../CustomComponents/AvatarPicker/index';
import {saveAvatar} from "../../Common/appContext";

const selectArr = [{key: 0, title:'拍照...'}, {key: 1, title: '从手机相册选择'}];
const selectGenderArr = [{key: 0, title: '男'}, {key: 1, title:'女'}];
class CPAPersonalDataPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            userProfile: [],
            avatarSource: null,
            nickname: 'alex',
            gender: '男',
        };
    }

    componentDidMount() {
        //this._getUserProfile();
    }

    // 查询用户个人信息
    _getUserProfile() {
        getUserProfile('')
            .then(ret=>{

            })
            .catch(err=>{
                console.error(err);
                ToastAndroidBS("无法获取用户信息："+err);
            })
    }

    _confirmModify = () => {
        ToastAndroidBS('修改成功');

        const {goBack} = this.props.navigation;
        goBack && goBack();
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

    _changeGender = () => {
        this._genderSelector.show('选择性别',
            selectGenderArr,
            '#333333',
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
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            saveAvatar(response.data);

            this.setState({
                avatarSource: source
            });
        }
    };

    _onChangePwd = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('ChangePwd');
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
                            <Text>
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
                    />
                </View>

                <AlertSelected ref={self=>this._selector=self} />
                <AlertSelected ref={self=>this._genderSelector=self} />
            </View>
        );
    }
}

export default CPAPersonalDataPage;