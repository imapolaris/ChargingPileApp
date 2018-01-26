'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from "react-native-elements";
import colors from "../common/colors";
import Picker from 'react-native-picker';
import provinces from '../assets/data/provinces';
import letters from '../assets/data/letters';

class CPAAddVehiclePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            vehicleModel: '',
            vehicleNo: '',
            data: [],
        };
    }

    componentWillMount() {
        let allProvinces = [];
        for (let i = 0; i < provinces.length; ++i) {
            let province = provinces[i];
            allProvinces.push(province.name);
        }

        this.setState({
            data: [allProvinces, letters]
        });
    }

    componentWillUnmount() {
        Picker.hide();
    }

    _showVehicleNoPicker = () => {
        const {data} = this.state;

        Picker.init({
            pickerData: data,
            pickerConfirmBtnColor: [77, 160, 255, 1],
            pickerCancelBtnColor: [77, 160, 255, 1],
            pickerConfirmBtnText: '完成',
            pickerCancelBtnText: '取消',
            pickerTitleText: '车牌号',
            pickerFontSize: 18,
            pickerRowHeight: 24,
            wheelFlex: [1, 1],
            pickerBg: [255, 255, 255, 1],
            selectedValue: ['北京市 (京)', 'A'],
            onPickerConfirm: (data) => {
                let result = provinces.find(item=>item.name === data[0]).shortname;
                result += data[1];
                alert(result);
            },
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