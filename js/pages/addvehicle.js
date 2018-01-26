'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from "react-native-elements";
import colors from "../common/colors";
import Picker from 'react-native-picker';
import provinces from '../assets/data/provinces';

class CPAAddVehiclePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            vehicleModel: '',
            vehicleNo: '',
        };
    }

    _showVehicleNoPicker = () => {
        let data = [];
        for(var i=0;i<100;i++){
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            //selectedValue: [59]
        });
        Picker.show();
    };

    render() {
        const {vehicleModel, vehicleNo} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.modelContainer}>
                    <Text>车型</Text>
                    <TouchableOpacity onPress={this._showVehicleNoPicker}>
                        <Text>请选择车型</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>车牌</Text>
                </View>

                <Button title="提交"
                        onPress={()=>alert('test')}
                        containerViewStyle={styles.btnContainer}
                        disabled={vehicleModel.length<=0 || vehicleNo.length<=0}
                        disabledStyle={styles.disabledStyle} />
            </View>
        );
    }
}

export default CPAAddVehiclePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        margin: 5,
    },
    modelContainer: {
        flexDirection: 'row',
    },
    btnContainer: {
        paddingTop: 30,
    },
    disabledStyle: {
        backgroundColor: colors.grey3,
    },
});