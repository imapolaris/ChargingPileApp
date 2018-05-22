'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import KeyValPair from "../components/keyvalpair";
import colors from "../common/colors";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {doBack} from "../redux/navactions";
import {doQueryCurrentChargingBilling} from "../redux/chargingactions";
import {doChangeAppStatus} from "../redux/appactions";
import {AppStatus} from '../common/constants';

class CPAChargingBillingPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            elec: 0.0,
            costTime: '0',
            costMoney: 0,
        };
    }

    componentDidMount() {
        const {queryCurrentChargingBilling} = this.props;
        queryCurrentChargingBilling && queryCurrentChargingBilling()
            .then(ret=>{
                if (ret) {
                    this.setState({
                        elec: ret.elec,
                        costTime: ret.costTime,
                        costMoney: ret.costMoney,
                    });
                }
            })
    }

    componentWillUnmount() {
        //const {changeAppStatus} = this.props;
        //changeAppStatus && changeAppStatus(AppStatus.Normal);
    }

    render() {
        const kvStyle = {containerStyle: styles.kvContainerStyle, titleStyle: styles.titleStyle, valueStyle: styles.valueStyle};
        const {back} = this.props;
        const {elec, costTime, costMoney} = this.state;

        return (
        <View style={styles.container}>
                <Text style={styles.title}>你已结束充电</Text>

                <Text style={styles.title1}>本次账单</Text>

                <View style={styles.contentContainer}>
                    <KeyValPair horizontal={true} showDivider={false} title="充电量(A)" val={elec} {...kvStyle} />
                    <KeyValPair horizontal={true} showDivider={false} title="充电时长" val={costTime} {...kvStyle} />
                    <KeyValPair horizontal={true} showDivider={false} title="充电费用(元)" val={costMoney} {...kvStyle} />
                </View>

                <Button title="确认"
                        buttonStyle={styles.button}
                        containerViewStyle={styles.buttonContainer}
                        onPress={()=>back && back()} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        back: (screenKey) => dispatch(doBack()),
        queryCurrentChargingBilling: () => dispatch(doQueryCurrentChargingBilling()),
        changeAppStatus: (status) => dispatch(doChangeAppStatus(status)),
    }
}

export default connect((state)=>state, mapDispatchToProps)(CPAChargingBillingPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginTop: 15,
    },
    title1: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15,
    },
    contentContainer: {
        marginTop: 30,
        height: 150,
    },
    kvContainerStyle: {
        backgroundColor: colors.grey5,
        width: 280,
        marginTop: 5,
        borderRadius: 25,
    },
    titleStyle: {
        fontSize: 15,
        color: colors.grey2,
        marginLeft: 30,
        width: 100,
    },
    valueStyle: {
        color: colors.primary1,
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    buttonContainer: {
        marginTop: 30,
    },
    button: {
        width: 280,
    }
});