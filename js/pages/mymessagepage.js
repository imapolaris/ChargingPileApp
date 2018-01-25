'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import MessageItem from "../components/messageitem";
import {connect} from "react-redux";
import {doQueryMyMessages} from "../redux/messageactions";
import {EmptyPlaceHolder} from "../components/placeholder";

const EmptyDataGreetings = '当前还没有消息！';
class CPAMyMessagePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        const {queryMyMessages} = this.props;
        queryMyMessages()
            .then(ret=>{
                this.setState({messages: ret});
            });
    }

    _renderItem = ({item}) => {
        return (
            <MessageItem key={item.key}
                         date={item.date}
                         title={item.title}
                         content={item.content} />
        );
    };

    render() {
        const {messages} = this.state;

        return (
            <View style={styles.container}>
                <FlatList data={messages}
                          renderItem={this._renderItem}
                          ListEmptyComponent={EmptyPlaceHolder(EmptyDataGreetings)} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryMyMessages: () => dispatch(doQueryMyMessages()),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPAMyMessagePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
});