import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {StackNavigator, NavigationActions} from 'react-navigation';
import styles from './styles';
import colors from '../../../Common/colors';
import CPALocationPage from "../../../CustomPages/LocationPage/index";
import NavButton from '../../NavButton/index';
import CPADetailsPage from "../../../CustomPages/DetailsPage/index";
import CPATabScreen from "../CPATabNavigator/index";
import CPAPersonalDataPage from "../../../CustomPages/PersonalDataPage/index";
import CPAWalletPage from "../../../CustomPages/WalletPage/index";
import CPAChargingRecordsPage from "../../../CustomPages/ChargingRecordsPage/index";
import CPAMySubscribePage from "../../../CustomPages/MySubscribePage/index";
import CPAPayRecordsPage from "../../../CustomPages/PayRecordsPage/index";
import CPAChangePwdPage from "../../../CustomPages/ChangePwdPage/index";
import CPASettingPage from "../../../CustomPages/SettingPage/index";
import CPAUserAgreementPage from "../../../CustomPages/UserAgreementPage/index";
import CPAAboutUsPage from "../../../CustomPages/AboutUsPage/index";
import CPALoginPage from "../../../CustomPages/LoginPage/index";
import CPARegisterOrResetPwdPage from "../../../CustomPages/RegisterOrResetPwdPage/index";
import CPAScanScreen from "../../../CustomPages/ScanPage/index";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import CPAListPage from "../../../CustomPages/ListPage/index";
import CPAWelcomePage from "../../../CustomPages/WelcomePage/index";
import CPASearchPage from "../../../CustomPages/SearchPage/index";

const CPAStackNavigator = StackNavigator(
    {
        Welcome:{
            screen: CPAWelcomePage,
            navigationOptions: {
                header: null,
            }
        },
        Home:{
            screen: CPATabScreen,
            navigationOptions: {
                header: null,
            }
        },
        Search:{
            screen: CPASearchPage,
            navigationOptions: {
                header: null,
            }
        },
        List:{
            screen: CPAListPage,
            navigationOptions: {
                title: '周边站点',
            }
        },
        Location:{
            screen: CPALocationPage,
            navigationOptions: {
                title: '选择城市',
            },
        },
        Details:{
            screen: CPADetailsPage,
            navigationOptions: {
                title: '充电站详情',
            }
        },
        PersonalData: {
            screen: CPAPersonalDataPage,
            navigationOptions: {
                title: '个人资料',
            }
        },
        Wallet: {
            screen: CPAWalletPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '钱包',
                    headerRight: (
                        <NavButton label="明细"
                                   onPress={() => {
                                       navigation.navigate('PayRecords');
                                   }}
                        />
                    ),
                });
            }
        },
        ChargingRecords: {
            screen: CPAChargingRecordsPage,
            navigationOptions: {
                title: '充电记录',
            }
        },
        MySubscribe: {
            screen: CPAMySubscribePage,
            navigationOptions: {
                title: '我的预约',
            }
        },
        Setting: {
            screen: CPASettingPage,
            navigationOptions: {
                title: '设置',
            }
        },
        ChangePwd:{
            screen: CPAChangePwdPage,
            navigationOptions: {
                title: '修改密码',
            }
        },
        PayRecords: {
            screen: CPAPayRecordsPage,
            navigationOptions: {
                title: '充值记录',
            }
        },
        UserAgreement: {
            screen: CPAUserAgreementPage,
            navigationOptions: {
                title: '用户协议',
            }
        },
        AboutUs: {
            screen: CPAAboutUsPage,
            navigationOptions: {
                title: '关于我们'
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
            navigationOptions: {
                title: '注册',
            },
        },
        Reset: {
            screen: CPARegisterOrResetPwdPage,
            navigationOptions: {
                title: '重置密码',
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
        initialRouteName: 'Welcome',
        navigationOptions: {
            gesturesEnabled: true,
            headerTitleStyle: {
                alignSelf: 'center',
                color: colors.grey5,
                fontSize: 18,
            },
            headerBackTitleStyle: {
                color: colors.white,
            },
            headerRight:<Text/>,
        },
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        })
    }
);

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

export default CPAStackNavigator;