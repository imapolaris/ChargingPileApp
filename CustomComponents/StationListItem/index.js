import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';
import DividerLine from "../DividerLine/index";

class StationListItem extends Component{
    render() {
        return (
            <View style={styles.container}>
                <DividerLine />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
                <DividerLine style={styles.divider} />
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>
                        空闲电桩：{this.props.numbers}
                    </Text>
                    <Text style={styles.info}>
                        {this.props.address}
                    </Text>
                </View>
                <DividerLine style={styles.divider} />

                <View style={styles.actionContainer}>
                    <View style={styles.leftContainer}>
                        <Button title="详情"
                                onPress={() => this.props.gotoDetails && this.props.gotoDetails()}
                                style={styles.button} />
                    </View>

                    <View style={styles.rightContainer}>
                        <Button title="导航"
                                onPress={() => this.props.gotoMapNav && this.props.gotoMapNav()}
                                style={styles.button} />
                    </View>
                </View>
            </View>
        );
    }
}

export default StationListItem;