'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import KeyValPair from "../components/keyvalpair";
import {CircularProgress} from 'react-native-circular-progress';
import {Button} from "react-native-elements";
import colors from "../common/colors";
import {screenWidth} from "../common/constants";
import {connect} from "react-redux";
import {doFinishCharging, doQueryChargingRealtimeInfo} from "../redux/chargingactions";

class CPAInChargingPage extends Component {
    render() {
        const {progress, soc, costMoney, chargingElec, costTime, restTime, voltage, electric} = this.props;
        const kvstyles = {
            containerStyle: styles.containerStyle,
            titleStyle: styles.titleStyle,
            valueStyle: styles.valStyle
        };

        return (
            <View style={styles.container}>
                <CircularProgress size={200}
                                  width={10}
                                  prefill={0}
                                  fill={progress}
                                  rotation={0}
                                  style={styles.progress}
                                  tintColor={colors.primary1}
                                  backgroundColor={colors.grey3}
                                  linecap="round">
                    {
                        (fill) => (
                            <Text style={styles.progressText}>
                                {fill} %
                            </Text>
                        )
                    }
                </CircularProgress>

                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="当前SOC" val={`${soc} %`} {...kvstyles} />
                    <KeyValPair horizontal={true} title="充电金额" val={`${costMoney} 元`} {...kvstyles}/>
                </View>
                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="充电电量" val={`${chargingElec} 度`} {...kvstyles}/>
                    <KeyValPair horizontal={true} title="充电时间" val={`${costTime} 分`} {...kvstyles}/>
                </View>
                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="剩余时间" val={`${restTime} 分`} {...kvstyles}/>
                    <KeyValPair horizontal={true} title="电压" val={`${voltage} V`} {...kvstyles}/>
                </View>
                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="电流" val={`${electric} A`} {...kvstyles}/>
                    <KeyValPair horizontal={true} title=" " val=" " {...kvstyles}/>
                </View>


                <View style={styles.buttonContainer}>
                    <Button title="结束充电"
                            buttonStyle={styles.button}
                            onPress={() => {
                                alert('结束充电')
                            }}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        progress: state.charging.progress,
        soc: state.charging.soc,
        costMoney: state.charging.costMoney,
        chargingElec: state.charging.chargingElec,
        costTime: state.charging.costTime,
        restTime: state.charging.restTime,
        voltage: state.charging.voltage,
        electric: state.charging.electric,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryChargingRealtimeInfo: () => dispatch(doQueryChargingRealtimeInfo()),
        finishCharging: () => dispatch(doFinishCharging()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAInChargingPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 36,
        color: colors.theme1,
    },
    containerStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    titleStyle: {
        fontSize: 16,
        minWidth: 90,
        color: colors.grey2,
    },
    valStyle: {
        color: colors.limegreen,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        width: screenWidth-30,
    }
});