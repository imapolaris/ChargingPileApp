import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import RecordWithSubtitleListItem from "../../CustomComponents/RecordWithSubtitleListItem/index";

class CPAPayRecordsPage extends Component{
    _renderItem = ({item}) => {
        return (
            <RecordWithSubtitleListItem title={item.title}
                                        subtitle={item.subtitle}
                                        content={item.content}
            />
        );
    };

    render() {
        const data = [
            {key:1, title:'微信支付', subtitle:'2017-08-04 09:40:33', content:'20.0元'},
            {key:2, title:'支付宝支付', subtitle:'2017-08-04 09:40:33', content:'20.0元'},
            {key:3, title:'支付宝支付', subtitle:'2017-08-04 09:40:33', content:'20.0元'},
            {key:4, title:'支付宝支付', subtitle:'2017-08-04 09:40:33', content:'20.0元'},
            {key:5, title:'微信支付', subtitle:'2017-08-04 09:40:33', content:'20.0元'},
        ];

        return (
            <View>
                <FlatList data={data} renderItem={this._renderItem} />
            </View>
        );
    }
}

export default CPAPayRecordsPage;