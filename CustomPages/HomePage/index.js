import React, {Component} from 'react';
import {View, Image, ScrollView, Button} from 'react-native';

import styles from './styles';
import NavButton from "../../CustomComponents/NavButton/index";
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";

class CPAHomePage extends Component{
    _toLocation = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Location');
    };

    _toList = () => {
        const {nav} = this.props.screenProps;
        nav && nav('List');
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <DefinedTitleBar ToLocation={this._toLocation} ToList={this._toList} />
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