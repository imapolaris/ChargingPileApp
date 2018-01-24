import React, {Component} from 'react';
import colors from "../common/colors";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import MapNavButton from "../components/mapnavbutton";
import KeyValPair from "../components/keyvalpair";
import {connect} from "react-redux";
import {doQueryStationDetailInfo} from "../redux/stationactions";

class StationInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            station: {},
        };
    }

    componentDidMount() {
        this._requestStationDetailInfo();
    }

    _requestStationDetailInfo = () => {
        const {queryStationDetailInfo} = this.props;
        const {stationId} = this.props.screenProps;
        queryStationDetailInfo(stationId)
            .then(ret=>{
                this.setState({
                    station: ret
                })
            })
    };

    render() {
        const {station} = this.state;
        const kvStyle = {titleStyle: styles.label, valueStyle: styles.content};

        return (
            <ScrollView style={styles.station}>
                <View style={styles.stationPicContainer}>
                    <Text>电站图片</Text>
                </View>
                <View style={styles.stationAddressContainer}>
                    <View style={styles.stationAddressLeftContainer}>
                        <Text style={styles.address}>
                            {station.address || ' '}
                        </Text>
                    </View>

                    <MapNavButton address={station.address} buttonStyle={styles.mapNavButton} />
                </View>
                <View style={styles.stationInfoContainer}>
                    <KeyValPair horizontal={true} title="电价"
                                val={1.0 + '元/度'}
                                {...kvStyle}/>
                    <KeyValPair horizontal={true} title="支付方式"
                                val={'本APP支付'}
                                {...kvStyle}/>
                    <KeyValPair horizontal={true} title="营业时间"
                                val={'00:00 - 24:00'}
                                {...kvStyle}/>
                    <KeyValPair horizontal={true} title="充电使用次数"
                                val={5 + '次'}
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
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        paddingLeft: 10,
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