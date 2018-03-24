'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {shadowStyle} from "../common/styles";
import colors from "../common/colors";
import {ActiveOpacity, screenWidth} from "../common/constants";
import {Icon} from "react-native-elements";
import {IconType} from "../common/icons";

class Banner extends Component{
    render() {
        const {label, onAction, position, containerStyle, btnStyle, textStyle} = this.props;

        return (
            <View style={[styles.container, position]} pointerEvents='box-none'>
                <View style={[shadowStyle, styles.contentContainer, containerStyle]}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.text, textStyle]}>
                            {label}
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.button, btnStyle]}
                                      activeOpacity={ActiveOpacity}
                                      onPress={onAction}>
                        <Icon type={IconType.Ionicon} name="md-arrow-forward" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Banner;

Banner.propTypes = {
    label: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
    },
    contentContainer: {
        flexDirection: 'row',
        height: 40,
        width: screenWidth-20,
        backgroundColor: colors.theme1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        elevation: 4,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.tintColor2,
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    text: {
        fontSize: 16,
        color: colors.white,
    }
});