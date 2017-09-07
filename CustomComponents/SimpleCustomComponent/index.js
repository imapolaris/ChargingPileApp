import React, {Component} from 'react';
import {TextInput, View, Alert, Button} from 'react-native';
import styles from './styles';
import colors from '../../Common/colors';

export class ScTextInput extends Component{
    render() {
        return (
            <TextInput placeholder={this.props.placeholder}
                       placeholderTextColor={this.props.placeholderTextColor}
                       secureTextEntry={this.props.secureTextEntry}
                       style={[styles.textInput, this.props.style]}
                       underlineColorAndroid={this.props.underlineColorAndroid}
                       selectionColor={colors.theme1} />
        );
    }
}