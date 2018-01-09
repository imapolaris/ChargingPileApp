'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {Button, List, ListItem} from "react-native-elements";
import {ScreenKey} from "../common/constants";

class CPASettingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: true,
        };
    }

    _clearCache = () => {
        alert('清空缓存');
    };

    _checkVersion = () => {
        alert('检查版本');
    };

    _navigateTo = (screenKey) => {
        const {navigate} = this.props.navigation;
        navigate && navigate(screenKey);
    };

    render() {
        const system = [
            {
                title: '清除缓存',
                rightTitle: '0.8MB',
                action: this._clearCache,
            },
            {
                title: '当前版本',
                rightTitle: '0.1.1',
                action: this._checkVersion,
            },
        ];

        const list = [
            {
                title: '用户协议',
                screenKey: ScreenKey.UserAgreement,
            },
            {
                title: '关于我们',
                screenKey: ScreenKey.AboutUs,
            },
            {
                title: '意见反馈',
                screenKey: ScreenKey.Feedback,
            }
        ];

        return (
            <View style={styles.container}>
                <List style={styles.list}>
                    <ListItem title={'新消息提醒'}
                              hideChevron={true}
                              switchButton={true}
                              switched={this.state.notice}
                              switchOnTintColor={colors.green}
                              switchThumbTintColor={colors.white}
                              containerStyle={styles.item}/>
                </List>

                <List style={styles.system}>
                    {
                        system.map((item, index) => (
                            <ListItem key={index}
                                      title={item.title}
                                      containerStyle={styles.item}
                                      onPress={item.action} hideChevron={true}
                                      rightTitle={item.rightTitle} />
                        ))
                    }
                </List>

                <List style={styles.setting}>
                    {
                        list.map((item, index) => (
                            <ListItem key={index}
                                      title={item.title}
                                      containerStyle={styles.item}
                                      onPress={()=>{this._navigateTo(item.screenKey)}} />
                        ))
                    }
                </List>

                <View style={styles.buttonContainer}>
                    <Button title="退出登录"
                            onPress={this._quitMe}
                            style={styles.button}/>
                </View>
            </View>
        );
    }
}

export default CPASettingPage;

CPASettingPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        marginTop: 5,
    },
    system: {
        marginTop: 15,
    },
    setting: {
        marginTop: 15,
    },
    item: {
        backgroundColor: colors.white,
    },
    buttonContainer:{
        paddingTop: 30,
    },
    button: {

    },
});