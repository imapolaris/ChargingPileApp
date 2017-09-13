import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';

class LabelTextInputListItem extends Component{
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Text style={styles.text}>
                    {this.props.label}
                </Text>

                <TextInput style={styles.textInput}
                           value={this.props.previousValue}
                           underlineColorAndroid='transparent'
                           secureTextEntry={this.props.isSecure}
                />
            </View>
        );
    }
}

export default LabelTextInputListItem;