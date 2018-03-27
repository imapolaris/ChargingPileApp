'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MessageItem from "../components/messageitem";
import {connect} from "react-redux";
import {doQueryMyMessages} from "../redux/messageactions";
import {CommonEmptyPlaceHolder} from "../components/placeholder";

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
                          ListEmptyComponent={CommonEmptyPlaceHolder(require('../assets/images/mymessage.png'), '当前还没有消息')} />
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
    emptyContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 16,
    },
});