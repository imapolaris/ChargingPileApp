'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import colors from "../common/colors";
import NavButton from "../components/navbutton";
import {Icon} from 'react-native-elements';
import CPASearchBar from "../components/searchbar";
import {IconType} from "../common/icons";
import {ActiveOpacity, SearchHistoryCount} from "../common/constants";
import {clearSearchHistoryStations, getSearchHistoryStations, updateSearchHistoryStations} from "../common/appstorage";
import {getStationsByName} from "../common/webapi";
import {connect} from "react-redux";
import {doGeocode} from "../redux/mapactions";
import {doBack} from "../redux/navactions";

class CPASearchStationPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            historyResult: [],
            searchResult: [],
        };
    }

    componentDidMount() {
        this._queryHistory();
    }

    _toCancel = () => {
        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    _startSearch = (text)=>{
        if (this.state.searchState === false){
            this.setState({searchState: true});
        }

        getStationsByName(text)
            .then(data=>{
                if (data !== null && data !== undefined && data.length > 0) {
                    let data = data.map((item, index)=>{
                        return Object.assign({}, item, {key: index})
                    });

                    this.setState({searchResult: data});
                }
            })
            .catch(err=>{
                console.log(err);
            });
    };

    _searchLocationNameFinished = (locationName) => {
        this._searchFinished({name: locationName, address: locationName});
    };

    _searchFinished = (station) => {
        if (station !== null && station !== undefined) {
            let searchRecord = Object.assign({}, station, {keyword: station.name});
            this._updateSearchHistoryStations(searchRecord);

            const {geocode} = this.props;
            geocode && geocode(station.address);
        }

        const {back} = this.props;
        back && back();
    };

    _updateSearchHistoryStations(searchRecord) {
        try {
            let data = [];
            data.push(searchRecord);
            let len = this.state.historyResult.length;
            let {keyword} = searchRecord;
            let j = 1;
            for (let i = 0; i < len;) {
                if (j >= SearchHistoryCount)
                    break;
                if (this.state.historyResult[i].keyword !== keyword) {
                    data.push(this.state.historyResult[i]);
                    j++;
                }
                i++;
            }

            updateSearchHistoryStations(data);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    _queryHistory() {
        getSearchHistoryStations()
            .then(data=>{
                if (data !== null && data !== undefined && data.length > 0) {
                    let history = data.map((item, index) => {
                        return Object.assign({}, item, {key: index})
                    });

                    this.setState({historyResult: history});
                }
            })
            .catch(err=>{
                console.log(err);
            });
    };

    _chooseStation = (station)=>{
        this._searchFinished(station);
    };

    _clearOneHistory = (item)=>{
        try {
            let data = [];
            let len = this.state.historyResult.length;
            let {keyword} = item;
            for (let i = 0; i < len; i++) {
                if (this.state.historyResult[i].keyword !== keyword) {
                    data.push(this.state.historyResult[i]);
                }
            }

            this.setState({historyResult: data});

            updateSearchHistoryStations(data);
        }
        catch (ex) {
            console.log(ex);
        }
    };

    _clearHistory = ()=>{
        this.setState({searchState: true});

        clearSearchHistoryStations();
    };


    _renderHistoryItem = ({item})=>{
        return (
            <TouchableOpacity key={item.key}
                              activeOpacity={ActiveOpacity}
                              style={[styles.item, {flexDirection: 'row'}]}
                              onPress={()=>{this._chooseStation(item)}}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>
                        {item.name}
                    </Text>
                </View>
                <TouchableOpacity style={styles.rowDataIcon}
                                  activeOpacity={ActiveOpacity}
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

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        geocode: (city) => dispatch(doGeocode(city)),
        back: () => dispatch(doBack()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CPASearchStationPage);

const ROWHEIGHT=40;
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
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-start',
        borderBottomColor:'#faf0e6',
        borderBottomWidth:0.5,
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