import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import RecordWithSubtitleListItem from "../../CustomComponents/RecordWithSubtitleListItem/index";
import {getChargingRecords} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";

class CPACharingRecordsPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            refreshing: false,
            data: [],
        };
    }

    componentDidMount() {
        this._requestData(false);
    }

    _requestData = (refreshing) => {
        getChargingRecords(refreshing)
            .then(response=>{
                if (response === null || response === undefined){
                    ToastAndroidBS('请求数据失败！');
                    return;
                }

                let data = [];
                let k = 0;
                response.forEach(item=>{
                    data.push({key: k++,
                        title: `充电度数：${item.Kwhs}kWh`,
                        subtitle: item.ChargingDate,
                        content: `花费 ${item.Cost}元`
                    });
                });

                this.setState({
                    ...this.state,
                    data: data,
                    refreshing: false,
                })
            })
            .catch(error=>{
                console.log(error);
                alert(error);
            });
    };

    _renderItem = ({item}) => {
        return (
            <RecordWithSubtitleListItem title={item.title}
                                        subtitle={item.subtitle}
                                        content={item.content}
            />
        );
    };

    _refresh = () => {
        this.setState({
            ...this.state,
            refreshing: true,
        });

        this._requestData(true);
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={this._refresh}/>
            </View>
        );
    }
}

export default CPACharingRecordsPage;