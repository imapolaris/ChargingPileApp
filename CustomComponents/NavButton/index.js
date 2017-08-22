import React, {Component} from 'react';
import {View, TouchableOpacity, Button, Text} from 'react-native';

import styles from './styles';

// navigator button.
class NavButton extends Component{
    _onPress = () => {
        alert('nav');
    };

    render() {
        return (
            <TouchableOpacity style={[styles.navButton, this.props.style]}>
                <Text onPress={this.props.onPress || this._onPress}
                      style={styles.text}>
                    {this.props.label || 'Nav' }
                </Text>
            </TouchableOpacity>
        );
    }
}

export default NavButton;