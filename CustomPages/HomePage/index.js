import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';

import styles from './styles';
import NavButton from "../../CustomComponents/NavButton/index";
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";

class CPAHomePage extends Component{
    render() {

        return (
            <View style={styles.container}>


                <ScrollView style={styles.container}>
                    <View style={styles.container}>
                        <Image style={[styles.content, {resizeMode:'contain', width:undefined}]}
                               source={require('../../Resources/Images/map.bmp')}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default CPAHomePage;