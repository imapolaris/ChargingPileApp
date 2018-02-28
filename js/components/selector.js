'use strict';

import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ActiveOpacity, screenWidth, WhichMapApp} from "../common/constants";
import colors from "../common/colors";
import {Divider, Icon} from "react-native-elements";
import {gotoNavigation} from "../common/functions";
import {selectFromLibrary, takePicture} from "./avatarpicker";
import {shadowStyle} from "../common/styles";
import KeyValPair from "./keyvalpair";
import {IconType} from "../common/icons";

class Selector extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        entityList: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired).isRequired,
        onAction: PropTypes.func.isRequired,
    };

    static defaultProps = {
        title: '请选择',
        hideOnClickEmpty: false,
    };

    _hide = () => {
        this.setState({visible: false});
    };

    _choose(index) {
        this._hide();
        const {onAction} = this.props;
        onAction && onAction(index);
    };

    _renderItem(item, index) {
        const {name} = item;

        return (
            <View style={styles.item} key={index}>
                <Divider style={styles.divider}/>
                <TouchableOpacity style={styles.itemButton}
                                  activeOpacity={ActiveOpacity}
                                  onPress={() => this._choose(index)}>
                    <Text style={styles.text}>{name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {title, entityList, hideOnClickEmpty} = this.props;
        const {visible} = this.state;

        return (
            <Modal animationType={'slide'}
                transparent={true}
                visible={visible}
                onShow={() => {}}
                onRequestClose={() => {}}>

                <View style={styles.container}>
                    {
                        hideOnClickEmpty ?
                            null :
                            <TouchableOpacity style={styles.placeholder}
                                              onPress={this._hide}/>
                    }

                    <View style={[styles.contentContainer, shadowStyle]}>
                        <View style={[styles.content]}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>{title}</Text>
                            </View>
                            {
                                entityList.map((item, i) => this._renderItem(item, i))
                            }
                        </View>
                        <TouchableOpacity activeOpacity={ActiveOpacity}
                                          style={[styles.button, styles.cancelButton]}
                                          onPress={this._hide}>
                            <Text style={styles.cancelButtonText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    show = () => {
        this.setState({visible: true})
    }
}

export class MapSelector extends Component{
    constructor(props) {
        super(props);
        this.state = {
            from: null,
            to: null,
        };
    }

    _mapNavigation = (i) => {
        let theMap = 'cp:cancel';
        switch (i) {
            case 0:
                theMap = WhichMapApp.bdMap;
                break;
            case 1:
                theMap = WhichMapApp.gdMap;
                break;
            default:
                break;
        }

        const {from, to} = this.state;
        if (theMap !== 'cp:cancel') {
            if (to === null || to === undefined)
            {
                alert('目的地无法解析，无法进行导航！');
                return;
            }

            gotoNavigation(theMap,
                from,
                to,
                (succeed, msg)=>{
                    alert(msg);
                });
        }
    };

    render() {
        const selections = [{name:"百度地图"}, {name:"高德地图"}];

        return (
            <Selector ref={self=>this._selector=self} title="选择导航地图" entityList={selections} onAction={this._mapNavigation} />
        );
    }

    show = (from, to) => {
        this.setState({from, to});
        this._selector.show();
    }
}

export class AvatarSelector extends Component {
    static propTypes = {
        onResponse: PropTypes.func.isRequired,
    };

    _changeAvatar = (i) => {
        switch (i){
            case 0:
                takePicture(this._selectAvatarResponse);
                break;
            case 1:
                selectFromLibrary(this._selectAvatarResponse);
                break;
            default:
                break;
        }
    };

    _selectAvatarResponse = (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // let source = { uri: response.uri };

            // You can also display the image using data:
            let source = { uri: 'data:image/jpeg;base64,' + response.data };

            const {onResponse} = this.props;
            onResponse && onResponse(source);
        }
    };

    render() {
        const selections = [{name:"拍照"}, {name:"从手机相册选择"}];

        return (
            <Selector ref={self=>this._selector=self} title="选择头像" entityList={selections} onAction={this._changeAvatar} />
        );
    }

    show = () => {
        this._selector.show();
    }
}

export class StationSelector extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            station: {
                name:'',
                address: '',
                elecPrice: 0,
                numbers: '1/2'
            },
            callback: null,
        };
    }

    _hide = () => {
        this.setState({visible: false});
    };

    show(station: Object, callback) {
        this.setState({
            visible: true,
            station,
            callback
        });
    }

    _showMapNavigator = () => {
        this._hide();

        const {station, callback} = this.state;
        callback && callback({longitude: station.longitude, latitude: station.latitude});
    };

    render() {
        const {visible, station} = this.state;
        const {id, name, address, numbers} = station;
        let elecPrice = 0;
        if (station && station.Detail) {
            elecPrice = station.Detail.elecPrice;
        }
        const {onAction, containerStyle} = this.props;
        const kvStyle = {titleStyle: styles.titleStyle, valueStyle: styles.valueStyle};

        return (
            <Modal animationType={'slide'}
                   transparent={true}
                   visible={visible}
                   onShow={() => {}}
                   onRequestClose={() => {}}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.placeholder}
                                      onPress={this._hide}/>

                    <View style={[styles.content, shadowStyle]}>
                        <TouchableOpacity style={[styles.station, containerStyle]}
                                          activeOpacity={ActiveOpacity}
                                          onPress={()=>{
                                              this._hide();
                                              onAction && onAction(id);
                                          }}>
                            <Text style={styles.name} numberOfLines={1}>
                                {name}
                            </Text>
                            <Divider/>
                            <View style={styles.infoContainer}>
                                <KeyValPair horizontal={true} title="电价：" val={`${elecPrice} 元`}
                                            {...kvStyle} />
                                <View style={{flexDirection: 'row'}}>
                                    <KeyValPair horizontal={true} title="直流：" val={'1/2'}
                                                {...kvStyle} containerStyle={styles.containerStyle}  />

                                    <KeyValPair horizontal={true} title="交流：" val={'1/2'}
                                                {...kvStyle} containerStyle={styles.containerStyle} />
                                </View>
                            </View>
                            <Text style={styles.address} numberOfLines={2}>
                                地址：{address}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.navigateContainer} pointerEvents="box-none">
                    <TouchableOpacity style={styles.navigateBtn}
                                      onPress={this._showMapNavigator}
                                      activeOpacity={ActiveOpacity}>
                        <Icon type={IconType.Ionicon} name="md-navigate" size={20} color={colors.white} />
                        <Text style={styles.navigateBtnText}>
                            导航
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0)",
    },
    placeholder: {
        flex: 1,
    },
    titleContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10
    },
    titleText: {
        color: "#999999",
        fontSize: 16,
    },
    button: {
        height: 57,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,
    },
    contentContainer: {
        borderWidth: 0.1,
        borderColor: '#c3c3c3',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 5,
        alignSelf: 'stretch',
    },
    cancelButton:{
        width:screenWidth,
        alignSelf:'center',
        marginTop:8,
        borderWidth:0.1,
        borderColor: '#c3c3c3',
    },
    cancelButtonText: {
        fontSize: 17,
        color: "#0084ff",
        textAlign: "center",
    },
    item: {
        width: screenWidth,
        height: 56,
        backgroundColor:'#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 0.1,
        borderColor: '#c3c3c3',
    },
    itemButton: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: '#333333',
        fontSize: 17,
        textAlign: "center",
    },
    divider: {
        height: 0.5,
        backgroundColor: '#a9a9a9',
        width: screenWidth
    },
    stationItemContainerStyle: {
        height: 120,
        backgroundColor: colors.white,
    },
    station: {
        height: 200,
        paddingLeft: 15,
        paddingRight: 15,
    },
    name: {
        fontSize: 18,
        color: colors.primary1,
        paddingTop: 15,
        paddingBottom: 15,
    },
    infoContainer: {
        //flex: 1,
    },
    navigateContainer: {
        position: "absolute",
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        bottom: 175,
        left: 10,
        right: 10,
        top: 0,
    },
    navigateBtn: {
        width: 55,
        height: 55,
        backgroundColor: colors.primary1,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigateBtnText:{
        fontSize: 14,
        color: colors.white,
    },
    containerStyle: {
        flex: 1,
    },
    titleStyle: {
        color: colors.grey3,
        width: 50,
    },
    valueStyle: {
        color: colors.grey3
    },
    address: {
        flex: 1,
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        color: colors.grey3,
        textAlignVertical: 'center',
    }
});