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
import CPAFeedbackPage from "../pages/feedback";
import CPAStationInfoPage from "../pages/stationinfo";
import CPAFilterPage from "../pages/filterpage";
import CPAMySubscribePage from "../pages/mysubscribe";
import CPATestingReportPage from "../pages/testingreport";
import CPABillingRecordsPage from "../pages/billingrecords";
import CPAInvoiceInfoPage from "../pages/invoiceinfo";

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
                title: '附近电站'
            }
        },
        StationInfo: {
            screen: CPAStationInfoPage,
            navigationOptions: {
                title: '电站信息'
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
        Collect: {
            screen: CPAStationListPage,
            navigationOptions: {
                title: '收藏列表',
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
        Feedback: {
            screen: CPAFeedbackPage,
            navigationOptions: {
                title: '意见反馈'
            }
        },
        MySubscribe: {
            screen: CPAMySubscribePage,
            navigationOptions: {
                title: '我的预约'
            }
        },
        TestingReport: {
            screen: CPATestingReportPage,
            navigationOptions: {
                title: '检测报告'
            }
        },
        BillingRecords: {
            screen: CPABillingRecordsPage,
            navigationOptions: {
                title: '我的账单',
            }
        },
        InvoiceInfo: {
            screen: CPAInvoiceInfoPage,
            navigationOptions: {
                title: '发票信息',
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