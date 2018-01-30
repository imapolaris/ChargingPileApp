'use strict';

import React, {Component} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {maskStyle} from "../common/styles";
import CPAActiveIndicator from "./activeindicator";

class WaitingNotice extends Component{
    render() {
        const {visible, containerStyle} = this.props;

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onShow={() => {}}
                onRequestClose={() => {}}>

                <View style={[styles.container, maskStyle, containerStyle]}>
                    <CPAActiveIndicator {...this.props} />
                </View>
            </Modal>
        );
    }
}

export default WaitingNotice;

WaitingNotice.propTypes = {
    visible: PropTypes.bool.isRequired,
};

WaitingNotice.defaultProps = {
    visible: false,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0)',
    }
});