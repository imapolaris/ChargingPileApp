'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from "react-native-elements";
import colors, {GPlaceholderTextColor} from "../common/colors";
import {connect} from "react-redux";
import {doSubmitFeedback} from "../redux/systemactions";

const MaxWordCount = 200;
class CPAFeedbackPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            wordcount: 0,
            message: '',
        };
    }

    _onSubmit = () => {
        const {message} = this.state;
        const {submitFeedback} = this.props;

        submitFeedback && submitFeedback(message, new Date());
    };

    render() {
        const {wordcount, message} = this.state;

        return (
            <View style={styles.container}>
                <TextInput placeholder={'你有什么意见或者好的建议，请告诉我们！'}
                           placeholderTextColor={GPlaceholderTextColor}
                           multiline={true}
                           maxLength={MaxWordCount}
                           style={styles.content}
                           onChangeText={
                               (text)=>{
                                   this.setState({
                                       wordcount: text.length,
                                       message: text,
                                   })
                               }} />
                <Text style={[styles.text, wordcount >= MaxWordCount-5 ? {color: colors.red} : null]}>
                    {this.state.wordcount} / {MaxWordCount} 字
                </Text>
                <Button title="提交"
                        onPress={this._onSubmit}
                        buttonStyle={styles.button}
                        disabled={message.length <= 0}
                        disabledStyle={{backgroundColor: colors.grey3}} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitFeedback: (content, datetime) => dispatch(doSubmitFeedback(content, datetime)),
    };
}

export default connect(state=>state, mapDispatchToProps)(CPAFeedbackPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    content: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#c3c3c3',
        height: 150,
        textAlignVertical: 'top',
        backgroundColor: colors.white,
        fontSize: 15,
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