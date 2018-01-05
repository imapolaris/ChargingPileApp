import React, {Component} from 'react';
import {StyleSheet, View, WebView} from 'react-native';

class CPAMessagePage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <WebView source={{uri: 'https://youpin.mi.com'}}
                         javaScriptEnabled={true}
                         style={styles.wv} />
            </View>
        );
    }
}

export default CPAMessagePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wv: {
        flex: 1,
    }
});