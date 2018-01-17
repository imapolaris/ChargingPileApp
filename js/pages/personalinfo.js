'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../common/colors";
import {Avatar, Button, List, ListItem} from "react-native-elements";
import {IconType} from "../common/icons";
import {connect} from "react-redux";
import {doQueryPersonalInfo, doSavePersonalInfo} from "../redux/useractions";
import {ActiveOpacity, ScreenKey} from "../common/constants";
import {doNav} from "../redux/navactions";
import {AvatarSelector} from "../components/selector";

class CPAPersonalInfoPage extends Component {
    constructor(props) {
        super(props);
        const {
            avatar,
            nickname,
            phoneNumber,
            address,
        } = this.props;
        this.state = {
            avatar, nickname, phoneNumber, address
        };
    }

    _savePersonalInfo = () => {
        const {avatar, nickname, address} = this.state;
        const {savePersonalInfo} = this.props;
        savePersonalInfo && savePersonalInfo({avatar, nickname, address})
    };

    render() {
        const {nickname, phoneNumber, address, avatar} = this.state;
        const {nav} = this.props;
        const list = [
            {
                title: '住址',
                val: address || ' ',
                //icon: {name: 'md-home', type: IconType.Ionicon, color: colors.grey3},
                screenKey: ScreenKey.AddAddress,
            },
            /*{
                title: '收货地址',
                screenKey: '',
            },*/
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            头像
                        </Text>

                        <Avatar width={60} height={60}
                                rounded
                                onPress={()=>{this._avatarSelector.show()}}
                                activeOpacity={ActiveOpacity}
                                icon={{name: 'user', type: IconType.SimpleLineIcon, color:'yellow'}}
                                source={avatar}
                        />
                    </View>
                    <List style={styles.list}>
                        <ListItem key={-2} title='昵称' containerStyle={styles.item}
                                  textInput={true}
                                  textInputValue={nickname || ' '}
                                  textInputStyle={[styles.textInput]}
                                  textInputOnChangeText={(e)=>{
                                      this.setState({nickname: e});
                                  }}
                                  hideChevron={true}/>
                        <ListItem key={-1} title='手机号'
                                  rightTitle={phoneNumber || ' '}
                                  hideChevron={true}
                                  containerStyle={styles.item}/>
                    </List>

                    <List>
                        {
                            list.map((item, i) => (
                                <ListItem key={i}
                                          title={item.title}
                                          leftIcon={item.icon}
                                          rightTitle={item.val}
                                          containerStyle={styles.item}
                                          onPress={() => nav && nav(item.screenKey)}
                                />
                            ))
                        }
                    </List>
                </View>

                <Button title="确认修改"
                        buttonStyle={styles.button}
                        containerViewStyle={styles.buttonContainer}
                        onPress={this._savePersonalInfo}/>

                <AvatarSelector ref={self=>this._avatarSelector=self}
                                onResponse={(response) => {this.setState({avatar: response})}} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        savePersonalInfo: (data) => dispatch(doSavePersonalInfo(data)),
        nav: (screenKey) => dispatch(doNav(screenKey)),
    }
}

function mapStateToProps(state) {
    return {
        avatar: state.user.avatar,
        nickname: state.user.nickname,
        phoneNumber: state.user.phoneNumber,
        address: state.user.address,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAPersonalInfoPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    list: {
        marginTop: 0,
    },
    itemContainer:{
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#BBBBBB',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingRight: 10,
    },
    text:{
        flex: 1,
        fontSize: 15,
        marginLeft: 15,
    },
    item: {
        backgroundColor: colors.white,
    },
    buttonContainer: {
        marginTop: 30,
        justifyContent: 'center',
    },
    button: {
        minWidth: 60,
        alignItems: 'flex-end',
    },
    textInput:{
        width: 100,
        fontSize: 16,
        textAlign:'right',
        color: colors.grey0,
        paddingTop: 0,
        paddingBottom: 0,
    },
});