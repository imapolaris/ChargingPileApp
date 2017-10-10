import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import RecordWithSubtitleListItem from "../../CustomComponents/RecordWithSubtitleListItem/index";
import {getPayRecords} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import {renderEmpty} from "../ListPage/index";

class CPAPayRecordsPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [],
            refreshing: true,
        };
    }

    componentDidMount() {
        this._requestPayRecords();
    }

    _requestPayRecords = ()=>{
        getPayRecords(AppContext.userId)
            .then(ret=>{
                if (ret === null || ret === undefined){
                    ToastAndroidBS('请求数据失败！');
                    this._onRefreshStatusChanged(false);
                    return;
                }

                let data = [];
                let k = 0;
                ret.forEach(item=>{
                    data.push({key: k++,
                        title: item.PayWay,
                        subtitle: item.PayDate,
                        content: `${item.PayMoney} 元`
                    });
                });

                this.setState({
                    ...this.state,
                    data: data,
                    refreshing: false,
                })
            })
            .catch(err=>{
                console.log(err);
                ToastAndroidBS(err.message);
                this._onRefreshStatusChanged(false);
            });
    };

    _onRefreshStatusChanged = (status) => {
        this.setState({
            ...this.state,
            refreshing: status,
        });
    };

    _refresh = () => {
        this._requestPayRecords();
    };

    _renderEmpty = ()=>{
        return renderEmpty(this.state.refreshing, '没有找到充值记录...');
    };

    _renderItem = ({item}) => {
        return (
            <RecordWithSubtitleListItem title={item.title}
                                        subtitle={item.subtitle}
                                        content={item.content}
            />
        );
    };

    render() {
        return (
            <View>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={this._refresh}
                          ListEmptyComponent={this._renderEmpty} />
            </View>
        );
    }
}

export default CPAPayRecordsPage;