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
import CPACharingRecordsPage from "../../../CustomPages/ChargingRecordsPage/index";
import CPAMySubscribePage from "../../../CustomPages/MySubscribePage/index";
import CPAPayRecordsPage from "../../../CustomPages/PayRecordsPage/index";
import CPAActionPayPage from "../../../CustomPages/ActionPayPage/index";
import CPAChangePwdPage from "../../../CustomPages/ChangePwdPage/index";
import CPASettingPage from "../../../CustomPages/SettingPage/index";
import CPAUserAgreement from "../../UserAgreement/index";
import CPAAboutUsPage from "../../../CustomPages/AboutUsPage/index";

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
                            //console.log(navigation);
                            navigation.navigate('List');
                        }} />
                    ),
                    headerTitleStyle: {
                        alignSelf: 'center',
                    },
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
                    headerTitleStyle: {
                        alignSelf: 'center',
                    },
                });
            }
        },
        Location:{
            screen: CPALocationPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '选择城市',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            },
        },
        Details:{
            screen: CPADetailsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充电站详情',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        MapNav:{
            screen: CPAMapNavigationPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '导航',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        PersonalData: {
            screen: CPAPersonalDataPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '个人资料',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        Wallet: {
            screen: CPAWalletPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '钱包',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        ChargingRecords: {
            screen: CPACharingRecordsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充电记录',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        MySubscribe: {
            screen: CPAMySubscribePage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '我的预约',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        Setting: {
            screen: CPASettingPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '设置',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        ChangePwd:{
            screen: CPAChangePwdPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '修改密码',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        PayRecords: {
            screen: CPAPayRecordsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充值记录',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        ActionPay: {
            screen: CPAActionPayPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充值',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        UserAgreement: {
            screen: CPAUserAgreement,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '用户协议',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        AboutUs: {
            screen: CPAAboutUsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '关于我们',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        }
    },
    {
        mode: 'modal',
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