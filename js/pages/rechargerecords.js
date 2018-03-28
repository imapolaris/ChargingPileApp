'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import RechargeItem from "../components/rechargeitem";
import {CommonEmptyPlaceHolder} from "../components/placeholder";
import {prompt2} from "../common/functions";
import {doClearRechargeRecords, doQueryRechargeRecords} from "../redux/walletactions";
import {connect} from "react-redux";

class RechargeRecords extends Component{
    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
    }

    componentDidMount() {
        this._queryRechargeRecords();

        const {setParams} = this.props.navigation;
        setParams && setParams({clearRechargeRecords: this._clearRechargeRecords});
    }

    _queryRechargeRecords = () => {
        const {queryRechargeRecords} = this.props;
        queryRechargeRecords
            && queryRechargeRecords().then(ret=>{
                this.setState({records: ret});
        })
    };

    _clearRechargeRecords = () => {
        prompt2('提示', '要清空充值记录吗？',
            () => {},
            () => {
                const {clearRechargeRecords} = this.props;
                clearRechargeRecords
                    && clearRechargeRecords().then(ret=>{
                        if (ret) {
                            this.setState({records: []});
                        }
                });
            });
    };

    _renderItem = ({item}) => {
        return (
            <RechargeItem key={item.id}
                          payWay={item.payWay}
                          payDate={item.payDate}
                          money={item.money}
            />
        )
    };

    render() {
        const {records} = this.state;

        return (
            <View style={styles.container}>
                <FlatList data={records}
                          renderItem={this._renderItem}
                          ListEmptyComponent={CommonEmptyPlaceHolder(require('../assets/images/recharge.png'),'还没有充值记录')}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryRechargeRecords: () => dispatch(doQueryRechargeRecords()),
        clearRechargeRecords: () => dispatch(doClearRechargeRecords()),
    }
}

export default connect(state=>state, mapDispatchToProps)(RechargeRecords);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
});
