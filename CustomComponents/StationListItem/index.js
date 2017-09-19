import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

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
                    <TouchableOpacity onPress={() => this.props.gotoDetails && this.props.gotoDetails()}
                                      style={[styles.button, styles.leftContainer]}>
                        <Text style={styles.buttonText}>
                            详情
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.gotoMapNav && this.props.gotoMapNav()}
                                      style={[styles.button, styles.rightContainer]}>
                        <Text style={styles.buttonText}>
                            导航
                        </Text>
                    </TouchableOpacity>
                </View>
                <DividerLine/>
            </View>
        );
    }
}

export default StationListItem;