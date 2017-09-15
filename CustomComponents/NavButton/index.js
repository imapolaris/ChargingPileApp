import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';

// navigator button.
class NavButton extends Component{
    _onPress = () => {
        alert('undeveloped yet...');
    };

    render() {
        return (
            <TouchableOpacity style={[styles.navButton, this.props.style]}>
                <View style={styles.container}>
                    <Text onPress={this.props.onPress || this._onPress}
                          style={styles.text}
                          numberOfLines={1}
                          adjustsFontSizeToFit={true}
                          allowFontScaling={true} >
                        {this.props.label || 'Nav' }
                    </Text>

                    {
                        this.props.showIcon ?
                            <View style={styles.iconContainer}>
                                {this.props.icon}
                            </View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

export default NavButton;