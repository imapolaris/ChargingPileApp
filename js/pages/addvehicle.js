'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Button, Divider, Icon} from "react-native-elements";
import colors from "../common/colors";
import Picker from 'react-native-picker';
import provinces from '../assets/data/provinces';
import letters from '../assets/data/letters';
import vehicles from '../assets/data/vehicles';
import {screenWidth} from "../common/constants";
import {IconType} from "../common/icons";
import {connect} from "react-redux";
import {doAddOneVehicle} from "../redux/vehicleactions";

class CPAAddVehiclePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            vehicleModel: '',
            vehicleNoPre: '',
            vehicleNo: '',
            noData: [],
            modelData: [],
        };
    }

    componentWillMount() {
        let allProvinces = [];
        for (let i = 0; i < provinces.length; ++i) {
            let province = provinces[i];
            allProvinces.push(province.name);
        }

        this.setState({
            noData: [allProvinces, letters]
        });

        let allVehicles = [];
        for (let j = 0; j < vehicles.length; ++j) {
            let vehicle = vehicles[j];
            allVehicles.push({[vehicle.name]: vehicle.models});
        }
        this.setState({
            modelData: allVehicles,
        })
    }

    componentWillUnmount() {
        Picker.hide();
    }

    _showVehicleModelPicker = () => {
        const {modelData} = this.state;

        Picker.init({
            pickerData: modelData,
            pickerConfirmBtnColor: [77, 160, 255, 1],
            pickerCancelBtnColor: [77, 160, 255, 1],
            pickerConfirmBtnText: '完成',
            pickerCancelBtnText: '取消',
            pickerTitleText: '车型',
            pickerFontSize: 18,
            pickerRowHeight: 24,
            wheelFlex: [1, 1.5],
            pickerBg: [255, 255, 255, 1],
            selectedValue: ['奥迪', 'A3 Sportback e-tron'],
            onPickerConfirm: (data) => {
                let result = `${data[0]} ${data[1]}`;
                this.setState({
                    vehicleModel: result,
                });
            },
        });
        Picker.show();
    };

    _showVehicleNoPicker = () => {
        const {noData} = this.state;

        Picker.init({
            pickerData: noData,
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
                this.setState({
                    vehicleNoPre: result,
                });
            },
        });
        Picker.show();
    };

    _onSubmit = () => {
        const {vehicleModel, vehicleNoPre, vehicleNo} = this.state;
        const {addOneVehicle} = this.props;
        addOneVehicle && addOneVehicle(
            vehicleModel,
            `${vehicleNoPre} ${vehicleNo}`
        );
    };

    render() {
        const {vehicleModel, vehicleNoPre, vehicleNo} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.modelContainer}>
                    <Text style={styles.title}>
                        车型
                    </Text>
                    <TouchableOpacity style={styles.btnModel} onPress={this._showVehicleModelPicker}>
                        <Text style={styles.btnModelText}>
                            {vehicleModel || '请选择车型'}
                        </Text>
                        <Icon type={IconType.Ionicon} name="md-arrow-dropdown" color={colors.grey3} />
                    </TouchableOpacity>
                </View>
                <Divider />
                <View style={styles.noContainer}>
                    <Text style={styles.title}>
                        车牌
                    </Text>
                    <TouchableOpacity style={styles.btnNo} onPress={this._showVehicleNoPicker}>
                        <Text style={styles.btnNoText}>
                            {vehicleNoPre || '京'}
                        </Text>
                        <Icon type={IconType.Ionicon} name="md-arrow-dropdown" color={colors.grey3} />
                    </TouchableOpacity>
                    <Divider style={styles.divider} />
                    <TextInput placeholderTextColor={colors.grey4}
                               placeholder='请输入车牌号'
                               style={styles.textInput}
                               keyboardType={'ascii-capable'}
                               maxLength={5}
                               underlineColorAndroid={colors.transparent}
                               value={vehicleNo}
                               onChangeText={(text)=>{
                                   this.setState({
                                       vehicleNo: text,
                                   });
                               }} />
                </View>
                <Divider />

                <Button title="提交"
                        onPress={this._onSubmit}
                        buttonStyle={styles.submitBtn}
                        containerViewStyle={styles.btnContainer}
                        disabled={vehicleModel.length<=0 || vehicleNoPre.length<=0 || vehicleNo.length<5}
                        disabledStyle={styles.disabledStyle} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addOneVehicle: (models, plateno) => dispatch(doAddOneVehicle(models, plateno)),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPAAddVehiclePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        margin: 5,
    },
    modelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    title:{
        fontSize: 18,
    },
    btnModel: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnModelText: {
        color: colors.grey3,
        fontSize: 16,
        marginRight: 5,

    },
    noContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    btnNo: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnNoText: {
        color: colors.grey3,
        fontSize: 16,
        marginRight: 5,
    },
    textInput:{
        width: 100,
        fontSize: 15,
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'right',
        marginLeft: 5,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: colors.grey4,
    },
    btnContainer: {
        paddingTop: 30,
    },
    disabledStyle: {
        backgroundColor: colors.grey3,
    },
    submitBtn: {
        width: screenWidth-40,
    },
});