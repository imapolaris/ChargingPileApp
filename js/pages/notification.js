'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, WebView} from 'react-native';

class CPANotificationPage extends Component{
    render() {
        const {url} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <WebView source={{uri:url}}/>
            </View>
        );
    }
}

export default CPANotificationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});