/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ScanButton from "./CustomComponents/ScanButton/index";
import UserAgreement from "./CustomComponents/UserAgreement/index";
import App from "./CustomComponents/Navigators/CPAStackNavigator/index";
import CPAPersonalDataPage from "./CustomPages/PersonalDataPage/index";
import CPAChangePwdPage from "./CustomPages/ChangePwdPage/index";
import CPAWalletPage from "./CustomPages/WalletPage/index";
import CPAActionPayPage from "./CustomPages/ActionPayPage/index";

AppRegistry.registerComponent('ChargingPileApp', () => CPAActionPayPage);
