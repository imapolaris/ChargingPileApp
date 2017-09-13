import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import styles from './styles';
import icons from '../../Common/fonts';
import colors from '../../Common/colors';
import {Icon} from 'react-native-elements';

// navigator button.
class NavButton extends Component{
    _onPress = () => {
        alert('undeveloped yet...');
    };

    render() {
        return (
            <TouchableOpacity style={[styles.navButton, this.props.style]}>
                <View style={styles.container}>
                    {
                        this.props.showIcon ?
                            <Icon type={icons.SimpleLineIcon}
                                  name="location-pin"
                                  color={colors.white}
                                  iconStyle={styles.icon} />
                            :
                            null
                    }

                    <Text onPress={this.props.onPress || this._onPress}
                          style={styles.text}
                          numberOfLines={1}
                          adjustsFontSizeToFit={true}
                          allowFontScaling={true} >
                        {this.props.label || 'Nav' }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default NavButton;