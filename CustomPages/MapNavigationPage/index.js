import React, {Component} from 'react';
import {View, ScrollView, Image} from 'react-native';

import styles from './styles';

class CPAMapNavigationPage extends Component{

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <Image style={[styles.content, {resizeMode:'contain', width:undefined}]}
                           source={require('../../Resources/Images/nav.bmp')}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default CPAMapNavigationPage;