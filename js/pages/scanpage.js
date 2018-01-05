'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';
import {ActiveOpacity, screenWidth} from "../common/constants";
import colors from "../common/colors";
import {Icon, Divider} from "react-native-elements";
import {IconType} from "../common/icons";


class CPAScanPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            scanOrInput: 'scan',
            torchMode: Camera.constants.TorchMode.off,
            sn: '',
            scanning: false,
        };
    }

    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this._timer = setInterval(()=>{
            this._animatedValue.setValue(0);
            this._startScanStrip();
        }, 5000+30); // 添加30ms的延迟

        this._startScanStrip();
    }

    componentWillUnmount() {
        this._timer && clearInterval(this._timer);
        this._scanTimer && clearTimeout(this._scanTimer);
    }

    _startScanStrip = () => {
        Animated.sequence([
            Animated.timing(this._animatedValue, {
                toValue: Size-4,
                duration: 2500,
            }),
            Animated.timing(this._animatedValue, {
                toValue: 0,
                duration: 2500,
            })
        ]).start();
    };

    _renderScanView = () => {
        return (
            <View style={styles.middleContainer}>
                <View style={styles.fillArea}/>
                <View style={[styles.rectangle, {flexDirection: 'column'}]}>
                    <Animated.View pointerEvents="box-none"
                                   style={[styles.scanStrip, {transform: [{translateY: this._animatedValue}]}]} >
                        <Divider style={styles.strip}/>
                    </Animated.View>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Divider style={styles.horizontalDivider}/>
                            <Divider style={styles.verticalDivider}/>
                        </View>

                        <View style={{flex: 1}}>
                            <Divider style={[styles.horizontalDivider, {alignSelf: 'flex-end'}]}/>
                            <Divider style={[styles.verticalDivider, {alignSelf: 'flex-end'}]}/>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                        <View style={{flex: 1}}>
                            <Divider style={styles.verticalDivider}/>
                            <Divider style={styles.horizontalDivider}/>
                        </View>

                        <View style={{flex: 1}}>
                            <Divider style={[styles.verticalDivider, {alignSelf: 'flex-end'}]}/>
                            <Divider style={[styles.horizontalDivider, {alignSelf: 'flex-end'}]}/>
                        </View>
                    </View>
                </View>
                <View style={styles.fillArea}/>
            </View>
        );
    };

    render() {
        return (
            <Camera ref={self=>this._scanner = self}
                    torchMode={this.state.torchMode}
                    style={styles.camera}
                    onBarCodeRead={() => {
                    }}
                    aspect={Camera.constants.Aspect.fill}>
                <View style={styles.container}>
                    <View style={[styles.fillArea, styles.textContainer]}>
                        <Text style={styles.text}>
                            将二维码放入扫描框内，即可自动扫描！
                        </Text>
                    </View>

                    {
                        this._renderScanView()
                    }

                    <View style={[styles.fillArea, styles.scanContainer, styles.lowerContainer]}>
                        <TouchableOpacity onPress={this._onInputSerialNumberButtonPress}
                                          activeOpacity={ActiveOpacity} style={styles.leftContainer}>
                            <Icon type={IconType.Ionicon} name="md-hand" size={28} color={colors.white} style={styles.icon} />
                            <Text style={styles.buttonTitle}>
                                输入编号
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._onLightPress}
                                          activeOpacity={ActiveOpacity} style={styles.rightContainer}>
                            <Icon type={IconType.Ionicon} name="md-flash" size={28}
                                  color={this.state.torchMode === Camera.constants.TorchMode.off ? colors.white : colors.yellow}
                                  style={styles.icon} />
                            <Text style={styles.buttonTitle}>
                                {this.state.torchMode ===  Camera.constants.TorchMode.off ? '打开手电筒' : '关闭手电筒'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        );
    }
}

export default CPAScanPage;

CPAScanPage.PropTypes = {

};

const Size = 250;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fillArea: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
    },
    middleContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        width: screenWidth,
        height: Size,
        backgroundColor: colors.transparent,
    },
    inputContainer: {
        flex: 1,
    },
    lowerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
    },
    text: {
        color: colors.green,
        fontSize: 15,
    },
    buttonTitle: {
        fontSize: 14,
        color: colors.grey3,
        marginTop: 5,
    },
    rectangle: {
        height: Size,
        width: Size,
        backgroundColor: 'transparent',
    },
    scanStrip: {
        position: "absolute",
        backgroundColor: colors.transparent,
        elevation: 4,
        justifyContent: "flex-start",
        bottom: 0,
        left: 3,
        right: 3,
        top: 2,
    },
    strip: {
        width: Size-4,
        backgroundColor: colors.secondary3,
    },
    horizontalDivider: {
        backgroundColor: colors.secondary3,
        width: 20,
        height: 2,
    },
    verticalDivider: {
        backgroundColor: colors.secondary3,
        height: 20,
        width: 2,
    },
});