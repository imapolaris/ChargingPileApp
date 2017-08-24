import React, {Component} from 'react';
import {View} from 'react-native';

import {StackNavigator} from 'react-navigation';
import CPAListPage from "../../../CustomPages/ListPage/index";

import styles from './styles';
import CPALocationPage from "../../../CustomPages/LocationPage/index";
import NavButton from '../../NavButton/index';
import CPADetailsPage from "../../../CustomPages/DetailsPage/index";
import CPAMapNavigationPage from "../../../CustomPages/MapNavigationPage/index";
import CPATabScreen from "../CPATabNavigator/index";
import CPAPersonalDataPage from "../../../CustomPages/PersonalDataPage/index";
import CPAWalletPage from "../../../CustomPages/WalletPage/index";
import CPAChargingRecordsPage from "../../../CustomPages/ChargingRecordsPage/index";
import CPAMySubscribePage from "../../../CustomPages/MySubscribePage/index";
import CPAPayRecordsPage from "../../../CustomPages/PayRecordsPage/index";
import CPAActionPayPage from "../../../CustomPages/ActionPayPage/index";
import CPAChangePwdPage from "../../../CustomPages/ChangePwdPage/index";
import CPASettingPage from "../../../CustomPages/SettingPage/index";
import CPAUserAgreement from "../../UserAgreement/index";
import CPAAboutUsPage from "../../../CustomPages/AboutUsPage/index";
import CPALoginPage from "../../../CustomPages/LoginPage/index";
import CPARegisterOrResetPwdPage from "../../../CustomPages/RegisterOrResetPwdPage/index";
import CPAScanScreen from "../../../CustomPages/ScanPage/index";

const CPAStackNavigator = StackNavigator(
    {
        Home:{
            screen: CPATabScreen,
            navigationOptions: ({navigation}) => {
                return ({
                    headerTitle: "地图",
                    headerLeft: (
                        <View>
                            <NavButton label="北京" onPress={() => {
                                navigation.navigate('Location');
                            }} />
                        </View>
                    ),
                    headerRight: (
                        <NavButton label="列表" onPress={() => {
                            navigation.navigate('List');
                        }} />
                    ),
                    header: null,
                    /*header:
                        navigation.state.params && navigation.state.params.headerVisible ?
                        undefined : null,*/
                });
            }
        },
        List:{
            screen: CPAListPage,
            navigationOptions:({navigation}) => {
                return ({
                    title: '列表',
                    headerRight: (
                        <NavButton label="地图" onPress={() => {
                            navigation.goBack();
                        }} />
                    ),
                });
            }
        },
        Location:{
            screen: CPALocationPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '选择城市',
                });
            },
        },
        Details:{
            screen: CPADetailsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充电站详情',
                });
            }
        },
        MapNav:{
            screen: CPAMapNavigationPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '导航',
                });
            }
        },
        PersonalData: {
            screen: CPAPersonalDataPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '个人资料',
                });
            }
        },
        Wallet: {
            screen: CPAWalletPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '钱包',
                });
            }
        },
        ChargingRecords: {
            screen: CPAChargingRecordsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充电记录',
                });
            }
        },
        MySubscribe: {
            screen: CPAMySubscribePage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '我的预约',
                });
            }
        },
        Setting: {
            screen: CPASettingPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '设置',
                });
            }
        },
        ChangePwd:{
            screen: CPAChangePwdPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '修改密码',
                });
            }
        },
        PayRecords: {
            screen: CPAPayRecordsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充值记录',
                });
            }
        },
        ActionPay: {
            screen: CPAActionPayPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充值',
                });
            }
        },
        UserAgreement: {
            screen: CPAUserAgreement,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '用户协议',
                });
            }
        },
        AboutUs: {
            screen: CPAAboutUsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '关于我们'
                });
            },
        },
        Login: {
            screen: CPALoginPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '登录',
                    headerRight:(
                        <NavButton label="快速注册"
                                   onPress={() => {
                                       navigation.navigate('Register', {registerOrReset: 'register'});
                                   }}
                        />
                    ),
                });
            },
        },
        Register: {
            screen: CPARegisterOrResetPwdPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '注册',
                });
            },
        },
        Reset: {
            screen: CPARegisterOrResetPwdPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '重置密码',
                });
            },
        },
        Scan: {
            screen: CPAScanScreen,
            navigationOptions: {
                title: '充电'
            }
        },
    },
    {
        navigationOptions: {
            gesturesEnabled: true,
            headerTitleStyle: {
                alignSelf: 'center',
            }
        },
    }
);

class App extends Component{
    render() {
        return (
            <View style={styles.container}>
                <CPAStackNavigator/>
            </View>
        );
    }
}

export default App;