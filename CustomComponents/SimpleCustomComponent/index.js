import React, {Component} from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import colors from '../../Common/colors';

export class ScTextInput extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <TextInput value={this.state.value}
                       placeholder={this.props.placeholder}
                       placeholderTextColor={this.props.placeholderTextColor}
                       secureTextEntry={this.props.secureTextEntry}
                       style={[styles.textInput, this.props.style]}
                       underlineColorAndroid={this.props.underlineColorAndroid}
                       selectionColor={colors.theme1} />
        );
    }
}