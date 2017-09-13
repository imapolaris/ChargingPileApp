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