import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Keyboard,
} from 'react-native';

import styles from './styles';
import List from "./List";
import NavButton from "../../CustomComponents/NavButton/index";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../Common/colors';
import {getCurrentLocation} from "../../Common/functions";
import {Geolocation} from 'react-native-baidu-map';
import DividerLine from "../../CustomComponents/DividerLine/index";
import {SearchBar} from 'react-native-elements';
import data from '../../Resources/Data/city';

let that;

class CPALocationPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentPosition: '',
            recentlyCities: ['北京', '上海', '杭州'],
            searchState: false,
            searchResult: [],
        };

        that = this;
    }

    componentWillMount() {
        this._getCurrentCity();
    }

    // 获取当前定位城市
    _getCurrentCity = () => {
        getCurrentLocation()
            .then(data=>{
                Geolocation.reverseGeoCode(data.latitude, data.longitude)
                    .then(
                        (response)=>{
                            if (response === null || response === undefined)
                            {
                                console.log('当前无法定位...');
                            } else {
                                this.setState({
                                    ...this.state,
                                    currentPosition: response.city
                                })
                            }
                        },
                        (error)=>{
                            console.error(error);
                        }
                    )
                    .catch(error=>{
                        console.error(error);
                    })
            })
    };

    _changeCity = (cityName) => {
        const {state, goBack} = this.props.navigation;
        state.params.callback && state.params.callback(cityName);
        goBack && goBack();
    };

    _onSearch = (text) => {
        if (text.length > 0) {
            let result = [];
            let k = 0;
            data.forEach((section)=>{
                section.data.forEach((item)=>{
                    if (item.name.indexOf(text) >= 0
                        || item.name_en.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
                        result.push({key: k++, name: item.name})
                    }
                })
            });

            this.setState({
                ...this.state,
                searchResult: result,
            });
        }
    };

    _onFocus = () => {
        this._searchBar.clearText();

        this.setState({
            ...this.state,
            searchState: true,
        });
    };

    _cancelSearch = () => {
        this.setState({
            ...this.state,
            searchState: false,
        });

        Keyboard.dismiss();
    };

    _renderItem({item}){
        return (
            <TouchableOpacity
                key={item.key}
                style={styles.item}
                onPress={()=>{
                    this._changeCity(item.name)
                }}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderOptions() {
        return (
            <View style={styles.container}>
                <View style={styles.locationContainerWhole}>
                    <View style={styles.locationContainer}>
                        <Text style={[styles.title, {flex: 1}]}>当前定位城市</Text>
                        <TouchableOpacity style={styles.locationButton}
                                          onPress={()=>this._changeCity(this.state.currentPosition)}>
                            <Text style={[styles.cityName, {color: colors.white}]}>
                                {this.state.currentPosition}
                            </Text>
                            <Icon name="location-pin" color={colors.white} size={14} style={styles.locationIcon} />
                        </TouchableOpacity>
                    </View>
                    <DividerLine/>
                </View>
                <View style={styles.currentCityContainer}>
                    <Text style={[styles.title, {marginLeft:5}]}>最近访问城市</Text>

                    <View style={styles.currentCities}>
                        {
                            this.state.recentlyCities && this.state.recentlyCities.map((item, index)=>{
                                return (
                                    <TouchableOpacity key={index}
                                                      style={styles.currentCity}
                                                      onPress={()=>this._changeCity(item)} >
                                        <Text style={styles.cityName}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <DividerLine/>
                </View>

                <View style={styles.container}>
                    <Text style={[styles.title, {marginLeft: 5}]}>全部城市</Text>
                    <List chooseCity={this._changeCity}/>
                </View>
            </View>
        )
    }

    _renderSearchOptions() {
        return (
            <View style={styles.searchResultContainer}>
                <FlatList data={this.state.searchResult}
                          renderItem={this._renderItem.bind(this)} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchBar ref={self=>this._searchBar=self}
                               lightTheme
                               onChangeText={this._onSearch}
                               clearTextOnFocus={true}
                               onFocus={this._onFocus}
                               returnKeyType="search"
                               maxLength={20}
                               containerStyle={styles.search}
                               clearIcon={this.state.searchState ? {color:'#86939e', name:'clear'} : null} />
                    {
                        this.state.searchState ?
                            <TouchableOpacity onPress={this._cancelSearch}
                                              style={styles.cancelSearch} >
                                <Text style={styles.cancel}>
                                    取消
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                </View>

                {
                    this.state.searchState === true ?
                        this._renderSearchOptions()
                        :
                        this._renderOptions()
                }
            </View>
        );
    }
}

export default CPALocationPage;