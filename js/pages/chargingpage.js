import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider} from 'react-native-elements';
import colors from "../common/colors";
import CPAScanButton from "../components/scanbutton";
import KeyValPair from "../components/keyvalpair";
import {ScreenKey} from "../common/constants";

class CPAChargingPage extends Component{
    _startCharging = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate(ScreenKey.Scan);
    };

    _startBatteryTesting = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.chargingInfoContainer}>
                    <View style={styles.chargingInfoTopContainer}>
                        <KeyValPair title='总充电金额(元)'
                                    val={this.props.totalCostMoney}
                                    titleStyle={styles.titleStyle1} valueStyle={styles.valueStyle1} />
                    </View>
                    <View style={styles.chargingInfoBottomContainer}>
                        <KeyValPair title='总时长(分)'
                                    val={this.props.totalTime}
                                    containerStyle={styles.itemContainer} />
                        <Divider style={styles.divider} />
                        <KeyValPair title='总充电量(度)'
                                    val={this.props.totalElec}
                                    containerStyle={styles.itemContainer} />
                        <Divider style={styles.divider} />
                        <KeyValPair title='总充电次数(次)'
                                    val={this.props.totalNumberOfTimes}
                                    containerStyle={styles.itemContainer} />
                    </View>
                </View>

                <View style={styles.chargingActionContainer}>
                    <CPAScanButton onScan={this._startCharging} />
                </View>
            </View>
        );
    }
}

export default CPAChargingPage;

CPAChargingPage.PropTypes = {
    totalCostMoney: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired,
    totalElec: PropTypes.number.isRequired,
    totalNumberOfTimes: PropTypes.number.isRequired,
};

CPAChargingPage.defaultProps = {
    totalCostMoney: 0.0,
    totalTime: 0,
    totalElec: 0,
    totalNumberOfTimes: 0,
};

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
    }
});