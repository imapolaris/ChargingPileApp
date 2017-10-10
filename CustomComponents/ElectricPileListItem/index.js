import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';
import DividerLine from "../DividerLine/index";

class ElectricPileListItem extends Component{
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              activeOpacity={0.6}
                              onPress={this.props.onPress} >
                <View style={styles.titleContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.status}>
                            {this.props.status}
                        </Text>
                    </View>
                </View>
                <DividerLine style={styles.divider} />
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>
                        序列号：{this.props.serialNumber}
                    </Text>
                    <Text style={styles.info}>
                        类型：{this.props.pileType}
                    </Text>
                    <Text style={styles.info}>
                        收费：{this.props.unitPrice} 元/度
                    </Text>
                </View>
                {/*<DividerLine style={styles.divider} />*/}
            </TouchableOpacity>
        );
    }
}

export default ElectricPileListItem;