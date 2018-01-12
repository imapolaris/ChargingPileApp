'use strict';

import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ActiveOpacity, screenHeight} from "../common/constants";
import data from '../assets/data/city';
import colors from "../common/colors";

// 26个英文字母（去掉O和V,这两个下面没有城市）
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
class CityList extends Component{
    _renderItem = ({item}) => {
        const {onAction} = this.props;

        return (
            <TouchableOpacity key={item.key}
                              style={styles.item}
                              activeOpacity={ActiveOpacity}
                              onPress={() => onAction && onAction(item.name)}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    _renderSectionHeader = ({section}) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {section.title}
                </Text>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    ref={self => this._sectionList=self}
                    refreshing={false}
                    sections={data}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}

export default CityList;

CityList.propTypes = {
    onAction: PropTypes.func.isRequired,
};

const SECTIONHEIGHT=30, ROWHEIGHT=40;
const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        marginBottom: 10,
    },
    item: {
        height: ROWHEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 30,
        backgroundColor: colors.white,
    },
    rowData:{
        borderBottomColor:'#faf0e6',
        borderBottomWidth:0.5,
        justifyContent: 'center',
        flex: 1,
    },
    rowDataText:{
        color:'gray',
        fontSize: 15,
    },
    header: {
        height: SECTIONHEIGHT,
        justifyContent: 'center',
        paddingLeft: 5
    },
    headerTitle: {
        color: 'rgb(40,169,185)',
        fontWeight: 'bold',
        fontSize: 18,
    },
});