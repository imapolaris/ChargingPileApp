'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import {ActiveOpacity, screenWidth} from "../common/constants";
import colors from "../common/colors";
import CPARadioButton from "../components/radiobutton";
import KeyValPair from "../components/keyvalpair";

const Moneys1 = [{key: 0, val:500}, {key: 1, val:200}, {key: 2, val:100}];
const Moneys2 = [{key: 3, val:50}, {key: 4, val:20}, {key: 5, val:10}];
class CPAWalletPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            wxChecked: true,
            zfbChecked: false,
            money: 0,
            selectedIndex: -1,
            balance: 0,
        };
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

    _renderItem = (item)=>{
        return (
            <TouchableOpacity key={item.key}
                              style={[styles.moneyItem, this.state.selectedIndex === item.key ? styles.chargeMoneyItem : null]}
                              activeOpacity={ActiveOpacity}
                              onPress={()=>{
                                  this.setState({
                                      ...this.state,
                                      selectedIndex: item.key,
                                      money: item.val,
                                  });
                              }}>
                <Text style={[styles.moneyItemText, this.state.selectedIndex === item.key ? styles.chargeMoneyItemText : null]}>
                    {item.val} 元
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.balanceContainer}>
                    <KeyValPair title="余额(元)" val={this.state.balance}
                                titleStyle={styles.label} valueStyle={styles.money} />
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
                                onPress={this._onSubmit}
                                disabledStyle={{backgroundColor: colors.grey3}}
                                disabled={this.state.money <= 0}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default CPAWalletPage;

CPAWalletPage.propTypes = {

};

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