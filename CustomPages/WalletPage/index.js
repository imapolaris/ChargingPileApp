import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import styles from './styles';
import {CheckBox, Button} from 'react-native-elements';
import {ToastAndroidBS} from "../../Common/functions";
import colors from '../../Common/colors';
import {getWalletBalance, makeOneCharge} from "../../Common/webApi";

const Moneys1 = [{key: 0, val:500}, {key: 1, val:200}, {key: 2, val:100}];
const Moneys2 = [{key: 3, val:50}, {key: 4, val:20}, {key: 5, val:10}];
class CPAWalletPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            wxChecked: true,
            zfbChecked: false,
            checked: false,
            money: 0,
            selectedIndex: -1,
            balance: 0,
        };
    }

    componentWillMount() {
        this._init();
    }

    _init = ()=>{
        let userId = AppContext.userId;
        getWalletBalance(userId)
            .then(ret=>{
                if (ret.result === true) {
                    this.setState({
                        ...this.state,
                        balance: ret.data,
                    });
                } else {
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(err=>{
                console.log(err);
                ToastAndroidBS('无法获取用户钱包信息！');
            });
    };

    _onWxPress = () => {
        let checked = !this.state.wxChecked;
        this.setState({
            wxChecked: checked,
            zfbChecked: !checked,
        });
    };

    _onZfbPress = () => {
        let checked = !this.state.zfbChecked;
        this.setState({
            wxChecked: !checked,
            zfbChecked: checked,
        });
    };

    _onSubmit = () => {
        /*Alipay.pay('signed pay info string')
            .then(data=>{
                console.log(data);
                alert(data);
            })
            .catch(error=>{
                console.error(error);
                alert(error);
            });*/
        let userId = AppContext.userId;
        let money = this.state.money;
        let payWay = this.state.wxChecked === true ? '微信支付' : '支付宝支付';
        makeOneCharge(userId, money, payWay)
            .then(ret=>{
                if (ret.result === true) {
                    this.setState({
                        ...this.state,
                        balance: ret.data,
                    });
                    ToastAndroidBS('充值成功！');
                } else {
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(err=>{
                console.log(err);
                ToastAndroidBS(err.message);
            });
    };

    _renderItem = (item)=>{
        return (
            <TouchableOpacity key={item.key}
                              style={[styles.moneyItem, this.state.selectedIndex === item.key ? styles.chargeMoneyItem : null]}
                              activeOpacity={0.6}
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
                    <Text style={styles.label}>
                        余额：
                    </Text>
                    <Text style={styles.money}>
                        {this.state.balance}
                    </Text>
                    <Text style={styles.label}>
                        {'  '}元
                    </Text>
                </View>

                <View style={styles.payContainer}>
                    <View style={styles.moneyContainer}>
                        {
                            Moneys1.map((item, index)=>{
                                return this._renderItem(item);
                            })
                        }
                    </View>
                    <View style={styles.moneyContainer}>
                        {
                            Moneys2.map((item, index)=>{
                                return this._renderItem(item);
                            })
                        }
                    </View>

                    <View style={styles.payWayContainer}>
                        <Text>
                            充值方式：
                        </Text>

                        <View style={styles.checkboxContainer}>
                            <CheckBox style={styles.checkbox}
                                      center
                                      title="微信"
                                      checked={this.state.wxChecked}
                                      onPress={this._onWxPress}
                            />
                            <CheckBox style={styles.checkbox}
                                      title="支付宝"
                                      checked={this.state.zfbChecked}
                                      onPress={this._onZfbPress}
                            />
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
    };
}

export default CPAWalletPage;