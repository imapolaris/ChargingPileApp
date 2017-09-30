import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './styles';
import colors from '../../Common/colors';

class AlertWaiting extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            waiting: true,
        };
    }

    render() {
        return (
            <ActivityIndicator
                animating={this.state.waiting}
                style={styles.centering}
                size="large"
                color={colors.theme1}
            />
        );
    }
}

export default AlertWaiting;