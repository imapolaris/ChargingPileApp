'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {IconType} from "../common/icons";
import colors from "../common/colors";
import {ActiveOpacity} from "../common/constants";
import {Icon} from "react-native-elements";

class RadioButton extends Component{
    render() {
        return (
            <TouchableOpacity style={[styles.container, {...this.props.style}]}
                              onPress={this.props.onChecked}
                              activeOpacity={ActiveOpacity}>
                <View style={styles.titleContainer}>
                    {
                        this.props.image
                    }
                    <Text style={styles.text}>
                        {this.props.title}
                    </Text>
                </View>

                <Icon type={IconType.Ionicon}
                      name={this.props.checked ? 'md-radio-button-on' : 'md-radio-button-off'}
                      size={30}
                      color={colors.grey3}
                      style={styles.icon} />
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
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
    },
    text: {
        fontSize: 16,
        paddingLeft: 5,
    },
    icon: {
        marginRight: 15,
    }
});