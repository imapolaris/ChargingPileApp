'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ChargingBillingRecord} from "../components/billingrecord";
import {EmptyPlaceHolder} from "../components/placeholder";

class BatteryTestingBillingRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 1,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
                {
                    key: 2,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
                {
                    key: 3,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
            ],
        };
    }

    _renderEmpty = () => {
        return EmptyPlaceHolder('没有找到充电账单...');
    };

    _renderItem = ({item}) => {
        const {key, title, subtitle, content} = item;

        return (
            <ChargingBillingRecord key={key}
                                   title={title}
                                   subtitle={subtitle}
                                   content={content} />
        );
    };

    render() {
        return (
            <View style={styles.contentContainer}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          ListEmptyComponent={this._renderEmpty} />
            </View>
        );
    }
}

export default BatteryTestingBillingRecords;

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 3,
        borderTopWidth: 0.1,
    }
});