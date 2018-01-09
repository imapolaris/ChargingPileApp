'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Animated, FlatList, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import NavButton from "../components/navbutton";
import {Icon, SearchBar} from 'react-native-elements';
import CPASearchBar from "../components/searchbar";
import {IconType} from "../common/icons";

class CPASearchStationPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            historyResult: [],
            searchResult: [],
        };
    }

    _renderHistoryItem = ({item})=>{
        return (
            <TouchableOpacity
                key={item.key}
                style={[styles.item, {flexDirection: 'row'}]}
                onPress={()=>{
                    this._chooseStation(item)
                }}>
                <View style={styles.rowData}>
                    <View style={styles.rowDataKey}>
                        <Text style={styles.rowDataText}>
                            {item.name}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.rowDataIcon}
                                  onPress={()=>this._clearOneHistory(item)}>
                    <Icon type={IconType.Ionicon} name="md-trash" size={16} color={colors.secondary2} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    _renderStationItem = ({item})=>{
        return (
            <TouchableOpacity
                key={item.key}
                style={[styles.item, styles.stationItem]}
                onPress={()=>{
                    this._chooseStation(item)
                }}>
                <View style={[styles.rowData, styles.station]}>
                    <Text style={styles.rowDataText}>
                        {item.name}
                    </Text>
                    <Text style={[styles.rowDataText, styles.address]}>
                        {item.address}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderSearchHistory = () => {
        return (
            <View style={[styles.searchResultContainer, styles.searchHistoryContainer]}>
                <View style={[styles.item, styles.historyTitle]}>
                    <Text style={[styles.rowDataText]}>
                        搜索历史
                    </Text>
                </View>
                <FlatList style={styles.searchResult}
                          data={this.state.historyResult}
                          renderItem={this._renderHistoryItem} />
                <TouchableOpacity style={[styles.item, styles.historyTitle]}
                                  onPress={this._clearHistory} >
                    <Text style={styles.rowDataText}>
                        清除搜索历史
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    _renderSearchOptions = () => {
        return (
            <View style={styles.searchResultContainer}>
                <FlatList style={styles.searchResult}
                          data={this.state.searchResult}
                          renderItem={this._renderStationItem} />
            </View>
        );
    };


    render() {
        const rightButton = <NavButton label='取消'
                                       style={styles.cancel}
                                       onNavAction={this._toCancel} />;

        return (
            <View style={styles.container}>
                <CPASearchBar showLeftButton={false}
                              placeholder='输入地名、站点名称进行搜索...'
                              onFocus={this._toSearch}
                              autoFocus={true}
                              returnKeyType="search"
                              onChangeText={this._startSearch}
                              clearIcon={{color:'#86939e', name:'clear'}}
                              showLoadingIcon={false}
                              onSubmitEditing={
                                  (event)=> {
                                      this._searchLocationNameFinished(event.nativeEvent.text);
                                  }
                              }
                              rightButton={rightButton}
                              onSearch={()=>{}}/>

                {
                    this.state.searchState === true ?
                        this._renderSearchOptions()
                        :
                        this.state.historyResult.length > 0 ?
                            this._renderSearchHistory()
                            :
                            null
                }
            </View>
        );
    }
}

export default CPASearchStationPage;

CPASearchStationPage.propTypes = {

};

const SECTIONHEIGHT=30, ROWHEIGHT=40;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search:{
        flex: 1,
        backgroundColor:'transparent',
    },
    searchInput:{
        backgroundColor: colors.white,
    },
    cancel: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 5,
    },
    searchResultContainer: {

    },
    searchHistoryContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    searchOptionsContainer: {

    },
    searchResult: {
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
        flexDirection: 'row',
    },
    rowDataKey: {
        flex: 1,
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    rowDataIcon: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    stationItem: {
        height: ROWHEIGHT + 15,
    },
    station: {
        flexDirection: 'column',
    },
    rowDataText:{
        color:'gray',
        fontSize: 15,
    },
    address: {
        fontSize: 13,
    },
    historyTitle: {
        alignItems: 'center',
    },
});