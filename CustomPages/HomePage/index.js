import React, {Component} from 'react';
import {View, Image, ScrollView, Button} from 'react-native';

import styles from './styles';
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {MapView} from 'react-native-baidu-map';

class CPAHomePage extends Component{
    _toLocation = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Location');
    };

    _toList = () => {
        const {nav} = this.props.screenProps;
        nav && nav('List');
    };

    // 扫一扫
    _onStartChargingPress = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Scan', {headerVisible: true});
    };

    render() {
        return (
            <View style={styles.container}>
                <DefinedTitleBar ToLocation={this._toLocation} ToList={this._toList} />

                <View style={styles.container}>
                    <MapView />

                    <ActionButton buttonColor='rgba(231,76,60,1)'
                                  onPress={this._onStartChargingPress}
                                  icon={<Icon name="md-qr-scanner" style={styles.actionButtonIcon} />}
                                  position="center"
                                  offsetX={0}
                                  offsetY={20}
                                  buttonText="扫码充电"
                    />
                </View>
            </View>
        );
    }
}

export default CPAHomePage;