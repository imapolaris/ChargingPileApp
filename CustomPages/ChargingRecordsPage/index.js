import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import RecordWithSubtitleListItem from "../../CustomComponents/RecordWithSubtitleListItem/index";
import {getChargingRecords} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import {renderEmpty, renderSeparator} from "../ListPage/index";

class CPACharingRecordsPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            refreshing: true,
            data: [],
        };
    }

    componentDidMount() {
        this._requestData(false);
    }

    _requestData = () => {
        getChargingRecords(AppContext.userId)
            .then(response=>{
                if (response === null || response === undefined){
                    ToastAndroidBS('请求数据失败！');
                    this._onRefreshStatusChanged(false);
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
                ToastAndroidBS(error.message);
                this._onRefreshStatusChanged(false);
            });
    };

    _onRefreshStatusChanged = (status) => {
        this.setState({
            ...this.state,
            refreshing: status,
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

    _renderEmpty = () => {
        return renderEmpty(this.state.refreshing, '没有发现充电记录...');
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={this._refresh}
                          ListEmptyComponent={this._renderEmpty} />
            </View>
        );
    }
}

export default CPACharingRecordsPage;