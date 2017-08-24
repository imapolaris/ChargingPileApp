import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Button, Divider} from 'react-native-elements';

class CPADivider extends Component{
    render() {
        return (
            <Divider style={[styles.divider, this.props.style]} />
        );
    }
}

class StationListItem extends Component{
    render() {
        return (
            <View style={styles.container}>
                <CPADivider style={{backgroundColor: '#419b3a'}} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
                <CPADivider />
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>
                        空闲电桩：{this.props.numbers}
                    </Text>
                    <Text style={styles.info}>
                        {this.props.address}
                    </Text>
                </View>
                <CPADivider />

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