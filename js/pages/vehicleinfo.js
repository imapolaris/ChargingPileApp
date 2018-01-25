'use strict';

import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import {screenWidth} from "../common/constants";
import {EmptyPlaceHolder} from "../components/placeholder";
import Vehicle from "../components/vehicle";
import {connect} from "react-redux";
import {doDelOneVehicle, doQueryVehicleInfo} from "../redux/vehicleactions";

class CPAVehicleInfoPage extends Component{
    componentDidMount() {
        const {queryVehicleInfo} = this.props;
        queryVehicleInfo && queryVehicleInfo();
    }

    _renderItem = ({item}) => {
        const {delOneVehicle} = this.props;

        return (
            <Vehicle onTopAction={()=>alert('test')}
                     onDelAction={()=>delOneVehicle(item.id)}
                     asDefault={item.default} />
        )
    };

    render() {
        const vehicles = [
            {
                key: 1,
                id: '1',
                vehicleNo: '123',
                vehicleModel: '456',
                default: false,
            },
            {
                key: 2,
                id: '2',
                vehicleNo: '123',
                vehicleModel: '456',
                default: false,
            },
        ];

        return (
            <View style={styles.container}>
                <FlatList data={vehicles}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder('快添加一辆汽车信息吧！')} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        defaultVehicle: state.vehicle.defaultVehicle,
        vehicles: state.vehicle.vehicles,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryVehicleInfo: () => dispatch(doQueryVehicleInfo()),
        delOneVehicle: (vehicleId) => dispatch(doDelOneVehicle(vehicleId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAVehicleInfoPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
});