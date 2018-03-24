'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../common/colors";
import {Divider} from "react-native-elements";
import {ActiveOpacity} from "../common/constants";

class Vehicle extends Component{
    render() {
        const {vehicleModel, vehicleNo, asDefault, onTopAction, onDelAction} = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.contentContainer, asDefault ? styles.asDefault : null]}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.vehicleModel}>
                            车型：{vehicleModel || '车型'}
                        </Text>
                        <Text>
                            车牌号：
                            <Text style={styles.vehicleNo}>
                                {vehicleNo || '车牌号'}
                            </Text>
                        </Text>
                    </View>
                    <Divider style={styles.dividerV}/>
                    {/*<TouchableOpacity activeOpacity={ActiveOpacity}
                                      style={styles.topBtn}
                                      onPress={onTopAction}>
                        <Icon type={IconType.MaterialIcon} name="vertical-align-top" size={25} color={colors.primary1}/>
                    </TouchableOpacity>*/}
                    <TouchableOpacity activeOpacity={ActiveOpacity}
                                      style={styles.delBtn}
                                      onPress={onDelAction}>
                        {/*<Icon type={IconType.Ionicon} name="md-remove-circle" size={25} color={colors.red}/>*/}
                        <Image source={require('../assets/icons/del.png')} style={{width:25, height:25}} />
                    </TouchableOpacity>
                </View>
                <Divider style={styles.dividerH}/>
            </View>
        );
    }
}

export default Vehicle;

Vehicle.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    infoContainer: {
        flex: 1,
    },
    vehicleModel: {
        fontSize: 18,
        paddingBottom: 5,
    },
    vehicleNo: {
        fontSize: 15,
        color: colors.grey3,
    },
    topBtn: {
        padding: 10,
    },
    delBtn: {
        padding: 10,
        paddingLeft: 20, //temp
    },
    dividerH: {
        //height: 3,
        backgroundColor: colors.grey4,
    },
    dividerV: {
        backgroundColor: colors.grey4,
        width: 0.2,
        height:30,
    },
    asDefault: {
        borderColor: colors.theme1,
        borderWidth: 1,
    },
});