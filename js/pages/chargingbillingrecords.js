'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {EmptyPlaceHolder} from "../components/placeholder";
import {ChargingBillingRecord} from "../components/billingrecord";
import {connect} from "react-redux";
import {doQueryChargingBillingRecords} from "../redux/chargingactions";

class ChargingBillingRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this._queryChargingBillingRecords();
    }

    _queryChargingBillingRecords = () => {
        const {queryChargingBillingRecords} = this.props;
        queryChargingBillingRecords && queryChargingBillingRecords()
            .then(ret=>{
                this.setState({
                    data: ret
                })
            })
    };

    _renderItem = ({item}) => {
        const {key, kwhs, start, cost} = item;

        return (
            <ChargingBillingRecord key={key}
                                   title={kwhs}
                                   subtitle={start}
                                   content={cost} />
        );
    };

    render() {
        const {data} = this.state;

        return (
            <View style={styles.contentContainer}>
                <FlatList data={data}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder('没有找到充电账单...')} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryChargingBillingRecords: () => dispatch(doQueryChargingBillingRecords()),
    }
}

export default connect(state=>state, mapDispatchToProps)(ChargingBillingRecords);

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 3,
        borderTopWidth: 0.1,
    }
});