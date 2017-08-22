import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import RecordWithSubtitleListItem from "../../CustomComponents/RecordWithSubtitleListItem/index";

class CPAMySubscribePage extends Component{
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
            {key:1, title:'电桩编号：100023', subtitle:'2017-08-04 09:40:33', content:'预约成功'},
            {key:2, title:'电桩编号：100024', subtitle:'2017-08-04 09:40:33', content:'预约成功'},
            {key:3, title:'电桩编号：100025', subtitle:'2017-08-04 09:40:33', content:'预约失败'},
            {key:4, title:'电桩编号：100026', subtitle:'2017-08-04 09:40:33', content:'预约取消'},
            {key:5, title:'电桩编号：100027', subtitle:'2017-08-04 09:40:33', content:'预约成功'},
        ];

        return (
            <View>
                <FlatList data={data} renderItem={this._renderItem} />
            </View>
        );
    }
}

export default CPAMySubscribePage;