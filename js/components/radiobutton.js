'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {IconType} from "../common/icons";
import colors from "../common/colors";
import {ActiveOpacity, AndroidPlatform} from "../common/constants";
import {Icon} from "react-native-elements";

class RadioButton extends Component{
    render() {
        const {style, image, title} = this.props;

        return (
            <TouchableOpacity style={[styles.container, {...style}]}
                              onPress={this.props.onChecked}
                              activeOpacity={ActiveOpacity}>
                <View style={styles.titleContainer}>
                    {image}
                    <Text style={styles.text}>
                        {title}
                    </Text>
                </View>

                <Icon type={IconType.Ionicon}
                      name={this.props.checked ? 'md-radio-button-on' : 'md-radio-button-off'}
                      size={30}
                      color={colors.grey3}
                      style={styles.icon}/>
            </TouchableOpacity>
        );
    }
}

export default RadioButton;

RadioButton.propTypes = {
    onChecked: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    image: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
};

RadioButton.defaultProps = {
    checked: false,
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        borderColor: '#c3c3c3',
        borderWidth: Platform.OS === AndroidPlatform ? 0.2 : 0,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        paddingLeft: 5,
    },
    icon: {
        marginRight: 15,
    }
});