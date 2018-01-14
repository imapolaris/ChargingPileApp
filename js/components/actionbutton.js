'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ActiveOpacity} from "../common/constants";
import colors from "../common/colors";
import {Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import {shadowStyle} from "../common/styles";

class ActionButton extends Component {
    render() {
        const {position, containerStyle, btnStyle, onAction, icon, showText, text} = this.props;

        return (
            <View style={[styles.container, position]} pointerEvents="box-none">
                <View style={[shadowStyle, styles.contentContainer, containerStyle]}>
                    <TouchableOpacity activeOpacity={ActiveOpacity}
                                      style={[styles.button, btnStyle]}
                                      onPress={onAction}>
                        {
                            icon
                        }
                        {
                            showText ?
                                <Text style={styles.text}>
                                    {text}
                                </Text> : null
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ActionButton;

ActionButton.PropTypes = {
    onAction: PropTypes.func.isRequired,
    icon: PropTypes.object.isRequired,
    showText: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

ActionButton.defaultProps = {
    icon: <Icon type={IconType.Ionicon} name="md-star" size={30} color={colors.yellow}/>,
    showText: true,
    text: '',
};

const Size = 40;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        backgroundColor: colors.transparent,
    },
    contentContainer: {
        width: Size,
        height: Size,
    },
    button: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 12,
    }
});