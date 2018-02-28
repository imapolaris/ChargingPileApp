'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {Divider, Icon} from 'react-native-elements';
import {IconType} from "../common/icons";
import {ActiveOpacity} from "../common/constants";
import MapNavButton from "./mapnavbutton";

class StationItem extends Component{
    render() {
        const {name, elecprice, numbers, address, onAction, containerStyle, destination, showNavBtn} = this.props;

        return (
            <TouchableOpacity style={[styles.container, containerStyle]}
                              activeOpacity={ActiveOpacity}
                              onPress={onAction}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Divider/>
                <View style={styles.infoContainer}>
                    <View style={styles.infoLeftContainer}>
                        <Text style={styles.info}>
                            <Text style={styles.elecprice}>{elecprice}</Text>  元/度
                        </Text>
                        <Text style={[styles.info]}>
                            直流：{numbers}   交流：{numbers}
                        </Text>
                        <Text style={[styles.info]} numberOfLines={1}>
                            地址：{address}
                        </Text>
                    </View>

                    {
                        showNavBtn ?
                            <MapNavButton address={destination} />
                            : null
                    }
                </View>
                <Divider style={styles.divider} />
            </TouchableOpacity>
        );
    }
}

export default StationItem;

StationItem.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    elecprice: PropTypes.number.isRequired,
    onAction: PropTypes.func.isRequired,
};

StationItem.defaultProps = {
    showNavBtn: true
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    name: {
        fontSize: 18,
        color: colors.primary1,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    infoContainer: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    infoLeftContainer:{
        flex: 1,
    },
    info: {
        fontSize: 14,
        color: colors.grey3,
        paddingTop: 3,
    },
    elecprice: {
        fontSize: 20,
        color: colors.goldenrod,
    },
    navigateContainer: {
        width: 55,
        height: 55,
        backgroundColor: colors.primary1,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigate:{
        fontSize: 14,
        color: colors.white,
    },
    divider: {
        backgroundColor: '#C3C3C3',
        //height: 2.5,
    }
});