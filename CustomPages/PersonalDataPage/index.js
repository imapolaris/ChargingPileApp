import React, {Component} from 'react';
import {View, FlatList, ToastAndroid} from 'react-native';

import styles from './styles';

import {List, ListItem, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LabelTextInputListItem from "../../CustomComponents/LabelTextInputListItem/index";
import {ToastAndroidBS} from "../../Common/functions";

class CPAPersonalDataPage extends Component{
    _renderItem = ({item}) => {
        return (
            <LabelTextInputListItem label={item.label}
                                    previousValue={item.val}
                                    containerStyle={styles.item}
            />
        );
    };

    _onPress = () => {
        ToastAndroidBS('修改成功');

        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    _onChangePwd = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('ChangePwd');
    };

    render() {
        const data = [
            {key:1, label:'用户名', val:'孙辉'},
            {key:2, label:'昵称', val:'alex'},
            {key:3, label:'性别', val:'男'},
            {key:4, label:'联系电话', val:'13000000000'},
        ];

        const list = [
            {
                title: '修改密码',
                icon: {name:'lock', type:'simple-line-icon'},
                callback: this._onChangePwd,
            },
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList style={styles.flatList}
                              data={data}
                              renderItem={this._renderItem}
                    />

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
                            onPress={this._onPress}
                    />
                </View>
            </View>
        );
    }
}

export default CPAPersonalDataPage;