'use strict';

import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ActiveOpacity, screenWidth, WhichMapApp} from "../common/constants";
import colors from "../common/colors";
import {Divider} from "react-native-elements";
import {gotoNavigation} from "../common/functions";
import {selectFromLibrary, takePicture} from "./avatarpicker";
import StationItem from "./stationitem";

class Selector extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
        };
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
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

                    <View style={styles.content}>
                        <View style={styles.content}>
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
}

export class MapSelector extends Component{
    static propTypes = {
        from: PropTypes.object.isRequired,
        to: PropTypes.object.isRequired,
    };

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

        const {from, to} = this.props;
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
        const {visible} = this.props;

        return (
            <Selector visible={visible} title="选择导航地图" entityList={selections} onAction={this._mapNavigation} />
        );
    }
}

export class AvatarSelector extends Component {
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

            /*this.setState({
                avatarSource: source
            });*/
        }
    };

    render() {
        const selections = [{name:"拍照"}, {name:"从手机相册选择"}];
        const {visible} = this.props;

        return (
            <Selector visible={visible} title="选择头像" entityList={selections} onAction={this._changeAvatar} />
        );
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
            }
        };
    }

    _hide = () => {
        this.setState({visible: false});
    };

    _action = () => {
        this._hide();
        const {onAction} = this.props;
        onAction && onAction();
    };

    show(visible: Boolean, station: Object) {
        this.setState({
            visible,
            station
        });
    }

    render() {
        const {visible} = this.state;
        const {name, address, elecPrice} = this.state.station;

        return (
            <Modal animationType={'slide'}
                   transparent={true}
                   visible={visible}
                   onShow={() => {}}
                   onRequestClose={() => {}}>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.placeholder}
                                      onPress={this._hide}/>

                    <View style={styles.content}>
                        <StationItem containerStyle={styles.stationItemContainerStyle}
                                     name={name}
                                     address={address}
                                     elecprice={elecPrice}
                                     onAction={this._action}/>
                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0,0,0,0.4)",
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
        fontSize: 14,
    },
    button: {
        height: 57,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,
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
});