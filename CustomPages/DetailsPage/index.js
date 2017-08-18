import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import styles from './styles';

class CPADetailsPage extends Component{
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <Text>
                        Here is Details Page!!!
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

export default CPADetailsPage;