'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from "react-native-elements";
import colors from "../common/colors";

const MaxWordCount = 200;
class CPAFeedbackPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            wordcount: 0,
        };
    }

    _onSubmit = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput multiline={true} maxLength={MaxWordCount}
                           style={styles.content}
                           onChangeText={
                               (text)=>{
                                   this.setState({
                                       wordcount: text.length
                                   })
                               }} />
                <Text style={[styles.text, this.state.wordcount >= MaxWordCount ? {color: colors.red} : null]}>
                    {this.state.wordcount} / {MaxWordCount} 字
                </Text>
                <Button title="提交" onPress={this._onSubmit}
                        buttonStyle={styles.button} />
            </View>
        );
    }
}

export default CPAFeedbackPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    content: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#c3c3c3',
        height: 100,
        textAlignVertical: 'top',
    },
    text: {
        margin: 5,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
    }
});