'use strict';

import React, {Component} from 'react';
import colors from "../common/colors";
import {ScrollView, Text, View, StyleSheet, Image} from "react-native";
import MapNavButton from "../components/mapnavbutton";
import KeyValPair from "../components/keyvalpair";
import {connect} from "react-redux";
import {doQueryStationDetailInfo} from "../redux/stationactions";
import Carousel from 'react-native-looped-carousel';
import {ImageBaseUrl, screenHeight, screenWidth} from "../common/constants";

class StationInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            station: {},
            size: {width: screenWidth, height: screenHeight},
        };
    }

    componentDidMount() {
        this._requestStationDetailInfo();
    }

    _requestStationDetailInfo = () => {
        const {queryStationDetailInfo} = this.props;
        const {nav} = this.props.screenProps;
        const {stationId} = nav.state.params;
        queryStationDetailInfo(stationId)
            .then(ret=>{
                this.setState({
                    station: ret,
                });

                nav && nav.setParams({collect: ret.c_s.IsCollect});
            })
    };

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    };

    render() {
        const {station} = this.state;
        const kvStyle = {titleStyle: styles.label, valueStyle: styles.content};

        let images = [];
        let elecPrice = 0.0;
        let payWay = '本APP支付';
        let openHours = '00:00-24:00';
        let chargingTimes = 0;
        if (station && station.Detail)
        {
            images = station.Detail.ImagePaths;
            elecPrice = station.Detail.elecPrice;
            payWay = station.Detail.payWay;
            openHours = station.Detail.openHours;
            chargingTimes = station.c_s.ChargingTimes;
        }

        return (
            <ScrollView style={styles.station}>
                <View style={styles.stationPicContainer} onLayout={this._onLayoutDidChange}>
                    <Carousel
                        delay={3000}
                        style={this.state.size}
                        autoplay
                        pageInfo
                        onAnimateNextPage={(p) => console.log(p)}>
                        {
                            images.length <= 0 ?
                                <View style={[{alignItems: 'center', justifyContent: 'center'}, this.state.size]}>
                                    <Text>电站图片</Text>
                                </View>
                                :
                                images.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <Image source={{uri: ImageBaseUrl + item}} style={this.state.size}
                                                   resizeMode={'stretch'} />
                                        </View>
                                    );
                                })
                        }
                    </Carousel>
                </View>
                <View style={styles.stationAddressContainer}>
                    <View style={styles.stationAddressLeftContainer}>
                        <Text style={styles.address}>
                            {station.address || ' '}
                        </Text>
                    </View>

                    <MapNavButton address={{longitude: station.longitude, latitude: station.latitude}}
                                  buttonStyle={styles.mapNavButton} />
                </View>
                <View style={styles.stationInfoContainer}>
                    <KeyValPair horizontal={true} title="电价"
                                val={elecPrice + '元/度'}
                                {...kvStyle}/>
                    <KeyValPair horizontal={true} title="支付方式"
                                val={payWay || ' '}
                                {...kvStyle}/>
                    <KeyValPair horizontal={true} title="营业时间"
                                val={openHours || ' '}
                                {...kvStyle}/>
                    <KeyValPair horizontal={true} title="充电使用次数"
                                val={chargingTimes + '次'}
                                {...kvStyle}/>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        queryStationDetailInfo: (stationId) => dispatch(doQueryStationDetailInfo(stationId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationInfo);

const styles = StyleSheet.create({
    station: {
        flex: 1,
        paddingTop: 3,
    },
    stationPicContainer: {
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        marginTop: 1,
        flexDirection: 'row',
    },
    stationAddressContainer: {
        marginTop: 10,
        backgroundColor: colors.white,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    stationAddressLeftContainer: {
        flex: 1,
    },
    mapNavButton: {
        width: 60,
        height: 60,
    },
    stationInfoContainer: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: 10,
        paddingLeft: 10,
        paddingTop: 10,
    },
    title:{
        fontSize: 17,
        color: colors.primary1,
    },
    address: {
        fontSize: 15,
        color: colors.grey3,
    },
    info: {
        fontSize: 15,
        color: colors.grey3,
    },
    label: {
        fontSize: 15,
        color: colors.grey2,
    },
    content: {
        fontSize: 14,
        marginLeft: 25,
        color: colors.grey3,
    },
});