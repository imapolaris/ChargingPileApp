'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActiveOpacity} from "../common/constants";
import colors from "../common/colors";
import {shadowStyle} from "../common/styles";
import PropTypes from 'prop-types';
import {Divider} from "react-native-elements";

class MessageItem extends Component{
    static propTypes = {
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    };

    render() {
        const {onAction, date, title, content, containerStyle} = this.props;

        return (
            <View style={[styles.container, shadowStyle, containerStyle]}>
                <Text style={styles.date}>
                    {date || '2018-1-25 10:25:00'}
                </Text>
                <TouchableOpacity style={styles.messageContainer}
                                  activeOpacity={ActiveOpacity}
                                  onPress={onAction}>
                    <Text style={styles.title}>
                        {title || '标题'}
                    </Text>
                    <Divider style={styles.divider} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>
                            {content || '内容'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MessageItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    date: {
        paddingTop: 15,
        paddingBottom: 10,
        fontSize: 14,
    },
    messageContainer: {
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 16,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        color: colors.theme1,
    },
    contentContainer: {
        height: 100,
        paddingLeft: 5,
        paddingTop: 5,
    },
    divider: {
        backgroundColor: colors.grey4,
    },
    content: {
        fontSize: 14,
    },
});