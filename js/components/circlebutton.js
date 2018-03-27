'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from "./actionbutton";
import {Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import PropTypes from 'prop-types';
import colors from '../common/colors';

export class CloseButton extends Component {
    static propTypes = {
        onAction: PropTypes.func.isRequired,
    };

    render() {
        const {position, onAction, buttonColor} = this.props;

        return (
            <ActionButton showText={false}
                          icon={<Icon type={IconType.Ionicon} name="md-close" size={22} color={buttonColor || colors.white}/>}
                          onAction={onAction}
                          position={position}
                          containerStyle={styles.actionButtonContainerStyle}
                          btnStyle={styles.actionButtonStyle} />
        );
    }
}

export class QuestionButton extends Component {
    static propTypes = {
        onAction: PropTypes.func.isRequired,
    };

    render() {
        const {position, onAction} = this.props;

        return (
            <ActionButton showText={false}
                          icon={<Icon type={IconType.Ionicon} name="md-help" size={22} color={colors.white}/>}
                          onAction={onAction}
                          position={position}
                          containerStyle={styles.actionButtonContainerStyle}
                          btnStyle={styles.actionButtonStyle}/>
        );
    }
}

export const styles = StyleSheet.create({
    actionButtonContainerStyle: {
        width: 30,
        height: 30,
    },
    actionButtonStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
    },
});
