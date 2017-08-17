import React, {Component} from 'react';
import {View, Image} from 'react-native';

import styles from './styles';

class CPAMapPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                <Image style={[styles.content, {resizeMode:'contain', width:undefined, height:undefined}]}
                       source={require('../../../Resources/Images/map.bmp')}
                />
            </View>
        );
    }
}

export default CPAMapPage;