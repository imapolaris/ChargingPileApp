'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {Divider} from 'react-native-elements';

class StationItem extends Component{
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              activeOpacity={0.6}
                              onPress={() => this.props.gotoDetails && this.props.gotoDetails()}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.infoContainer}>
                    <View style={styles.infoLeftContainer}>
                        <Text style={styles.info}>
                            空闲电桩：{this.props.numbers}
                        </Text>
                        <Text style={styles.info}>
                            {this.props.address}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.infoRightContainer}
                                      onPress={() => this.props.gotoMapNav && this.props.gotoMapNav()}
                                      activeOpacity={0.9}>
                        <Icon type={icons.Ionicon} name="md-navigate" size={18} color={colors.white} />
                        <Text style={styles.navigate}>
                            导航
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

export default StationItem;

StationItem.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        //backgroundColor: colors.theme1,
    },
    title: {
        fontSize: 18,
        color: colors.primary1,
    },
    infoContainer: {
        height: 80,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    infoLeftContainer:{
        flex: 1,
    },
    infoRightContainer: {
        width: 55,
        height: 55,
        backgroundColor: colors.primary1,
        margin: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 13,
    },
    navigate:{
        fontSize: 14,
        color: colors.white,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    }
});