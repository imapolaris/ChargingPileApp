'use strict';

import React from 'react';
import {TabNavigator} from "react-navigation";
import colors from "../common/colors";
import {SearchStationIcon, ChargingIcon, MessageIcon, MeIcon} from "../common/icons";
import CPASearchStationPage from "./searchstation";
import CPAChargingPage from "./chargingpage";
import CPAMessagePage from "./messagepage";
import CPAMePage from "./mepage";


const CPAHomePage = TabNavigator(
    {
        SearchStation: {
            screen: CPASearchStationPage,
            navigationOptions: {
                title: '首页',
                tabBarIcon: ({tintColor, focused}) => {
                    return SearchStationIcon(tintColor, focused);
                }
            }
        },
        Charging: {
            screen: CPAChargingPage,
            navigationOptions: {
                title: '扫码',
                tabBarIcon: ({tintColor, focused}) => {
                    return ChargingIcon(tintColor, focused);
                }
            }
        },
        Message: {
            screen: CPAMessagePage,
            navigationOptions: {
                title: '资讯',
                tabBarIcon: ({tintColor, focused}) => {
                    return MessageIcon(tintColor, focused);
                }
            }
        },
        Me: {
            screen: CPAMePage,
            navigationOptions: {
                title: '账户',
                tabBarIcon: ({tintColor, focused}) => {
                    return MeIcon(tintColor, focused);
                }
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,

        tabBarOptions: {
            activeTintColor: colors.tintColor,
            showIcon: true,
            tabStyle: {
                height: 50,
                flexDirection: 'column',
            },
            labelStyle: {
                fontSize: 12,
                margin: 2,
            }
        }
    }
);

export default CPAHomePage;