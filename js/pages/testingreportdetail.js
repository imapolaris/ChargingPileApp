'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import KeyValPair from "../components/keyvalpair";
import colors from "../common/colors";
import {Divider} from "react-native-elements";
import {screenWidth} from "../common/constants";

class CPATestingReportDetailPage extends Component{
    render() {
        const kvStyle = {horizontal: true, showDivider: true,
            containerStyle: styles.containerStyle, titleStyle: styles.titleStyle, valueStyle: styles.valStyle};

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    检测报告
                </Text>
                <Divider style={styles.divider} />

                <View style={styles.contentContainer}>
                    <KeyValPair title="电池容量" {...kvStyle}/>
                    <KeyValPair title="DCR测试" {...kvStyle}/>
                    <KeyValPair title="CAN通信" {...kvStyle}/>
                    <KeyValPair title="绝缘阻抗" {...kvStyle}/>
                    <KeyValPair title="单体温度" {...kvStyle}/>
                    <KeyValPair title="单体温升" {...kvStyle}/>
                    <KeyValPair title="总电压最大差值" {...kvStyle}/>
                    <KeyValPair title="总电流最大差值" {...kvStyle}/>
                </View>
            </View>
        );
    }
}

export default connect(state=>state)(CPATestingReportDetailPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        color: colors.theme1,
        padding: 15,
    },
    divider: {
        backgroundColor: colors.theme1,
        width: screenWidth-80,
    },
    contentContainer: {
        paddingTop: 15,
        justifyContent: 'center',
    },
    containerStyle: {
        margin: 5,
        padding: 5,
        height: 40,
        width: 250,
    },
    titleStyle: {
        color: colors.grey3,
        width: 150,
        fontSize: 14,
    },
    valStyle: {
        color: colors.grey0,
        fontSize: 14,
    },
});