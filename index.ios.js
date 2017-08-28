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
import AvatarPicker from "./CustomComponents/AvatarPicker/index";

AppRegistry.registerComponent('ChargingPileApp', () => AvatarPicker);
