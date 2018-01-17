'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

class Vehicle extends Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>车型</Text>
                <Text>车牌号</Text>
            </View>
        );
    }
}

export default Vehicle;

Vehicle.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});