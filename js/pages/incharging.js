'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import KeyValPair from "../components/keyvalpair";
import {CircularProgress} from 'react-native-circular-progress';
import {Button} from "react-native-elements";
import colors from "../common/colors";
import {screenWidth} from "../common/constants";
import {connect} from "react-redux";
import {doFinishCharging} from "../redux/chargingactions";

class CPAInChargingPage extends Component {
    render() {
        const {progress, soc, costMoney, chargingElec,
            costTime, restTime, voltage, electric, finishCharging} = this.props;
        const kvstyles = {
            containerStyle: styles.containerStyle,
            titleStyle: styles.titleStyle,
            valueStyle: styles.valStyle
        };




        return (
            <View style={styles.container}>
                <CircularProgress size={180}
                                  width={10}
                                  prefill={0}
                                  fill={progress}
                                  rotation={0}
                                  style={styles.progress}
                                  tintColor={colors.theme1}
                                  backgroundColor={colors.grey3}
                                  linecap="round">
                    {
                        (fill) => (
                            <View style={styles.progressContentContainer}>
                                <Text style={styles.progressText}>
                                    {fill} %
                                </Text>
                                <Text>
                                    充电进度
                                </Text>
                            </View>
                        )
                    }
                </CircularProgress>


                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="当前SOC" val={`${soc} %`} {...kvstyles} />
                    <KeyValPair horizontal={true} title="充电金额" val={`${costMoney} 元`} {...kvstyles}/>
                </View>
                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="充电电量" val={`${chargingElec} 度`} {...kvstyles}/>
                    <KeyValPair horizontal={true} title="充电时间" val={`${costTime} 分钟`} {...kvstyles}/>
                </View>
                <View style={styles.infoContainer}>
                    <KeyValPair horizontal={true} title="电流" val={`${electric} A`} {...kvstyles}/>
                    <KeyValPair horizontal={true} title="电压" val={`${voltage} V`} {...kvstyles}/>
                </View>



                <View style={styles.buttonContainer}>
                    <Button title="结束充电"
                            buttonStyle={styles.button}
                            onPress={() => {finishCharging && finishCharging()}}/>
                </View>
            </View>
        );
    }
}



function mapStateToProps(state) {
    console.log("待处理的costMoney:"+state.charging.costMoney)
    console.log("待处理的chargingElec:"+state.charging.chargingElec)
    console.log("待处理的costTime:"+state.charging.costTime)
    console.log("待处理的electric:"+state.charging.electric)

    let costMoney=(state.charging.costMoney/100).toFixed(2);
    let chargingElec=(state.charging.chargingElec/1000).toFixed(2);
    let costTime=(state.charging.costTime/60).toFixed(0);
    let electric=(state.charging.electric/10).toFixed(1);

    return {
        progress: state.charging.progress,
        soc: state.charging.soc,
        costMoney: costMoney,
        chargingElec: chargingElec,
        costTime: costTime,
        restTime: state.charging.restTime,
        voltage: state.charging.voltage,
        electric: electric,
    }
}

function mapDispatchToProps(dispatch) {
    return {
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
    progressContentContainer: {
        alignItems: 'center',
    },
    progressText: {
        fontSize: 36,
        color: colors.theme1,
    },
    containerStyle: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    titleStyle: {
        fontSize: 16,
        width: 80,
        color: colors.grey3,
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