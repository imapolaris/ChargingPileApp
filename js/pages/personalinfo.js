'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {Avatar, Button, List, ListItem} from "react-native-elements";
import {IconType} from "../common/icons";

class CPAPersonalInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            nickname: '',
            gender: '',
            loaded: false,
        };
    }

    render() {
        const list = [
            {
                title: '修改密码',
                icon: {name:'md-lock', type: IconType.Ionicon},
                callback: this._onChangePwd,
            },
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            头像
                        </Text>

                        <Avatar width={45} height={45}
                                rounded
                                onPress={this._changeAvatar}
                                activeOpacity={0.7}
                                icon={{name: 'user', type: 'simple-line-icon', color: 'yellow'}}
                                source={this.state.avatarSource}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            昵称
                        </Text>

                        <TextInput style={styles.textInput}
                                   value={this.state.nickname}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) => {
                                       this.setState({
                                           ...this.state,
                                           nickname: text,
                                       });
                                   }}/>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            性别
                        </Text>

                        <TouchableOpacity style={styles.button}
                                          onPress={this._changeGender}>
                            <Text style={styles.buttonText}>
                                {this.state.gender}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <List style={styles.list}>
                        {
                            list.map((item, i) => (
                                <ListItem key={i}
                                          title={item.title}
                                          leftIcon={item.icon}
                                          containerStyle={styles.item}
                                          onPress={() => item.callback && item.callback()}
                                />
                            ))
                        }
                    </List>
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.button}
                            title="确认修改"
                            onPress={this._confirmModify}
                            disabled={!this.state.loaded}
                            disabledStyle={styles.disabled}
                    />
                </View>
            </View>
        );
    }
}

export default CPAPersonalInfoPage;

CPAPersonalInfoPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flexDirection: 'column',
        justifyContent:'flex-start',
    },
    flatList: {
    },
    list: {
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#BBBBBB',
        marginTop: 30,
    },
    item: {
        backgroundColor: colors.white,
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
    },
    button: {
        minWidth: 60,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    buttonText: {
        fontSize: 16,
        color: colors.dkGreyBg,
    },
    itemContainer:{
        height: 50,
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
        fontSize: 16,
        marginLeft: 10,
    },
    textInput:{
        flex: 1,
        height: 40,
        fontSize: 16,
        textAlign:'right',
    },
    disabled: {
        backgroundColor: colors.grey3,
    },
});