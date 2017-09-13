import React, {Component} from 'react';
import {View, Text, Keyboard, Dimensions, Vibration} from 'react-native';

import styles from './styles';
import {Button, Icon} from 'react-native-elements';
import {GPlaceholderTextColor} from "../../Common/colors";
import {StackNavigator} from 'react-navigation';
import CPAWaitingChargingPage from "../WaitingChargingPage/index";

//import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScTextInput} from "../../CustomComponents/SimpleCustomComponent/index";
import Camera from 'react-native-camera';
import colors from '../../Common/colors';


class CPAScanPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            scanOrInput: 'scan',
            torchMode: Camera.constants.TorchMode.off,
        };
    }

    // 扫码
    _onScanButtonPress = () => {
        if (this.state.scanOrInput === 'input'){
            this.setState({
                ...this.state,
                scanOrInput: 'scan'
            });
        }
    };

    // 输入编号
    _onInputSerialNumberButtonPress = () => {
        if (this.state.scanOrInput === 'scan'){
            this.setState({
                ...this.state,
                scanOrInput: 'input'
            });
        }
    };

    // 扫描成功
    _onScanSuccess = (e) => {
        try{
            // 如果手电筒打开，关闭手电筒
            this._switchTorch(true);
            Vibration.vibrate();

            alert(e.data);
        } catch (e){
            alert('An error occurred', e.message);
        }
    };

    // 打开/关闭闪光灯
    _onLightPress = () => {
        let torchMode =  this._switchTorch();
    };

    /*switch torch, add by alex, on 090517*/
    /*
     * close: 关闭手电筒，不打开
     */
    _switchTorch = (close) => {
        if (this.state.torchMode === Camera.constants.TorchMode.on){
            this.setState({
                ...this.state,
                torchMode: Camera.constants.TorchMode.off
            })
        }
        else {
            if (!close) {
                this.setState({
                    ...this.state,
                    torchMode: Camera.constants.TorchMode.on
                })
            }
        }

        return this.state.torchMode.toString();
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
        const scanView = (
            <View style={styles.container}>
                <Camera ref={self=()=>this._scanner=self}
                        torchMode={this.state.torchMode}
                        style={[styles.camera, this.props.cameraStyle]}
                        onBarCodeRead={this._onScanSuccess.bind(this)}
                        aspect={Camera.constants.Aspect.fill}>
                    <View style={styles.rectangleContainer}>

                        <View style={styles.fillArea} >
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    将二维码放入扫描框内，即可自动扫描！
                                </Text>
                            </View>
                        </View>
                        <View style={styles.middleContainer}>
                            <View style={styles.fillArea} />
                            <View style={styles.rectangle} />
                            <View style={styles.fillArea} />
                        </View>
                        <View style={[styles.fillArea, styles.scanContainer]}>
                            <Icon reverse
                                  raised
                                  name="highlight"
                                  size={20}
                                  color="#517fa4"
                                  onPress={this._onLightPress}
                            />
                        </View>
                    </View>
                </Camera>
            </View>
        );

        const inputView = (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        请输入充电桩编号，然后点击按钮！
                    </Text>
                </View>
                <View style={styles.upperContainer}>
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
                </View>
            </View>
        );

        return (
            <View style={styles.container}>
                {this.state.scanOrInput === 'scan' ? scanView : inputView}
                <View style={[styles.lowerContainer,
                    this.state.scanOrInput === 'scan' ? {backgroundColor: "#000000"} : {opacity: 1, backgroundColor: "transparent"}]}>
                    <View style={styles.leftContainer}>
                        <Button title="扫码充电"
                            onPress={this._onScanButtonPress}
                            buttonStyle={[styles.button, this.state.scanOrInput === 'scan' ? {backgroundColor: colors.primary} : {}]} />
                    </View>

                    <View style={styles.rightContainer}>
                        <Button title="输入编号"
                                onPress={this._onInputSerialNumberButtonPress}
                                buttonStyle={[styles.button, this.state.scanOrInput === 'scan' ? {} : {backgroundColor: colors.primary}]} />
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