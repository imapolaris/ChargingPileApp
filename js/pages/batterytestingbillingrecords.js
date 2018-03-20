'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ChargingBillingRecord} from "../components/billingrecord";
import {EmptyPlaceHolder} from "../components/placeholder";
import {doQueryBatteryTestingBillingRecords} from "../redux/batterytestingactions";
import {connect} from "react-redux";

class BatteryTestingBillingRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this._queryBatteryTestingBillingRecords();
    }

    _queryBatteryTestingBillingRecords = () => {
        const {queryBatteryTestingBillingRecords} = this.props;
        queryBatteryTestingBillingRecords && queryBatteryTestingBillingRecords()
            .then(ret=>{
                this.setState({
                    data: ret
                });
            })
    };

    _renderItem = ({item}) => {
        const {key, vehicleNo, start, cost} = item;

        return (
            <ChargingBillingRecord key={key}
                                   title={vehicleNo}
                                   subtitle={start}
                                   content={cost} />
        );
    };

    render() {
        return (
            <View style={styles.contentContainer}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder('没有找到充电账单...')} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryBatteryTestingBillingRecords: () => dispatch(doQueryBatteryTestingBillingRecords())
    }
}

export default connect(state=>state, mapDispatchToProps)(BatteryTestingBillingRecords);

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 3,
        borderTopWidth: 0.1,
    }
});