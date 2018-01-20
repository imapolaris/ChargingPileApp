import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, Icon} from 'react-native-elements';
import colors from "../common/colors";
import ScanButton from "../components/scanbutton";
import KeyValPair from "../components/keyvalpair";
import {AppStatus, ScreenKey, STATUSBAR_HEIGHT} from "../common/constants";
import Banner from "../components/banner";
import {IconType} from "../common/icons";
import {connect} from "react-redux";
import {doNav} from "../redux/navactions";
import {doQueryChargingInfo, doStartScanCharging} from "../redux/chargingactions";

class CPAChargingPage extends Component{
    static propTypes = {
        totalCostMoney: PropTypes.number.isRequired,
        totalTime: PropTypes.number.isRequired,
        totalElec: PropTypes.number.isRequired,
        totalNumberOfTimes: PropTypes.number.isRequired,
    };

    static defaultProps = {
        totalCostMoney: 0.0,
        totalTime: 0,
        totalElec: 0,
        totalNumberOfTimes: 0,
    };

    _startBatteryTesting = () => {
        const {nav} = this.props;
        nav && nav(ScreenKey.BatteryTesting);
    };

    render() {
        const {totalCostMoney, totalTime, totalElec, totalNumberOfTimes,
            startScan, appStatus, nav} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.chargingInfoContainer}>
                    <View style={styles.chargingInfoTopContainer}>
                        <KeyValPair title='总充电金额(元)'
                                    val={totalCostMoney}
                                    titleStyle={styles.titleStyle1} valueStyle={styles.valueStyle1} />
                    </View>
                    <View style={styles.chargingInfoBottomContainer}>
                        <KeyValPair title='总时长(分)'
                                    val={totalTime}
                                    containerStyle={styles.itemContainer} />
                        <Divider style={styles.divider} />
                        <KeyValPair title='总充电量(度)'
                                    val={totalElec}
                                    containerStyle={styles.itemContainer} />
                        <Divider style={styles.divider} />
                        <KeyValPair title='总充电次数(次)'
                                    val={totalNumberOfTimes}
                                    containerStyle={styles.itemContainer} />
                    </View>
                </View>

                <View style={styles.chargingActionContainer}>
                    {
                        appStatus === AppStatus.Normal ?
                            <ScanButton onAction={()=>{startScan && startScan()}} />
                            :
                            appStatus === AppStatus.Charging ?
                                <ScanButton onAction={()=>{nav && nav(ScreenKey.InCharging)}}
                                            title="查看充电详情"
                                            icon={<Icon type={IconType.Ionicon} name="md-battery-charging" size={35} color={colors.white} />}
                                />
                                :
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        正在进行电池检测
                                    </Text>
                                </View>
                    }

                    {
                        appStatus === AppStatus.Normal ?
                            <Banner label="去给电池做个检测吧！"
                                    onAction={this._startBatteryTesting}
                                    position={styles.bannerPosition}
                                    btnStyle={styles.bannerBtnStyle} />
                            : null
                    }
                </View>
            </View>
        );
    }
}

export function mapStateToProps(state) {
    return {
        balance: state.wallet.balance,
        totalCostMoney: state.charging.totalCostMoney,
        totalTime: state.charging.totalTime,
        totalElec: state.charging.totalElec,
        totalNumberOfTimes: state.charging.totalNumberOfTimes,
        appStatus: state.app.status,
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        queryChargingInfo: () => dispatch(doQueryChargingInfo()),
        startScan: (sn) => dispatch(doStartScanCharging()),
        nav: (screenKey) => dispatch(doNav(screenKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAChargingPage);

export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    chargingInfoContainer: {
        height: 200+STATUSBAR_HEIGHT,
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: colors.theme1,
    },
    chargingInfoTopContainer: {
        flex: 6,
    },
    chargingInfoBottomContainer: {
        flex: 4,
        flexDirection: 'row',
    },
    itemContainer: {
        flex: 1,
    },
    chargingActionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle1: {
        fontSize: 20,
    },
    valueStyle1: {
        fontSize: 40,
    },
    divider: {
        width: 1,
        height: 40,
        marginTop: 20,
        backgroundColor: colors.white,
    },
    bannerPosition: {
        justifyContent: "flex-start",
        alignItems: 'center',
        bottom: 0,
        left: 10,
        right: 10,
        top: 10,
    },
    bannerBtnStyle: {
        backgroundColor: colors.limegreen,
    },
    questionPosition: {
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        bottom: 0,
        left: 10,
        right: 0,
        top: 10+STATUSBAR_HEIGHT,
    },
    closePosition: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 10+STATUSBAR_HEIGHT,
    },
    actionButtonContainerStyle: {
        width: 30,
        height: 30,
    },
    actionButtonStyle: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 15,
    },
    testingBtnStyle: {
        backgroundColor: colors.limegreen,
    },
    textContainer: {
        height: 100,
        width: 220,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: colors.theme1,
    },
    text: {
        fontSize: 18,
        color: colors.tintColor,
    }
});