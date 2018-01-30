'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import colors from "../common/colors";
import {ActiveOpacity} from "../common/constants";

class ChargingPileItem extends Component{
    render() {
        const {name, status, serialNumber, pileType, onSubscribe} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.name}>
                            {name}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.status}>
                            {status}
                        </Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.infoContainer}>
                    <View style={styles.infoLeftContainer}>
                        <Text style={styles.info}>
                            编号：{serialNumber}
                        </Text>
                        <Text style={styles.info}>
                            类型：{pileType}
                        </Text>
                    </View>
                    {/*<TouchableOpacity style={styles.infoRightContainer}
                                      activeOpacity={ActiveOpacity}
                                      onPress={onSubscribe}>
                        <Icon type={IconType.Ionicon} name="md-checkmark" size={20} color={colors.white} />
                        <Text style={styles.buttonText}>
                            预约
                        </Text>
                    </TouchableOpacity>*/}
                </View>
            </View>
        );
    }
}

export default ChargingPileItem;

ChargingPileItem.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    serialNumber: PropTypes.string.isRequired,
    pileType: PropTypes.string.isRequired,
    onSubscribe: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    titleContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        height: 30,
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainer: {
        paddingRight: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: colors.primary1,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    infoLeftContainer: {
        flex: 1,
    },
    infoRightContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary1,
        borderRadius: 30,
        marginRight: 10,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 15,
        color: colors.white,
    },
    info: {
        fontSize: 14,
        paddingTop: 3,
    },
});