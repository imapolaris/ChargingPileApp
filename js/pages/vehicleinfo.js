'use strict';

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import {screenWidth} from "../common/constants";

class CPAVehicleInfoPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const vehicles = [
            {
                vehicleNo: '123',
                vehicleModel: '456',
            },
        ];

        return (
            <View style={styles.container}>
                <ScrollView style={styles.contentContainer} />

                <View style={styles.buttonContainer}>
                    <Button title="添加车辆"
                            buttonStyle={styles.button}
                            onPress={()=>{alert('button')}} />
                </View>
            </View>
        );
    }
}

export default CPAVehicleInfoPage;

CPAVehicleInfoPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    buttonContainer: {
        height: 60,
    },
    button: {
        width: screenWidth-30,
    },
});