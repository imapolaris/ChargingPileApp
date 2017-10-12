import React, {Component} from 'react';
import {View, ActivityIndicator, Modal, TouchableOpacity, Text} from 'react-native';

import styles from './styles';
import alertStyles from '../AlertSelected/styles';
import colors from '../../Common/colors';
import Icon from 'react-native-vector-icons/Ionicons';

class AlertWaiting extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            waiting: true,
            show: false,
            info: '正在加载，请稍后...',
        };
    }

    waitingIn = (info)=> {
        this._onVisibilityChanged(true, info);
    };

    waitingOut = ()=>{
        this._onVisibilityChanged(false);
    };

    _onVisibilityChanged = (status, info)=>{
        this.setState({
            ...this.state,
            show: status,
            info: info,
        })
    };

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.show}
                onShow={() => {}}
                onRequestClose={() => {}}>
                {/*遮罩层*/}
                <View style={[alertStyles.mask, {opacity: 0.3}]}/>

                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    {
                        this.props.canClose ?
                            <TouchableOpacity style={styles.close}
                                              activeOpacity={0.6}
                                              onPress={this.props.onClose}>
                                <Icon name="md-close" size={26} color={colors.white} />
                            </TouchableOpacity>
                            : null
                    }
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.infoContainer}>
                        <ActivityIndicator
                            animating={this.state.waiting}
                            style={styles.centering}
                            size={65}
                            color={colors.white}
                            opacity={1}
                        />

                        <Text style={styles.info} opacity={1}>
                            {this.state.info || '正在加载，请稍后...'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{flex: 2}}/>
            </Modal>
        );
    }
}

export default AlertWaiting;

/*
* 打开等待窗口
* */
export function openWaitingAlert(alerter, info) {
    try{
        alerter && alerter.waitingIn(info);
    } catch (err) {
        console.log(err);
    }
}

/*
* 关闭等待窗口
* */
export function closeWaitingAlert(alerter) {
    try{
        alerter && alerter.waitingOut();
    } catch (err){
        console.log(err);
    }
}