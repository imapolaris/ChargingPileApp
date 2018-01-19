import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import CPAScanButton from "../components/scanbutton";
import KeyValPair from "../components/keyvalpair";
import {ScreenKey} from "../common/constants";
import {connect} from "react-redux";
import {styles} from './chargingpage';
import Information from "../components/information";
import {CloseButton, QuestionButton} from "../components/circlebutton";
import colors from "../common/colors";
import {doQueryBatteryTestingInfo, startScan} from "../redux/batterytestingactions";

class CPABatteryTestingPage extends Component {
    static defaultProps = {
        totalTestingCostMoney: 0,
        totalTestingTime: 0,
        totalTestingElec: 0,
        totalTestingNumberOfTimes: 0,
    };

    componentDidMount() {
        const {queryBatteryTestingInfo} = this.props;
        queryBatteryTestingInfo && queryBatteryTestingInfo();
    }

    _showInfo = () => {
        this._information.show();
    };

    _back = () => {
        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    _startScan = () => {
        const {nav} = this.props;
        nav && nav(ScreenKey.Scan);
    };

    _renderFlowInfo = () => {
        return (
            <View style={flowStyles.infoContainer}>
                <Text style={flowStyles.text}>
                    a)	首先确保车辆SOC小于30%；{'\r\n'}
                    b)	车辆关闭电源，静置1小时；{'\r\n'}
                    c)	连接充电枪与车辆充电底座，启动充电，在输出电流前记录电池端最高单体电压U0；{'\r\n'}
                    d)	车辆电池系统充电至100%SOC；{'\r\n'}
                    e)	根据安时积分法算出累计充电容量C0；{'\r\n'}
                    f)	使用图1-图3的SOC_OCV曲线表，基于U0值，估算初始SOC值S；{'\r\n'}
                    g)	根据公式C0/（1-S），计算电池系统容量C。
                </Text>
            </View>
        )
    };

    render() {
        const {
            totalTestingCostMoney, totalTestingTime,
            totalTestingElec, totalTestingNumberOfTimes
        } = this.props;


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
                                   onScan={this._startScan}
                                   btnStyle={styles.testingBtnStyle}/>
                </View>

                <QuestionButton onAction={this._showInfo} position={styles.questionPosition}/>
                <CloseButton onAction={this._back} position={styles.closePosition}/>

                <Information ref={self => this._information = self}>
                    {this._renderFlowInfo()}
                </Information>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryBatteryTestingInfo: () => dispatch(doQueryBatteryTestingInfo()),
        startScan: () => dispatch(startScan()),
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(CPABatteryTestingPage);

const flowStyles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
    text: {
        fontSize: 16,
        color: colors.white,
        lineHeight: 30,
    }
});