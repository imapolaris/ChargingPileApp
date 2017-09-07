import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import styles from './styles';
import themes from '../../Common/styles';

class CPAScanButton extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            pressIn: false,
        };
    }

    render(){
        return (
            <TouchableOpacity style={[styles.button,
                                        styles.buttonNormal]}
                              onPress={this._onPress}
                              activeOpacity={0.6}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {this.props.label || '扫一扫'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress = () => {
        this.props.OnPress && this.props.OnPress();
    }
}

export default CPAScanButton;