'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {EmptyPlaceHolder} from "../components/emptyplaceholder";
import SubscribeItem from "../components/subscribeitem";

class CPAMySubscribePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
        };
    }

    _refresh = () => {
        //this._requestSubscribeRecords();
    };

    _renderEmpty = ()=>{
        return EmptyPlaceHolder(this.state.refreshing, '', '没有找到预约记录...');
    };

    _renderItem = ({item}) => {
        return (
            <SubscribeItem title={item.title}
                           subtitle={item.subtitle}
                           content={item.content}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={this._refresh}
                          ListEmptyComponent={()=>this._renderEmpty()} />
            </View>
        );
    }
}

export default CPAMySubscribePage;

CPAMySubscribePage.propTypes = {

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 5,
    },
});