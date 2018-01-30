'use strict';

import React, {Component} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {CloseButton} from "./circlebutton";
import {STATUSBAR_HEIGHT} from "../common/constants";
import colors from "../common/colors";

class Information extends Component{
    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    render() {
        const {visible} = this.state;
        const {children, containerStyle} = this.props;

        return (
            <Modal animationType={'slide'}
                   transparent={true}
                   visible={visible}
                   onShow={() => {}}
                   onRequestClose={() => {}}>
                <View style={[styles.container, containerStyle]}>
                    {children}

                    <CloseButton onAction={()=>{this.setState({visible:false})}}
                                 position={styles.closePosition}
                                 buttonColor={colors.white} />
                </View>
            </Modal>
        );
    }

    show = () => {
        this.setState({visible: true});
    }
}

export default Information;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    closePosition: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 10+STATUSBAR_HEIGHT,
    },
});