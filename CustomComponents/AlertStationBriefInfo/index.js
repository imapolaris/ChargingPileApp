import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    Modal
} from 'react-native';
import styles from './styles';
import DividerLine from "../DividerLine/index";

export class AlertStationBriefInfo extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            show: false,
            title: '',
            numbers: '',
            address: '',
        };

        this.callback = function () {};
    }

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.show}
                onShow={() => {}}
                onRequestClose={() => {}}>
                {/*遮罩层*/}
                <View style={styles.mask}/>
                <TouchableOpacity style={{flex: 1}} onPress={this._out}/>

                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {this.state.title}
                            </Text>
                        </View>
                        <DividerLine style={styles.divider} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.info}>
                                空闲电桩：{this.state.numbers}
                            </Text>
                            <Text style={styles.info}>
                                地址：{this.state.address}
                            </Text>
                        </View>
                        <DividerLine style={styles.divider} />

                        <View style={styles.actionContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                              onPress={this._choose.bind(this, 0)}>
                                <Text style={styles.button}>详情</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer}
                                  onPress={this._choose.bind(this, 1)}>
                                <Text style={styles.button}>导航</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    _in = () => {
        this.setState({
            ...this.state,
            show: true
        })
    };

    _out = () => {
        this.setState({
            ...this.state,
            show: false
        })
    };

    //取消
    cancel = () => {
        this._out();
    };

    //选择
    _choose(i) {
        this._out();
        this.callback && this.callback(i);
    };

    /*
     * title: 标题
     * tipTextColor: 字体颜色
     * callback：回调方法
     */
    show(title: string, numbers: string, address: string, callback: Object) {
        this.callback = callback;

        this.setState({
            title: title,
            numbers: numbers,
            address: address,
            show: true,
        });
    }
}