'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ActiveOpacity, NavButtonMarginRight, NavButtonMarginLeft} from "../common/constants";
import colors from "../common/colors";

class NavButton extends Component{
    render() {
        const {label, icon, showIcon, showLabel, btnStyle, textStyle} = this.props;

        return (
            <TouchableOpacity style={[styles.container, btnStyle]}
                              activeOpacity={ActiveOpacity}
                              onPress={this.props.onNavAction}>
                {
                    showLabel ?
                        <Text style={[styles.text, textStyle]}
                              numberOfLines={1}
                              adjustsFontSizeToFit={true}
                              allowFontScaling={true} >
                            {label}
                        </Text>
                        :
                        null
                }

                {
                    showIcon ?
                        <View style={[styles.iconContainer, this.props.showLabel ? {marginLeft:5} : null]}>
                            {icon}
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        );
    }
}

export default NavButton;

NavButton.propTypes = {
    //onNavAction: PropTypes.func.isRequired,
};

NavButton.defaultProps = {
    showLabel: true,
    showIcon: false,
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: NavButtonMarginLeft,
        marginRight: NavButtonMarginRight,
    },
    text: {
        fontSize: 16,
        color: colors.white,
    },
    iconContainer: {
        justifyContent: 'center',
    },
});