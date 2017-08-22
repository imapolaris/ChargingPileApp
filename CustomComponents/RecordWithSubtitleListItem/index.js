import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import styles from './styles';

class RecordWithSubtitleListItem extends Component{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {this.props.subtitle}
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.content}>
                        {this.props.content}
                    </Text>
                </View>
            </View>
        );
    }
}

export default RecordWithSubtitleListItem;