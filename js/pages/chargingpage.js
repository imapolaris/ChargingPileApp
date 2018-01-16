import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, Icon} from 'react-native-elements';
import colors from "../common/colors";
import CPAScanButton from "../components/scanbutton";
import KeyValPair from "../components/keyvalpair";
import {ScreenKey, STATUSBAR_HEIGHT} from "../common/constants";
import Banner from "../components/banner";
import ActionButton from "../components/actionbutton";
import {IconType} from "../common/icons";
import {connect} from "react-redux";
import {doNav} from "../redux/navactions";

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

    _startCharging = () => {
        const {nav} = this.props;
        nav && nav(ScreenKey.Scan);
    };

    _startBatteryTesting = () => {
        const {nav} = this.props;
        nav && nav(ScreenKey.BatteryTesting);
    };

    render() {
        const {totalCostMoney, totalTime, totalElec, totalNumberOfTimes} = this.props;

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
                    <CPAScanButton onScan={this._startCharging} />

                    <Banner label="去给电池做个检测吧！"
                            onAction={this._startBatteryTesting}
                            position={styles.bannerPosition}
                            btnStyle={styles.bannerBtnStyle} />
                </View>
            </View>
        );
    }
}

export function mapStateToProps(state) {
    return state;
}

export function mapDispatchToProps(dispatch) {
    return {
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
    closePosition: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 10+STATUSBAR_HEIGHT,
    },
    closeContainerStyle: {
        width: 30,
        height: 30,
    },
    closeBtnStyle: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 15,
    },
    testingBtnStyle: {
        backgroundColor: colors.limegreen,
    },
});