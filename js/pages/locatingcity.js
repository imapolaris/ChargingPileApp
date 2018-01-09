'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import {ActiveOpacity} from "../common/constants";
import colors from "../common/colors";
import CityList from "../components/citylist";

const hotCities1 = ['北京', '上海', '广州', '深圳'];
const hotCities2 = ['厦门', '福建', '杭州', '天津'];
class CPALocatingCityPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: '',
            recentlyCities: ['', '', ''],
            searchState: false,
            searchResult: [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationTitle}>当前定位城市</Text>
                    <View style={styles.locationCity}>
                        <Text style={styles.cityName}>
                            北京
                        </Text>
                        <Icon type={IconType.SimpleLineIcon} name="location-pin" color={colors.tintColor2} size={18} />
                    </View>
                </View>
                <Divider />
                <View style={styles.hotCitiesContainer}>
                    <Text style={[styles.title, {marginLeft:5}]}>热门城市</Text>

                    <View style={styles.hotCities}>
                        {
                            hotCities1.map((item, index) =>
                                <TouchableOpacity key={index}
                                                  activeOpacity={ActiveOpacity}
                                                  style={styles.hotCity}
                                                  onPress={() => {}}>
                                    <Text style={styles.hotCityName}>
                                        {item.length > 3 ? item.substring(0, 3) + '..' : item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View style={styles.hotCities}>
                        {
                            hotCities2.map((item, index) =>
                                <TouchableOpacity key={index}
                                                  activeOpacity={ActiveOpacity}
                                                  style={styles.hotCity}
                                                  onPress={() => {}}>
                                    <Text style={styles.hotCityName}>
                                        {item.length > 3 ? item.substring(0, 3) + '..' : item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <Divider />
                </View>

                <View style={styles.allCitiesContainer}>
                    <Text style={[styles.title, {marginLeft: 5}]}>全部城市</Text>
                    <CityList />
                </View>
            </View>
        );
    }
}

export default CPALocatingCityPage;

CPALocatingCityPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: colors.white,
    },
    locationCity: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginRight: 15,
    },
    locationTitle: {
        flex: 1,
    },
    cityName:{
        marginRight: 5,
        color: colors.primary1,
        fontSize: 16,
    },
    hotCitiesContainer: {
        height: 110,
        justifyContent: 'center',
    },
    hotCities: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-around',
    },
    hotCity: {
        borderWidth: 0.5,
        borderColor: 'grey',
        width: 75,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    hotCityName: {
        color: colors.primary1,
        fontSize: 15,
    },
    title: {
        fontSize: 15,
    },
});