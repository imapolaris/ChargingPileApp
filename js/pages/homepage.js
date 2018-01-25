'use strict';

import React from 'react';
import {TabNavigator} from "react-navigation";
import colors from "../common/colors";
import {StationMapIcon, ChargingIcon, NewsIcon, MeIcon} from "../common/icons";
import CPAStationMapPage from "./stationmap";
import CPAChargingPage from "./chargingpage";
import CPAMePage from "./mepage";
import CPANewsPage from "./newspage";


const CPAHomePage = TabNavigator(
    {
        StationMap: {
            screen: CPAStationMapPage,
            navigationOptions: {
                title: '首页',
                tabBarIcon: ({tintColor, focused}) => {
                    return StationMapIcon(tintColor, focused);
                }
            }
        },
        Charging: {
            screen: CPAChargingPage,
            navigationOptions: {
                title: '充电',
                tabBarIcon: ({tintColor, focused}) => {
                    return ChargingIcon(tintColor, focused);
                }
            }
        },
        Message: {
            screen: CPANewsPage,
            navigationOptions: {
                title: '资讯',
                tabBarIcon: ({tintColor, focused}) => {
                    return NewsIcon(tintColor, focused);
                }
            }
        },
        Me: {
            screen: CPAMePage,
            navigationOptions: {
                title: '我的',
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
            inactiveBackgroundColor: colors.theme1,
            activeBackgroundColor: colors.theme1,
            activeTintColor: colors.tintColor,
            inactiveTintColor: colors.white,

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