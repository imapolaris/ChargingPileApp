'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import TestingReportItem from "../components/testingreportitem";
import {connect} from "react-redux";
import {EmptyPlaceHolder} from "../components/placeholder";
import {doQueryBatteryTestingInfo} from "../redux/batterytestingactions";

class CPATestingReportPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
        };
    }

    componentDidMount() {
        const {queryBatteryTestingInfo} = this.props;
        queryBatteryTestingInfo()
            .then(ret=>{
                this.setState({reports: ret});
            })
    }

    _renderItem = ({item}) => {
        return (
            <TestingReportItem/>
        );
    };

    render() {
        const {reports} = this.state;

        return (
            <View style={styles.container}>
                <FlatList data={reports}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder('没有发现检测报告！')} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryBatteryTestingInfo: () => dispatch(doQueryBatteryTestingInfo()),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPATestingReportPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});