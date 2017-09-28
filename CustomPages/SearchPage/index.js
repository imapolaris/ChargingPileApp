import React, {Component} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Animated,
    Keyboard,
} from 'react-native';
import styles from './styles';
import searchStyles from '../../CustomComponents/DefinedTitleBar/styles';
import NavButton from '../../CustomComponents/NavButton/index';
import {SearchBar} from 'react-native-elements';
import {
    clearSearchHistoryStations, getSearchHistoryStations,
    updateSearchHistoryStations
} from "../../Common/appContext";
import {getStationsByName} from "../../Common/webApi";
import {SearchHistoryCount} from "../../Common/constants";
import colors from '../../Common/colors';
import Icon from 'react-native-vector-icons/Ionicons';

class CPASearchPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            searchState: false,
            historyResult: [],
            searchResult: [],
        };
    }

    componentDidMount() {
        this._queryHistory();
    }

    _toCancel = ()=>{
        Keyboard.dismiss();
        this._searchFinished(null);
    };

    _startSearch = (text)=>{
        if (this.state.searchState === false){
            this.setState({
                ...this.state,
                searchState: true,
            });
        }

        getStationsByName(text)
            .then(ret=>{
                if (ret !== null && ret !== undefined && ret.length > 0) {
                    let data = ret.map((item, index)=>{
                        return Object.assign({}, item, {key: index})
                    });

                    this.setState({
                        ...this.state,
                        searchResult: data
                    });
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
        const {state, goBack} = this.props.navigation;

        if (station !== null && station !== undefined) {
            let searchRecord = Object.assign({}, station, {keyword: station.name});
            this._updateSearchHistoryStations(searchRecord);
            state && state.params.callback(searchRecord);
        }

        goBack && goBack();
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

    /*
    * get historical query items.
    * */
    _queryHistory() {
        getSearchHistoryStations()
            .then(ret=>{
                if (ret !== null && ret !== undefined && ret.length > 0) {
                    let history = ret.map((item, index) => {
                        return Object.assign({}, item, {key: index})
                    });

                    this.setState({
                        ...this.state,
                        historyResult: history,
                    });
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

            this.setState({
                ...this.state,
                historyResult: data,
            });

            updateSearchHistoryStations(data);
        }
        catch (ex) {
            console.log(ex);
        }
    };

    _clearHistory = ()=>{
        this.setState({
            ...this.state,
            searchState: true,
        });

        clearSearchHistoryStations();
    };

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
                    <Icon name="md-trash" size={16} color={colors.secondary2} />
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
        return (
            <View style={styles.container}>
                <Animated.View style={searchStyles.container}>
                    <View style={searchStyles.appBar}>
                        <SearchBar ref={self => this._search = self}
                                   containerStyle={styles.search}
                                   inputStyle={styles.searchInput}
                                   lightTheme
                                   round
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
                        />
                        <NavButton label='取消'
                                   style={styles.cancel}
                                   onPress={this._toCancel} />
                    </View>
                </Animated.View>

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

export default CPASearchPage;