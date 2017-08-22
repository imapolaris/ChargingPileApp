import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';

import styles from './styles';
import {Button, List, ListItem} from 'react-native-elements';

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

    // 退出登录
    _quitMe = () => {
        ToastAndroid.show('已退出登录！',
                ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
        );
    };

    render() {
        const list = [
            {
                key:1,
                title:'用户协议',
                icon:{name:'', type:'simple-line-icon'},
                callback:this._userAgreement,
            },
            {
                key:2,
                title:'关于我们',
                icon:{name:'', type:'simple-line-icon'},
                callback:this._aboutUs,
            },
        ];

        return (
            <View style={styles.container}>
                <List style={styles.list}>
                    {
                        list.map((item, i) => (
                            <ListItem key={item.key}
                                      title={item.title}
                                      icon={item.icon}
                                      onPress={() => item.callback && item.callback()}
                            />
                        ))
                    }
                </List>

                <View style={styles.buttonContainer}>
                    <Button title="退出登录"
                            onPress={this._quitMe}
                            style={styles.button} />
                </View>
            </View>
        );
    }
}

export default CPASettingPage;