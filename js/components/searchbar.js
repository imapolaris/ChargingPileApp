'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, Animated, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../common/colors';
import {IOSPlatform} from "../common/constants";
import {Icon, SearchBar} from 'react-native-elements';
import {shadowStyle} from "../common/styles";
import NavButton from "./navbutton";
import {IconType} from "../common/icons";

class CPASearchBar extends Component{
    _toSearch = () => {
        /*this.props.search &&
        this.props.search();*/
    };

    render() {
        const {navToStationList} = this.props;

        return (
            <Animated.View style={[styles.container, shadowStyle]}>
                <View style={styles.appBar}>
                    <NavButton label={'北京'}
                               onNavAction={()=>{}}
                               showIcon={true}
                               icon={<Icon type={IconType.SimpleLineIcon} name="arrow-down" color={colors.white} size={15}/>} />
                    <SearchBar ref={self => this._search = self}
                               containerStyle={styles.search}
                               inputStyle={styles.searchInput}
                               lightTheme
                               round
                               placeholder='搜索...'
                               onFocus={this._toSearch} />
                    <NavButton onNavAction={navToStationList}
                               showLabel={false}
                               showIcon={true}
                               icon={<Icon type={IconType.SimpleLineIcon} name="list" color={colors.white} />} />
                </View>
            </Animated.View>
        );
    }
}

export default CPASearchBar;

CPASearchBar.propTypes = {
    navToStationList: PropTypes.func.isRequired,
};

CPASearchBar.defaultProps = {

};


const APPBAR_HEIGHT = Platform.OS === IOSPlatform ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === IOSPlatform ? 20 : 0;
const styles = StyleSheet.create({
    container: {
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: Platform.OS === IOSPlatform ? '#EFEFF2' : '#FFF',
        height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    },
    appBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.theme1,
    },
    search:{
        flex: 1,
        backgroundColor:'transparent',
    },
    searchInput:{
        backgroundColor: colors.white,
    },
    leftButton:{
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    rightButton:{
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    disabled: {
        color: colors.grey4,
    }
});