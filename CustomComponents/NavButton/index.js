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
            <View style={styles.navContainer}>
                <TouchableOpacity>
                    <Text onPress={this.props.onPress || this._onPress}
                          style={styles.navButton}>
                        {this.props.label || 'Nav' }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default NavButton;