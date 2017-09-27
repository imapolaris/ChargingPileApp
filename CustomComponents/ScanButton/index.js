import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {shadowStyle} from "../../Common/styles";

class CPAScanButton extends Component{
    render() {
        return (
            <View pointerEvents="box-none"
                  style={[styles.container, shadowStyle]}>
                <TouchableOpacity onPress={this._onPress}
                                  onLongPress={this._onPress}
                                  style={styles.button}
                                  activeOpacity={0.9} >
                    <Icon name="md-qr-scanner" size={20} style={styles.icon} />
                    <Text style={styles.text}>
                        扫码充电
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }
}

export default CPAScanButton;