'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from "../common/colors";
import {Button, List, ListItem} from "react-native-elements";
import {ScreenKey} from "../common/constants";
import {connect} from "react-redux";
import {doNav} from "../redux/navactions";
import {doSwitchMessageNotice} from "../redux/systemactions";
import {doLogout} from "../redux/useractions";

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
        const {nav} = this.props;
        nav && nav(screenKey);
    };

    _quitMe = () => {
        const {logout} = this.props;
        logout && logout();
    };

    render() {
        const system = [
            /*{
                title: '清除缓存',
                rightTitle: '0.8MB',
                action: this._clearCache,
            },*/
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

        const {logined, notice, switchMessageNotice} = this.props;

        return (
            <View style={styles.container}>
                <List style={styles.list}>
                    <ListItem title={'新消息提醒'}
                              hideChevron={true}
                              switchButton={true}
                              switched={notice}
                              switchOnTintColor={colors.green}
                              switchThumbTintColor={colors.white}
                              containerStyle={styles.item}
                              onSwitch={(e) => {switchMessageNotice && switchMessageNotice(e)}}/>
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
                            style={styles.button}
                            disabled={!logined}
                            disabledStyle={styles.disabled} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        logined: state.user.logined,
        notice: state.system.notice,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(doLogout()),
        nav: (screenKey) => dispatch(doNav(screenKey)),
        switchMessageNotice: (notice) => dispatch(doSwitchMessageNotice(notice)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPASettingPage);

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
    disabled: {
        backgroundColor: colors.grey3,
    },
});