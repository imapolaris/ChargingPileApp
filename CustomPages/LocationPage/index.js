import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import List from "./List";

class CPALocationPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                <List/>
            </View>
        );
    }
}

export default CPALocationPage;