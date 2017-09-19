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
        this._searchFinished('');
    };

    _startSearch = (text)=>{
        if (this.state.searchState === false){
            this.setState({
                ...this.state,
                searchState: true,
            });
        }

        // query station names by filter=>text
        // code here.
    };

    _searchFinished(cityName) {
        const {state, goBack} = this.props.navigation;
        state && state.params.callback(cityName);
        goBack && goBack();
    }

    /*
    * get historical query items.
    * */
    _queryHistory = ()=>{
        const history = [
            {key: 1, name:'加速器一区充电站', address:'北京市海淀区永丰产业基地加速器一区'},
            {key: 2, name:'徐家汇充电站', address:'上海市静安区徐家汇'},
            {key: 3, name:'滕州充电站', address:'山东省枣庄市滕州东站'}
        ];

        this.setState({
            ...this.state,
            historyResult: history,
        });
    };

    _chooseStation = (station)=>{
        let {address} = station;
        this._searchFinished(address);
    };

    _clearHistory = ()=>{
        this.setState({
            ...this.state,
            searchState: true,
        });

        // clear history options.
        // code here.
    };

    _renderItem = ({item})=>{
        return (
            <TouchableOpacity
                key={item.key}
                style={styles.item}
                onPress={()=>{
                    this._chooseStation(item)
                }}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderSearchHistory() {
        return (
            <View style={[styles.searchResultContainer, styles.searchHistoryContainer]}>
                <View style={[styles.item, styles.historyTitle]}>
                    <Text style={[styles.rowDataText]}>
                        搜索历史
                    </Text>
                </View>
                <FlatList style={styles.searchResult}
                          data={this.state.historyResult}
                          renderItem={this._renderItem} />
                <TouchableOpacity style={[styles.item, styles.historyTitle]}
                                  onPress={this._clearHistory} >
                    <Text style={styles.rowDataText}>
                        清除搜索历史
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderSearchOptions() {
        return (
            <View style={styles.searchResultContainer}>
                <FlatList style={styles.searchResult}
                          data={this.state.searchResult}
                          renderItem={this._renderItem} />
            </View>
        );
    }

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
                                   placeholder='搜索...'
                                   onFocus={this._toSearch}
                                   autoFocus={true}
                                   returnKeyType="search"
                                   onChangeText={this._startSearch}
                                   clearIcon={{color:'#86939e', name:'clear'}}
                                   showLoadingIcon={false}
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
                        this._renderSearchHistory()
                }
            </View>
        );
    }
}

export default CPASearchPage;