'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from "react-native-elements";
import colors from "../common/colors";

export function EmptyPlaceHolder(refreshing, EmptyDataGreetings) {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.empty}>
                {refreshing ? LoadingGreetings : EmptyDataGreetings}
            </Text>
            <Icon name={refreshing ? "md-happy" : "md-sad"} size={20} color={colors.tintColor} />
        </View>
    );
}

const styles = StyleSheet.create({

});