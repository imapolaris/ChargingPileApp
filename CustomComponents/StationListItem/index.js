import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';
import DividerLine from "../DividerLine/index";
import {Icon} from 'react-native-elements';
import colors from '../../Common/colors';
import icons from '../../Common/fonts';

class StationListItem extends Component{
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              activeOpacity={0.6}
                              onPress={() => this.props.gotoDetails && this.props.gotoDetails()}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
                <DividerLine style={styles.divider} />
                <View style={styles.infoContainer}>
                    <View style={styles.infoLeftContainer}>
                        <Text style={styles.info}>
                            空闲电桩：{this.props.numbers}
                        </Text>
                        <Text style={styles.info}>
                            {this.props.address}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.infoRightContainer}
                                      onPress={() => this.props.gotoMapNav && this.props.gotoMapNav()}
                                      activeOpacity={0.9}>
                        <Icon type={icons.Ionicon} name="md-navigate" size={18} color={colors.white} />
                        <Text style={styles.navigate}>
                            导航
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

export default StationListItem;