import React, {Component} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';

import styles from './styles';
import {List, ListItem, Avatar} from 'react-native-elements';

class CPAMePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    // 个人资料
    _personalData = (nav) => {
        nav && nav('PersonalData');
    };

    // 钱包
    _wallet = (nav) => {
        nav && nav('Wallet');
    };

    // 充电记录
    _chargingRecords = (nav) => {
        nav && nav('ChargingRecords');
    };

    // 我的预约
    _mySubscribe = (nav) => {
        nav && nav('MySubscribe');
    };

    // 设置
    _setting = (nav) => {
        nav && nav('Setting');
    };

    // 更换头像
    _changeAvatar = () => {
        alert('avatar');
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
        ]

        const {nav} = this.props.screenProps;

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Image style={styles.backgroundImage}
                        source={require('../../Resources/Images/homebk.png')}>
                        <View style={{alignItems:'center'}}>
                            <Avatar large
                                    rounded
                                    onPress={this._changeAvatar}
                                    activeOpacity={0.7}
                                    icon={{name: 'user', type: 'simple-line-icon', color:'yellow'}}
                            />

                            <Text style={styles.text}>
                                {this.props.nickname || 'alex'}
                            </Text>
                        </View>
                    </Image>
                </View>
                <ScrollView>
                    <View>
                        <List style={styles.list}>
                            {
                                list.map((item, i) => (
                                    <ListItem key={i}
                                              title={item.title}
                                              leftIcon={item.icon}
                                              onPress={() => item.callback && item.callback(nav)}
                                    />
                                ))
                            }
                        </List>

                        <List>
                            {
                                settings.map((item, i) => (
                                    <ListItem key={i}
                                              title={item.title}
                                              leftIcon={item.icon}
                                              onPress={() => item.callback && item.callback(nav)}
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