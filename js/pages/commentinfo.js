import React, {Component} from 'react';
import {ScrollView, Text, StyleSheet} from "react-native";

class CommentInfo extends Component{
    render() {
        return (
            <ScrollView style={styles.comment}>
                <Text>评论</Text>
            </ScrollView>
        );
    }
}

export default CommentInfo;

const styles = StyleSheet.create({
    comment: {
        flex: 1,
    },
});