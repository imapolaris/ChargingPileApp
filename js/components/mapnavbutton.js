'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IconType} from "../common/icons";
import {Icon} from "react-native-elements";
import colors from "../common/colors";
import {MapSelector} from "./selector";
import PropTypes from 'prop-types';
import {ActiveOpacity} from "../common/constants";

class MapNavButton extends Component{
    static propTypes = {
        address: PropTypes.object.isRequired,
    };

    _showMapNavigator = () => {
        const {address} = this.props;
        this._mapSelector.show(null, address);
    };

    render() {
        const {buttonStyle, textStyle} = this.props;

        return (
            <TouchableOpacity style={[styles.button, buttonStyle]}
                              onPress={this._showMapNavigator}
                              activeOpacity={ActiveOpacity}>
                <Icon type={IconType.Ionicon} name="md-navigate" size={20} color={colors.white} />
                <Text style={[styles.text, textStyle]}>
                    导航
                </Text>

                <MapSelector ref={self=>this._mapSelector=self} />
            </TouchableOpacity>
        );
    }
}

export default MapNavButton;

const styles = StyleSheet.create({
    button: {
        width: 55,
        height: 55,
        backgroundColor: colors.primary1,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 14,
        color: colors.white,
    },
});