import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';

class LabelTextInputListItem extends Component{
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.label}
                </Text>

                <TextInput style={styles.textInput}
                           placeholder={this.props.placeholderText}
                           underlineColorAndroid='transparent'
                />
            </View>
        );
    }
}

export default LabelTextInputListItem;