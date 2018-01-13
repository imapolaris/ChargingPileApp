import React, {Component} from 'react';
import {View} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import colors from "../common/colors";
import CPAScanButton from "../components/scanbutton";
import KeyValPair from "../components/keyvalpair";
import {ScreenKey} from "../common/constants";
import ActionButton from "../components/actionbutton";
import {IconType} from "../common/icons";
import {connect} from "react-redux";
import {styles, mapDispatchToProps, mapStateToProps} from './chargingpage';

class CPABatteryTestingPage extends Component {
    _back = () => {
        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    _startBatteryTesting = () => {
        const {nav} = this.props;
        nav && nav(ScreenKey.Scan);
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

export default connect(mapStateToProps, mapDispatchToProps)(CPABatteryTestingPage);