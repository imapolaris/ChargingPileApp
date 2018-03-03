'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {EmptyPlaceHolder, SeparatorPlaceHolder} from "../components/placeholder";
import Vehicle from "../components/vehicle";
import {connect} from "react-redux";
import {doDelOneVehicle, doQueryVehicleInfo} from "../redux/vehicleactions";
import {prompt2} from "../common/functions";

class CPAVehicleInfoPage extends Component{
    componentDidMount() {
        const {queryVehicleInfo} = this.props;
        queryVehicleInfo && queryVehicleInfo();
    }

    _delOneVehicle = (id) => {
        prompt2('提示', '是否要删除该车辆？',
            ()=>{},
            ()=>{
                const {delOneVehicle} = this.props;
                delOneVehicle && delOneVehicle(id);
            });
    };

    _renderItem = ({item}) => {
        return (
            <Vehicle key={item.id}
                     vehicleModel={item.models}
                     vehicleNo={item.plateno}
                     onTopAction={()=>alert('test')}
                     onDelAction={()=>this._delOneVehicle(item.id)}
                     asDefault={item.default} />
        )
    };

    render() {
        const {vehicles} = this.props;

        return (
            <View style={styles.container}>
                <FlatList data={vehicles}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder('快添加一辆汽车信息吧！')}
                          ItemSeparatorComponent={SeparatorPlaceHolder} />
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