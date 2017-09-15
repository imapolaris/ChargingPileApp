import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import List from "./List";
import NavButton from "../../CustomComponents/NavButton/index";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../Common/colors';

class CPALocationPage extends Component{
    static navigationOptions = {
        headerRight:
            <NavButton label="定位"
                       showIcon={true}
                       icon={<Icon  name="location-pin" color={colors.white} size={14} />} />
    };

    render() {


        return (
            <View style={styles.container}>
                <List/>
            </View>
        );
    }
}

export default CPALocationPage;