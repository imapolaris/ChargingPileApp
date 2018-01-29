'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import colors from "../common/colors";
import {Button, Divider, Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import {ActiveOpacity, screenWidth} from "../common/constants";
import Picker from 'react-native-picker';
import districts from '../assets/data/area';

class CPAAddAddressPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            receiver: '',
            phone: '',
            district: '',
            address: '',
            districtData: [],
        };
    }

    componentDidMount() {
        let allDistricts = [];
        for (let i = 0; i < districts.length; ++i) {
            let district = districts[i];
            let allCities = [];
            for (let j = 0; j < district.city.length; ++j) {
                let city = district.city[j];
                allCities.push({
                    [city.name]: city.area
                });
            }
            allDistricts.push({
                [district.name] : allCities
            });
        }

        this.setState({
            districtData: allDistricts,
        });
    }

    componentWillUnmount() {
        Picker.hide();
    }

    _showDistrictPicker = () => {
        const {districtData} = this.state;

        Picker.init({
            pickerData: districtData,
            pickerConfirmBtnColor: [77, 160, 255, 1],
            pickerCancelBtnColor: [77, 160, 255, 1],
            pickerConfirmBtnText: '完成',
            pickerCancelBtnText: '取消',
            pickerTitleText: '地区',
            pickerFontSize: 18,
            pickerRowHeight: 24,
            wheelFlex: [1, 1, 1],
            pickerBg: [255, 255, 255, 1],
            selectedValue: ['北京市 (京)', 'A'],
            onPickerConfirm: (data) => {
                let result = `${data[0]}${data[1]}${data[2]}`;
                this.setState({
                    district: result,
                });
            },
        });
        Picker.show();
    };

    _onSubmit = () => {
        const {receiver, phone, district, address} = this.state;
    };

    render() {
        const {receiver, phone, district, address} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>收件人</Text>
                    <TextInput placeholderTextColor={colors.grey4}
                               placeholder='填写收件人'
                               style={styles.textInput}
                               underlineColorAndroid={colors.transparent}
                               value={receiver}
                               onChangeText={(text) => {
                                   this.setState({
                                       receiver: text,
                                   });
                               }}/>
                </View>
                <Divider/>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>联系电话</Text>
                    <TextInput placeholderTextColor={colors.grey4}
                               placeholder='填写联系电话'
                               style={styles.textInput}
                               keyboardType={'numeric'}
                               underlineColorAndroid={colors.transparent}
                               value={phone}
                               onChangeText={(text) => {
                                   this.setState({
                                       phone: text,
                                   });
                               }}/>
                </View>
                <Divider/>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>所在地区</Text>
                    <TouchableOpacity style={styles.districtBtn}
                                      activeOpacity={ActiveOpacity}
                                      onPress={this._showDistrictPicker}>
                        <Text style={styles.districtBtnText}>
                            {district || '填写所在地区'}
                        </Text>
                        <Icon type={IconType.Ionicon} name="md-arrow-dropdown" color={colors.grey3}/>
                    </TouchableOpacity>
                </View>
                <Divider/>
                <TextInput placeholder={'请填写详细地址'}
                           placeholderTextColor={colors.grey4}
                           multiline={true} maxLength={200}
                           style={styles.address}
                           onChangeText={
                               (text) => {
                                   this.setState({
                                       address: text
                                   })
                               }}/>

                <Button buttonStyle={styles.button}
                        containerViewStyle={styles.btnContainer}
                        disabled={receiver.length<=0 || phone.length<=0 || district.length<=0 || address.length<=0}
                        disabledStyle={styles.disabledStyle}
                        title="提交"
                        onPress={this._onSubmit} />
            </View>
        );
    }
}

export default CPAAddAddressPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 18,
    },
    contentContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    textInput:{
        flex: 1,
        fontSize: 16,
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'right',
        marginLeft: 5,
    },
    districtBtn: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'flex-end',
    },
    districtBtnText: {
        color: colors.grey3,
        fontSize: 16,
        marginRight: 5,
    },
    address: {
        height: 150,
        fontSize: 16,
        textAlignVertical: 'top',
        borderLeftWidth: 0.25,
        borderRightWidth: 0.25,
        borderBottomWidth: 0.25,
        borderColor: '#c3c3c3',
        paddingLeft: 20,
        paddingRight: 20,
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