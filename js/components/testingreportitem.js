'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ActiveOpacity} from "../common/constants";

class TestingReportItem extends Component{
    render() {
        const {onAction} = this.props;

        return (
            <TouchableOpacity activeOpacity={ActiveOpacity}
                              onPress={onAction}
                              style={styles.container}>
                <Text>
                    检测报告
                </Text>
            </TouchableOpacity>
        );
    }
}

export default TestingReportItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});