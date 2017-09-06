import React, {Component} from 'react';
import {View, ToastAndroid, BackHandler} from 'react-native';

import {StackNavigator, NavigationActions} from 'react-navigation';
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
import CPAWaitingSubscribePage from "../../../CustomPages/WaitingSubscribePage/index";

import {NavButtonMarginW, NavButtonMarginN} from '../../../CommonStyles/styles';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

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
                        }} style={{marginRight:NavButtonMarginW, marginLeft:NavButtonMarginN}} />
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
        Subscribe: {
            screen: CPAWaitingSubscribePage,
            navigationOptions: {
                title: '预约等待'
            }
        }
    },
    {
        navigationOptions: {
            gesturesEnabled: true,
            headerTitleStyle: {
                alignSelf: 'center',
            }
        },
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        })
    }
);

let lastBackPressed = 0;

class App extends Component{
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        /*let now = new Date().getTime();
        if(now - lastBackPressed < 2500) {
            return false;
        }
        lastBackPressed = now;
        ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
        return true;*/
    };

    render() {
        return (
            <View style={styles.container}>
                <CPAStackNavigator />
            </View>
        );
    }
}


/*const defaultStateAction = CPAStackNavigator.router.getStateForAction;
CPAStackNavigator.router.getStateForAction = (action, state) => {
    if(state && action.type === NavigationActions.BACK && state.routes.length === 1) {
        if (lastBackPressed + 2000 < Date.now()) {
            ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
            lastBackPressed = Date.now();
            const routes = [...state.routes];
            return {
                ...state,
                ...state.routes,
                index: routes.length - 1,
            };
        }
    }
    return defaultStateAction(action,state);
};*/

export default App;