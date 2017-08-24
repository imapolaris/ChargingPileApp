import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Button} from 'react-native-elements';

class CPAWaitingSubscribePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 计时时间
            countdown: 0,
            showtime: '',
        };

        this._timer = null;
    }

    componentDidMount() {
        this.state.countdown = 15 * 60; // 计时时间15分钟
        this._startTimer();
    }

    componentWillUnmount() {
        this._stopTimer();
    }

    _startTimer = () => {
        this._timer = setInterval(
            () => {
                this.setState(prevdata => {
                    return {
                        countdown: prevdata.countdown - 1
                    };
                });

                if (this.state.countdown <= 0){
                    this._formatTime(0);
                    this._stopTimer();
                } else {
                    this._formatTime(this.state.countdown);
                }
            },
            1000 // every 1s
        );
    };

    _stopTimer = () => {
        this._timer && clearInterval(this._timer);
    };

    _formatTime = (time) => {
        if (time <= 0)
            return '已结束';

        let showtime = '';
        let day = parseInt(time / 24 / 3600);
        if (day > 0)
            showtime += `${day} 天 `;
        let hour = parseInt(time / 3600);
        if (hour > 0)
            showtime += `${hour} 时 `;
        showtime += `${parseInt((time % 3600) / 60)} 分 ${time % 60} 秒`;

        this.setState({
            showtime: showtime
        });
    };

    // 取消预约
    _onCancelSubscribePress = () => {
        alert('取消预约吗？');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    剩余时间：
                </Text>

                <View style={styles.timeContainer}>
                    <Text style={styles.time}>
                        {this.state.showtime}
                    </Text>
                </View>

                <View style={styles.actionContainer}>
                    <Button title="取消预约"
                            onPress={this._onCancelSubscribePress}
                            style={styles.button} />
                </View>
            </View>
        );
    }
}

export default CPAWaitingSubscribePage;