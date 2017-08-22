import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import RecordWithSubtitleListItem from "../../CustomComponents/RecordWithSubtitleListItem/index";

class CPACharingRecordsPage extends Component{
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
            {key:1, title:'充电度数：50kWh', subtitle:'2017-08-04 09:40:33', content:'花费20.0元'},
            {key:2, title:'充电度数：50kWh', subtitle:'2017-08-04 09:40:33', content:'花费20.0元'},
            {key:3, title:'充电度数：50kWh', subtitle:'2017-08-04 09:40:33', content:'花费20.0元'},
            {key:4, title:'充电度数：50kWh', subtitle:'2017-08-04 09:40:33', content:'花费20.0元'},
            {key:5, title:'充电度数：50kWh', subtitle:'2017-08-04 09:40:33', content:'花费20.0元'},
        ];

        return (
            <View>
                <FlatList data={data} renderItem={this._renderItem} />
            </View>
        );
    }
}

export default CPACharingRecordsPage;