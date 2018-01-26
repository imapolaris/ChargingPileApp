'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TestingReportItem from "../components/testingreportitem";
import {connect} from "react-redux";
import {EmptyPlaceHolder, SeparatorPlaceHolder} from "../components/placeholder";
import {doQueryBatteryTestingInfo} from "../redux/batterytestingactions";
import {ScreenKey} from "../common/constants";
import {doNav} from "../redux/navactions";

class CPATestingReportPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reports: [
                {key:1, id: '1'},
                {key:2, id: '2'},
                {key:3, id: '3'},
            ],
        };
    }

    componentDidMount() {
        /*const {queryBatteryTestingInfo} = this.props;
        queryBatteryTestingInfo()
            .then(ret=>{
                this.setState({reports: ret});
            })*/
    }

    _renderItem = ({item}) => {
        const {nav} = this.props;

        return (
            <TestingReportItem key={item.key}
                               onAction={()=>{nav && nav(ScreenKey.TestingReportDetail, {reportId: item.id})}}/>
        );
    };

    render() {
        const {reports} = this.state;

        return (
            <View style={styles.container}>
                <FlatList data={reports}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder('没有发现检测报告！')}
                          ItemSeparatorComponent={SeparatorPlaceHolder} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryBatteryTestingInfo: () => dispatch(doQueryBatteryTestingInfo()),
        nav: (screenKey, params) => dispatch(doNav(screenKey, params)),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPATestingReportPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
});