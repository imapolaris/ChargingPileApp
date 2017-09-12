import React, {Component} from 'react';
import {View, Text, TextInput, Keyboard} from 'react-native';

import styles from './styles';
import {Button, Icon} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../Common/colors";
import {StackNavigator} from 'react-navigation';
import CPAWaitingChargingPage from "../WaitingChargingPage/index";

import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScTextInput} from "../../CustomComponents/SimpleCustomComponent/index";

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

    // 扫描成功
    _onScanSuccess = (e) => {
        try{
            alert(e.data);
        } catch (e){
            alert('An error occurred', e.message);
        }
    };

    // 打开/关闭闪光灯
    _onLightPress = () => {
        let torchMode = this._scanner && this._scanner._switchTorch();
        //alert(torchMode);
    };

    // 完成输入序列号，并确认
    _onInputFinishedPress = () => {
        // 如果键盘打开，隐藏键盘
        Keyboard.dismiss();

        const {nav} = this.props.screenProps;
        nav && nav.setParams({headerVisible: false});

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
                                <QRCodeScanner  ref={(self) => this._scanner = self}
                                                cameraStyle={styles.scan}
                                                onRead={this._onScanSuccess}
                                                reactivate={true}
                                                reactivateTimeout={30000}
                                                showMarker={true}
                                />
                                <Icon reverse
                                      raised
                                      name="highlight"
                                      size={20}
                                      color="#517fa4"
                                      onPress={this._onLightPress}
                                />
                            </View>
                            :
                            <View style={styles.inputContainer}>
                                <View style={styles.textInputContainer}>
                                    <ScTextInput underlineColorAndroid='transparent'
                                               placeholder='请输入充电桩编号'
                                               placeholderTextColor={GPlaceholderTextColor}
                                               style={styles.textInput}
                                                 keyboardType='numeric'
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

const CPAStackNavigator = StackNavigator(
    {
        Scan: {
            screen: CPAScanPage,
            navigationOptions: {
                title: '充电',
            }
        },
        WaitingCharging: {
            screen: CPAWaitingChargingPage,
            navigationOptions: {
                title: '正在充电',
            }
        },
        FinishedCharging:{
            screen: CPAWaitingChargingPage,
            navigationOptions: {
                title: '完成充电',
            }
        },
    },
    {
        navigationOptions: {
            gesturesEnabled: true,
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
        },
    }
);

class CPAScanScreen extends Component{
    static navigationOptions = ({navigation}) => {
        return ({
            header: navigation.state.params
            && navigation.state.params.headerVisible ?
                undefined : null,
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <CPAStackNavigator screenProps={{nav: this.props.navigation}} />
            </View>
        )
    }
}

export default CPAScanScreen;