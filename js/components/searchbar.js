'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, Animated, View, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../common/colors';
import {APPBAR_HEIGHT, IOSPlatform, STATUSBAR_HEIGHT} from "../common/constants";
import {Icon, SearchBar} from 'react-native-elements';
import {shadowStyle} from "../common/styles";
import NavButton from "./navbutton";
import {IconType} from "../common/icons";

class CPASearchBar extends Component{
    _onFocused = () => {
        this._search.blur();
        Keyboard.dismiss();

        const {onSearch} = this.props;
        onSearch && onSearch();
    };

    render() {
        const {showLeftButton, showRightButton, leftButton, leftButtonLabel, rightButton, navToLocatingCity, navToStationList, onSearch} = this.props;

        return (
            <Animated.View style={[styles.container, shadowStyle]}>
                <View style={styles.appBar}>
                    {
                        showLeftButton ?
                            leftButton ?
                                leftButton
                                :
                                <NavButton label={leftButtonLabel || '北京'}
                                           onNavAction={navToLocatingCity}
                                           showIcon={true}
                                           icon={<Icon type={IconType.SimpleLineIcon} name="arrow-down" color={colors.white} size={15}/>} />
                            : null
                    }
                    <SearchBar ref={self => this._search = self}
                               containerStyle={styles.search}
                               inputStyle={styles.searchInput}
                               lightTheme
                               round
                               placeholder='搜索...'
                               onFocus={this._onFocused}
                               {...this.props}/>
                    {
                        showRightButton ?
                            rightButton ?
                                rightButton
                                :
                                <NavButton onNavAction={navToStationList}
                                           showLabel={false}
                                           showIcon={true}
                                           icon={<Icon type={IconType.SimpleLineIcon} name="list" color={colors.white} />} />
                            : null
                    }
                </View>
            </Animated.View>
        );
    }
}

export default CPASearchBar;

CPASearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

CPASearchBar.defaultProps = {
    showLeftButton: true,
    showRightButton: true,
};



const styles = StyleSheet.create({
    container: {
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: Platform.OS === IOSPlatform ? colors.theme1 : '#FFF', // ios default: '#EFEFF2'
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