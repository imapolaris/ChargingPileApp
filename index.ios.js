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

import App from "./CustomComponents/Navigators/CPAStackNavigator/index";

AppRegistry.registerComponent('ChargingPileApp', () => App);
