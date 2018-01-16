'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import {ActiveOpacity, screenWidth} from "../common/constants";
import colors from "../common/colors";
import CPARadioButton from "../components/radiobutton";
import KeyValPair from "../components/keyvalpair";
import {connect} from "react-redux";
import {doPayByWx, doPayByZfb, doQueryWalletInfo} from "../redux/actions";

const Moneys1 = [{key: 0, val:500}, {key: 1, val:200}, {key: 2, val:100}];
const Moneys2 = [{key: 3, val:50}, {key: 4, val:20}, {key: 5, val:10}];
class CPAWalletPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            wxChecked: false,
            zfbChecked: true,
            money: 0,
            selectedIndex: -1,
        };
    }

    componentDidMount() {
        const {queryWalletInfo} = this.props;
        queryWalletInfo && queryWalletInfo();
    }

    _onPayWayChanged = (payWay) => {
        if (payWay === 'wx') {
            this.setState({
                wxChecked: true,
                zfbChecked: false,
            });
        } else {
            this.setState({
                wxChecked: false,
                zfbChecked: true,
            });
        }
    };

    _onCharge = () => {
        let {money, wxChecked} = this.state;
        const {payByWx, payByZfb} = this.props;

        money = 0.01;
        console.log(`money:${money}`);
        if (wxChecked) {
            payByWx && payByWx(money);
        } else {
            payByZfb && payByZfb(money);
        }
    };

    _renderItem = (item)=>{
        const {selectedIndex} = this.state;

        return (
            <TouchableOpacity key={item.key}
                              style={[styles.moneyItem, selectedIndex === item.key ? styles.chargeMoneyItem : null]}
                              activeOpacity={ActiveOpacity}
                              onPress={()=>{
                                  this.setState({
                                      selectedIndex: item.key,
                                      money: item.val,
                                  });
                              }}>
                <Text style={[styles.moneyItemText, selectedIndex === item.key ? styles.chargeMoneyItemText : null]}>
                    {item.val} 元
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        const {balance} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.balanceContainer}>
                    <KeyValPair title="余额(元)" val={balance}
                                titleStyle={styles.label}
                                valueStyle={styles.money} />
                </View>

                <View style={styles.payContainer}>
                    <View style={styles.moneyContainer}>
                        {
                            Moneys1.map((item)=>{
                                return this._renderItem(item);
                            })
                        }
                    </View>
                    <View style={styles.moneyContainer}>
                        {
                            Moneys2.map((item)=>{
                                return this._renderItem(item);
                            })
                        }
                    </View>

                    <View style={styles.payWayContainer}>
                        <Text>
                            充值方式：
                        </Text>

                        <View style={styles.checkboxContainer}>
                            <CPARadioButton onChecked={()=>this._onPayWayChanged('zfb')} checked={this.state.zfbChecked}
                                            image={<Image source={require('../assets/images/zfb.png')}/>}
                                            title="支付宝支付" style={{height: 50}}/>
                            <CPARadioButton onChecked={()=>this._onPayWayChanged('wx')} checked={this.state.wxChecked}
                                            image={<Image source={require('../assets/images/wx.png')}/>}
                                            title="微信支付"/>
                        </View>
                    </View>

                    <View style={styles.submitButtonContainer}>
                        <Button title="充值"
                                buttonStyle={styles.submitButton}
                                onPress={this._onCharge}
                                disabledStyle={{backgroundColor: colors.grey3}}
                                disabled={this.state.money <= 0} />
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        balance: state.wallet.balance,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryWalletInfo: () => dispatch(doQueryWalletInfo()),
        payByWx: (money) => dispatch(doPayByWx(money)),
        payByZfb: (money) => dispatch(doPayByZfb(money)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAWalletPage);

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    balanceContainer:{
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        margin: 5,
    },
    label:{
        fontSize:  16,
        color: colors.grey0,
    },
    money:{
        fontSize: 40,
        color: '#FF0000',
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
    },
    payContainer: {
        flex: 3,
        flexDirection: 'column',
        padding: 5,
    },
    moneyContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    moneyItem: {
        height: 45,
        width: 100,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    chargeMoneyItem:{
        borderColor: colors.primary1,
        borderWidth: 1,
    },
    moneyItemText:{
        fontSize: 16,
        alignSelf: 'center',
    },
    chargeMoneyItemText:{
        color: colors.primary1,
    },
    payWayContainer:{
        flexDirection: 'column',
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    checkboxContainer:{
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
        marginTop: 10,
    },
    submitButtonContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton:{
        width: screenWidth-20,
    },
});