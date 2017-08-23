import React, {Component} from 'react';
import {View, Text, Image, TextInput} from 'react-native';

import styles from './styles';
import {Button, Icon} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../CommonStyles/colors";

class CPAScanPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            scanOrInput: 'scan',
        };
    }

    // 扫码
    _onScanButtonPress = () => {
        if (this.state.scanOrInput === 'input'){
            this.setState({
                scanOrInput: 'scan'
            });
        }
    };

    // 输入编号
    _onInputSerialNumberButtonPress = () => {
        if (this.state.scanOrInput === 'scan'){
            this.setState({
                scanOrInput: 'input'
            });
        }
    };

    // 打开/关闭闪光灯
    _onLightPress = () => {

    };

    // 完成输入序列号，并确认
    _onInputFinishedPress = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('WaitingCharging', {waitingOrFinished: 'waiting'});
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.scanOrInput === 'scan' ?
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                将二维码放入扫描框内，即可自动扫描！
                            </Text>
                        </View>
                        :
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                请输入充电桩编号，然后点击按钮！
                            </Text>
                        </View>
                }

                <View style={styles.upperContainer}>
                    {
                        this.state.scanOrInput === 'scan' ?
                            <View style={styles.scanContainer}>
                                <Image source={require('../../Resources/Images/scancode.png')}
                                       style={styles.scan}
                                       resizeMode='contain'
                                />
                                <Icon reverse
                                      raised
                                      name="highlight"
                                      size={16}
                                      color="#517fa4"
                                      onPress={this._onLightPress}
                                />
                            </View>
                            :
                            <View style={styles.inputContainer}>
                                <View style={styles.textInputContainer}>
                                    <TextInput underlineColorAndroid='transparent'
                                               placeholder='请输入充电桩编号'
                                               placeholderTextColor={GPlaceholderTextColor}
                                               style={styles.textInput}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button title="确定"
                                            buttonStyle={styles.okButton}
                                            onPress={this._onInputFinishedPress}
                                    />
                                </View>
                            </View>
                    }
                </View>

                <View style={styles.lowerContainer}>
                    <View style={styles.leftContainer}>
                        <Button title="扫码"
                                onPress={this._onScanButtonPress}
                                style={styles.button} />
                    </View>

                    <View style={styles.rightContainer}>
                        <Button title="输入编号"
                                onPress={this._onInputSerialNumberButtonPress}
                                style={styles.button} />
                    </View>
                </View>
            </View>
        );
    }
}

export default CPAScanPage;