import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, Icon} from 'react-native-elements';
import colors from "../common/colors";
import CPAScanButton from "../components/scanbutton";
import KeyValPair from "../components/keyvalpair";
import {ScreenKey} from "../common/constants";
import Banner from "../components/banner";
import ActionButton from "../components/actionbutton";
import {IconType} from "../common/icons";

export default class CPAChargingPage extends Component{
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
        const {navigate} = this.props.navigation;
        navigate && navigate(ScreenKey.Scan);
    };

    _startBatteryTesting = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate(ScreenKey.BatteryTesting);
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


export class CPABatteryTestingPage extends Component {
    _back = () => {
        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    _startBatteryTesting = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate(ScreenKey.Scan);
    };

    render() {
        const {totalTestingCostMoney, totalTestingTime, totalTestingElec, totalTestingNumberOfTimes} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.chargingInfoContainer}>
                    <View style={styles.chargingInfoTopContainer}>
                        <KeyValPair title='总检测金额(元)'
                                    val={totalTestingCostMoney}
                                    titleStyle={styles.titleStyle1} valueStyle={styles.valueStyle1}/>
                    </View>
                    <View style={styles.chargingInfoBottomContainer}>
                        <KeyValPair title='电池寿命(小时)'
                                    val={totalTestingTime}
                                    containerStyle={styles.itemContainer}/>
                        <Divider style={styles.divider}/>
                        <KeyValPair title='检测问题(个)'
                                    val={totalTestingElec}
                                    containerStyle={styles.itemContainer}/>
                        <Divider style={styles.divider}/>
                        <KeyValPair title='总检测次数(次)'
                                    val={totalTestingNumberOfTimes}
                                    containerStyle={styles.itemContainer}/>
                    </View>
                </View>

                <View style={styles.chargingActionContainer}>
                    <CPAScanButton title='扫码检测'
                                   onScan={this._startBatteryTesting}
                                   btnStyle={styles.testingBtnStyle} />
                </View>

                <ActionButton showText={false}
                              icon={<Icon type={IconType.Ionicon} name="md-close" size={20} color={colors.grey}/>}
                              onAction={this._back}
                              position={styles.closePosition}
                              containerStyle={styles.closeContainerStyle}
                              btnStyle={styles.closeBtnStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chargingInfoContainer: {
        height: 200,
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
        top: 10,
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