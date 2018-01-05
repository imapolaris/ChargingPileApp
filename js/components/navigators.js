'use strict';

import React from 'react';
import {StackNavigator} from "react-navigation";
import CPAWelcomePage from "../pages/welcomepage";
import CPAHomePage from "../pages/homepage";
import CPAScanPage from "../pages/scanpage";
import colors from "../common/colors";
import {Text} from "react-native";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import CPALoginPage from "../pages/loginpage";
import CPARegisterPage from "../pages/registerpage";
import CPAMyMessagePage from "../pages/mymessagepage";
import CPAWalletPage from "../pages/walletpage";
import CPASettingPage from "../pages/settingpage";
import CPAUserAgreementPage from "../pages/useragreement";
import CPAAboutUsPage from "../pages/aboutus";
import CPAStationListPage from "../pages/stationlist";

const CPAStackNavigator = StackNavigator(
    {
        /*Welcome: {
            screen: CPAWelcomePage,
            navigationOptions: {
                header: null,
            },
        },*/
        Home: {
            screen: CPAHomePage,
            navigationOptions: {
                header: null,
            }
        },
        Scan: {
            screen: CPAScanPage,
            navigationOptions: {
                title: '扫码'
            }
        },
        StationList: {
            screen: CPAStationListPage,
            navigationOptions: {
                title: '电站列表'
            }
        },
        Login: {
            screen: CPALoginPage,
            navigationOptions: {
                title: '登录'
            }
        },
        Register: {
            screen: CPARegisterPage,
            navigationOptions: {
                title: '注册'
            }
        },
        MyMessage: {
            screen: CPAMyMessagePage,
            navigationOptions: {
                title: '我的消息'
            }
        },
        Wallet: {
            screen: CPAWalletPage,
            navigationOptions: {
                title: '钱包'
            }
        },
        Setting: {
            screen: CPASettingPage,
            navigationOptions: {
                title: '设置'
            }
        },
        UserAgreement: {
            screen: CPAUserAgreementPage,
            navigationOptions: {
                title: '用户协议'
            }
        },
        AboutUs: {
            screen: CPAAboutUsPage,
            navigationOptions: {
                title: '关于我们'
            }
        },
    },
    {
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

export default CPAStackNavigator;