'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from "react-redux";
import KeyValPair from "../components/keyvalpair";
import colors from "../common/colors";
import {Divider} from "react-native-elements";
import {screenWidth} from "../common/constants";
import {doQueryBatteryTestingReportDetail} from "../redux/batterytestingactions";

class CPATestingReportDetailPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            capacity: 0.0,
            dcr: 0.0,
            can: '正常',
            ir: '正常',
            temp: 0.0,
            tempup: 0.0,
            vdiff: 0.0,
            adiff: 0.0,
            proposal: '无',
        };
    }

    componentDidMount() {
        this._queryBatteryTestingReportDetail();
    }

    _queryBatteryTestingReportDetail = () => {
        const {queryBatteryTestingReportDetail} = this.props;

        const {reportId} = this.props.navigation.state.params;
        if (reportId) {
            queryBatteryTestingReportDetail(reportId)
                .then(ret=>{
                    if (ret.result) {
                        let data = ret.data;
                        this.setState({
                            capacity: data.capacity,
                            dcr: data.dcr,
                            can: data.can,
                            ir: data.ir,
                            temp: data.temp,
                            tempup: data.tempup,
                            vdiff: data.vdiff,
                            adiff: data.adiff,
                            proposal: data.proposal,
                        });
                    }
                });
        }
    };

    render() {
        const kvStyle = {horizontal: true, showDivider: true,
            containerStyle: styles.containerStyle, titleStyle: styles.titleStyle, valueStyle: styles.valStyle};

        const {capacity, dcr, can, ir, temp, tempup, vdiff, adiff, proposal} = this.state;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    检测报告
                </Text>
                <Divider style={styles.divider} />

                <View style={styles.contentContainer}>
                    <KeyValPair title="电池容量" val={capacity} {...kvStyle}/>
                    <KeyValPair title="DCR测试" val={dcr} {...kvStyle}/>
                    <KeyValPair title="CAN通信" val={can} {...kvStyle}/>
                    <KeyValPair title="绝缘阻抗" val={ir} {...kvStyle}/>
                    <KeyValPair title="单体温度" val={temp} {...kvStyle}/>
                    <KeyValPair title="单体温升" val={tempup} {...kvStyle}/>
                    <KeyValPair title="总电压最大差值" val={vdiff} {...kvStyle}/>
                    <KeyValPair title="总电流最大差值" val={adiff} {...kvStyle} showDivider={false}/>
                </View>

                <Divider style={styles.divider} />
                <Text style={styles.proposal}>
                    建议： {proposal}。
                </Text>
            </ScrollView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryBatteryTestingReportDetail: (reportId) => dispatch(doQueryBatteryTestingReportDetail(reportId)),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPATestingReportDetailPage);

const styles = StyleSheet.create({
    container: {
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
    proposal: {
        width: screenWidth-80,
        margin: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 10,
        color: colors.theme1,
        fontSize: 15,
    },
});