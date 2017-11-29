import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';

import styles from './styles';
import {Button, List, ListItem} from 'react-native-elements';
import {ToastAndroidBS} from "../../Common/functions";

class CPASettingPage extends Component{
    // 用户协议
    _userAgreement = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('UserAgreement');
    };

    // 关于我们
    _aboutUs = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('AboutUs');
    };

    _feedback = ()=>{
        const {navigate} = this.props.navigation;
        navigate && navigate('Feedback');
    };

    // 退出登录
    _quitMe = () => {
        AppContext.logout();
        ToastAndroidBS("退出登录！");

        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    render() {
        const list = [
            {
                key:1,
                title:'用户协议',
                icon:{name:'doc', type:'simple-line-icon'},
                callback:this._userAgreement,
            },
            {
                key:2,
                title:'关于我们',
                icon:{name:'emotsmile', type:'simple-line-icon'},
                callback:this._aboutUs,
            },
            {
                key:3,
                title:'意见反馈',
                icon:{name:'bubble', type:'simple-line-icon'},
                callback:this._feedback,
            }
        ];

        return (
            <View style={styles.container}>
                <List style={styles.list}>
                    {
                        list.map((item, i) => (
                            <ListItem key={item.key}
                                      title={item.title}
                                      /*leftIcon={item.icon}*/
                                      containerStyle={styles.item}
                                      onPress={() => item.callback && item.callback()}
                            />
                        ))
                    }
                </List>

                {
                    AppContext.isLogon === true ?
                        <View style={styles.buttonContainer}>
                            <Button title="退出登录"
                                    onPress={this._quitMe}
                                    style={styles.button} />
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}

export default CPASettingPage;