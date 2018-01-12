'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, Icon} from "react-native-elements";
import {IconType} from "../common/icons";
import {ActiveOpacity} from "../common/constants";
import colors from "../common/colors";
import CityList from "../components/citylist";
import {connect} from "react-redux";
import {doChooseCity, doGeocode, getCurrentPosition} from "../redux/actions";

const hotCities1 = ['北京', '上海', '广州', '深圳'];
const hotCities2 = ['厦门', '福建', '杭州', '天津'];
class CPALocatingCityPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const {locatingCity} = this.props;
        if (locatingCity.length <= 0) {
            const {currentLocation} = this.props;
            currentLocation && currentLocation();
        }
    }

    _onChooseCity = (city) => {
        const {chooseCity} = this.props;
        chooseCity && chooseCity(city);

        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    render() {
        const {locatingCity} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationTitle}>当前定位城市</Text>
                    <View style={styles.locationCity}>
                        <Text style={styles.cityName}>
                            {locatingCity || '正在定位...'}
                        </Text>
                        <Icon type={IconType.SimpleLineIcon} name="location-pin" color={colors.tintColor2} size={18} />
                    </View>
                </View>
                <Divider />
                <View style={styles.hotCitiesContainer}>
                    <Text style={styles.title}>热门城市</Text>

                    <View style={styles.hotCities}>
                        {
                            hotCities1.map((item, index) =>
                                <TouchableOpacity key={index}
                                                  activeOpacity={ActiveOpacity}
                                                  style={styles.hotCity}
                                                  onPress={() => this._onChooseCity(item)}>
                                    <Text style={styles.hotCityName}>
                                        {item}
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
                                                  onPress={() => this._onChooseCity(item)}>
                                    <Text style={styles.hotCityName}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <Divider />
                </View>

                <View>
                    <Text style={styles.title}>全部城市</Text>
                    <CityList onAction={this._onChooseCity} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        locatingCity: state.map.locatingCity,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        currentLocation: () => dispatch(getCurrentPosition()),
        chooseCity: (city) => dispatch(doChooseCity(city)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CPALocatingCityPage);

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
    cityName: {
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
        marginLeft: 5,
    },
});