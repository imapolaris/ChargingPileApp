'use strict';

import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {ActiveOpacity, AndroidPlatform} from "../common/constants";
import colors from "../common/colors";
import KeyValPair from "./keyvalpair";

class TestingReportItem extends Component{
    render() {
        const {onAction} = this.props;
        const kvStyle = {containerStyle: styles.containerStyle, titleStyle: styles.titleStyle, valueStyle: styles.valStyle};
        const {checkDate, vehicle, result} = this.props;

        return (
            <View style={styles.container}>
                <Text style={{margin: 5, color: colors.grey3}}>
                    检测时间：{checkDate}
                </Text>
                <View style={styles.wholeContainer}>
                    <ImageBackground style={styles.imageBg}>
                        <Text style={styles.imageText}>
                            检测{'\r\n'}报告
                        </Text>
                    </ImageBackground>
                    <View style={styles.contentContainer}>
                        <KeyValPair showDivider={false} horizontal={true} title="检测车辆" val={vehicle} {...kvStyle}/>
                        <KeyValPair showDivider={false} horizontal={true} title="检测结果" val={result} {...kvStyle}/>
                    </View>
                    <TouchableOpacity style={styles.detailBtn}
                                      activeOpacity={ActiveOpacity}
                                      onPress={onAction}>
                        <Text style={styles.detailTxt}>
                            详情
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default TestingReportItem;

const styles = StyleSheet.create({
    container: {

    },
    wholeContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderWidth: Platform.OS === AndroidPlatform ? 0.25 : 0,
        borderColor: '#c3c3c3',
        alignItems: 'center',
        padding: 10,
    },
    imageBg: {
        width: 80,
        height: 80,
        backgroundColor: colors.grey5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageText: {
        fontSize: 18,
        color: colors.theme1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    containerStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    titleStyle: {
        color: colors.grey3,
        width: 80,
        fontSize: 14,
    },
    valStyle: {
        color: colors.grey0,
        fontSize: 14,
    },
    detailBtn: {
        height: 50,
        width: 50,
        backgroundColor: colors.theme1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    detailTxt: {
        color: colors.white,
    },
});