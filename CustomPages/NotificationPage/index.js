import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    WebView,
} from 'react-native';

import styles from './styles';

class CPANotificationPage extends Component{


    render(){
        const {params} = this.props.navigation.state;
        const {url} = params;

        return (
            <View style={{flex: 1}}>
                <WebView source={{uri:url}}/>
            </View>
        );
    }
}

export default CPANotificationPage;