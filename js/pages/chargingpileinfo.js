'use strict';

import React, {Component} from 'react';
import {CommonEmptyPlaceHolder, SeparatorPlaceHolder} from "../components/placeholder";
import ChargingPileItem from "../components/chargingpileitem";
import {FlatList, ScrollView, StyleSheet} from "react-native";
import {Divider} from "react-native-elements";
import {connect} from "react-redux";
import {doQueryStationChargingPiles} from "../redux/stationactions";

class ChargingPileInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chargingPiles: [],
        };
    }

    componentDidMount() {
        this._requestStationChargingPiles();
    }

    _requestStationChargingPiles = () => {
        const {queryStationChargingPiles} = this.props;
        const {nav} = this.props.screenProps;
        const {stationId} = nav.state.params;
        queryStationChargingPiles(stationId)
            .then(ret=>{
                this.setState({
                    chargingPiles: ret
                });
            })
    };

    _renderItem = ({item}) => {
        return (
            <ChargingPileItem name={item.name}
                              status={item.statusname}
                              serialNumber={item.serialNumber}
                              pileType={item.pileType}
                              onSubscribe={() => {}}
            />
        );
    };

    render() {
        return (
            <ScrollView style={styles.chargingPile}>
                <Divider />
                <FlatList data={this.state.chargingPiles}
                          renderItem={this._renderItem}
                          ListEmptyComponent={CommonEmptyPlaceHolder(require('../assets/images/billing.png'), '客官，没有找到电桩啊！')}
                          ItemSeparatorComponent={SeparatorPlaceHolder} />
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        queryStationChargingPiles: (stationId) => dispatch(doQueryStationChargingPiles(stationId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargingPileInfo);

const styles = StyleSheet.create({
    chargingPile: {
        flex: 1,
        paddingTop: 3,
    },
});