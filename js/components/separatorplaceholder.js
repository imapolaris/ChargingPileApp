'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

class SeparatorPlaceHolder extends Component{
    render() {
        return (
            <View style={styles.separator} />
        );
    }
}

export default SeparatorPlaceHolder;

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});