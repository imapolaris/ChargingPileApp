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
import CPARegisterPage from "../pages/register";
import CPAMyMessagePage from "../pages/mymessagepage";
import CPAWalletPage from "../pages/walletpage";
import CPASettingPage from "../pages/settingpage";
import CPAUserAgreementPage from "../pages/useragreement";
import CPAAboutUsPage from "../pages/aboutus";
import CPAStationListPage from "../pages/stationlist";
import CPAFeedbackPage from "../pages/feedback";
import CPAStationInfoPage from "../pages/stationnavigator";
import CPAFilterPage from "../pages/filterpage";
import CPAMySubscribePage from "../pages/mysubscribe";
import CPATestingReportPage from "../pages/testingreport";
import CPABillingRecordsPage from "../pages/billingrecords";
import CPAInvoiceInfoPage from "../pages/invoiceinfo";
import CPALocatingCityPage from "../pages/locatingcity";
import CPASearchStationPage from "../pages/searchstation";
import NavButton from "./navbutton";
import {ScanAction, ScreenKey, UserAction} from "../common/constants";
import CPAPersonalInfoPage from "../pages/personalinfo";
import CPABatteryTestingPage from "../pages/batterytesting";
import CPAInChargingPage from "../pages/incharging";
import CPAVehicleInfoPage from "../pages/vehicleinfo";
import CPAAddAddressPage from "../pages/addaddress";
import CPAChargingBillingPage from "../pages/chargingbilling";
import CPAMyCollectPage from '../pages/mycollect';
import CPANotificationPage from "../pages/notification";
import CPAAddVehiclePage from "../pages/addvehicle";
import CPATestingReportDetailPage from '../pages/testingreportdetail';
import {Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import {doStationCollectStateChanged} from "../redux/stationactions";
import RechargeRecords from "../pages/rechargerecords";


const CPAStackNavigator = StackNavigator(
    {
        Welcome: {
            screen: CPAWelcomePage,
            navigationOptions: {
                header: null,
            },
        },
        Home: {
            screen: CPAHomePage,
            navigationOptions: {
                header: null,
            }
        },
        Scan: {
            screen: CPAScanPage,
            navigationOptions: ({navigation}) => ({
                title: '扫码' + (navigation.state.params.action === ScanAction.Charging ? '充电' : '检测'),
            }),
        },
        StationList: {
            screen: CPAStationListPage,
            navigationOptions: {
                title: '附近电站'
            }
        },
        StationInfo: {
            screen: CPAStationInfoPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '电站信息',
                    headerRight:(
                        <NavButton showLabel={false}
                                   showIcon={true}
                                   icon={<Icon name={navigation.state.params.collect ? 'md-star' : 'md-star-outline'}
                                               type={IconType.Ionicon} color={colors.yellow} size={26} />}
                                   onNavAction={() => {
                                       const {dispatch} = navigation;
                                       const {stationId} = navigation.state.params;
                                       dispatch(doStationCollectStateChanged(stationId))
                                           .then(ret=>{
                                               if (ret) {
                                                   navigation.setParams({collect: !navigation.state.params.collect});
                                               }
                                           });
                                   }}
                        />
                    ),
                })
            }
        },
        Login: {
            screen: CPALoginPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '用户登录',
                    headerRight:(
                        <NavButton label="快速注册"
                                   onNavAction={() => {
                                       navigation.navigate(ScreenKey.Register, {action: UserAction.Register});
                                   }}
                        />
                    ),
                })
            }
        },
        Register: {
            screen: CPARegisterPage,
            navigationOptions: {
                title: '注册用户'
            }
        },
        ResetPwd: {
            screen: CPARegisterPage,
            navigationOptions: {
                title: '重置密码'
            }
        },
        PersonalInfo: {
            screen: CPAPersonalInfoPage,
            navigationOptions: {
                title: '个人信息',
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
            navigationOptions: ({navigation}) => {
                return ({
                    title: '钱包',
                    headerRight: (
                        <NavButton label="明细"
                                   onNavAction={() => {
                                       navigation.navigate(ScreenKey.RechargeRecords);
                                   }}
                        />
                    )
                });
            }
        },
        RechargeRecords: {
            screen: RechargeRecords,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充值记录',
                    headerRight: (
                        <NavButton label="清空"
                                   onNavAction={() => {
                                       const {clearRechargeRecords} = navigation.state.params;
                                       clearRechargeRecords && clearRechargeRecords();
                                   }}
                        />
                    )
                })
            }
        },
        Collect: {
            screen: CPAMyCollectPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '收藏列表',
                    headerRight: (
                        <NavButton label="清空"
                                   onNavAction={() => {
                                       const {clearCollect} = navigation.state.params;
                                       clearCollect && clearCollect();
                                   }}/>
                    ),
                })
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
        LocatingCity: {
            screen: CPALocatingCityPage,
            navigationOptions: {
                title: '城市列表',
            }
        },
        SearchStation: {
            screen: CPASearchStationPage,
            navigationOptions: {
                header: null
            }
        },
        Filter: {
            screen: CPAFilterPage,
            navigationOptions: {
                title: '过滤条件'
            }
        },
        BatteryTesting: {
            screen: CPABatteryTestingPage,
            navigationOptions: {
                header: null
            }
        },
        TestingReport: {
            screen: CPATestingReportPage,
            navigationOptions: {
                title: '检测报告'
            }
        },
        TestingReportDetail: {
            screen: CPATestingReportDetailPage,
            navigationOptions: {
                title: '报告详情'
            }
        },
        InCharging: {
            screen: CPAInChargingPage,
            navigationOptions: {
                title: '正在充电'
            }
        },
        VehicleInfo: {
            screen: CPAVehicleInfoPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '车辆信息',
                    headerRight: (
                        <NavButton label="添加车辆"
                                   onNavAction={() => {
                                       navigation.navigate(ScreenKey.AddVehicle);
                                   }} />
                    ),
                });
            }
        },
        AddVehicle: {
            screen: CPAAddVehiclePage,
            navigationOptions: {
                title: '添加车辆',
            }
        },
        AddAddress: {
            screen: CPAAddAddressPage,
            navigationOptions: {
                title: '新增地址',
            }
        },
        ChargingBilling: {
            screen: CPAChargingBillingPage,
            navigationOptions: {
                title: '充电账单',
            }
        },
        Notification: {
            screen: CPANotificationPage,
            navigationOptions: {
                title: '通知消息',
            }
        },
    },
    {
        //initialRouteName: 'Welcome',
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

            headerBackTitle: null,
        },
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        })
    }
);

export default CPAStackNavigator;